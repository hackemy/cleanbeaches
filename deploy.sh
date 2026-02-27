#!/usr/bin/env bash
set -euo pipefail

# ─── CleanBeaches Greece ── S3 + CloudFront deploy ────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Load environment
if [ -f "$SCRIPT_DIR/.env" ]; then
  set -a; source "$SCRIPT_DIR/.env"; set +a
fi

# Required environment variables
REQUIRED_VARS=(aws_access_key_id aws_secret_access_key aws_region aws_s3_bucket aws_cloudfront_distribution)
MISSING=()
for var in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!var:-}" ]; then
    MISSING+=("$var")
  fi
done

if [ ${#MISSING[@]} -gt 0 ]; then
  echo "✗ Missing required environment variables:"
  for var in "${MISSING[@]}"; do
    echo "  - $var"
  done
  echo ""
  echo "Set them in $SCRIPT_DIR/.env or export them before running this script."
  exit 1
fi

# Map .env vars → AWS CLI env vars
export AWS_ACCESS_KEY_ID="$aws_access_key_id"
export AWS_SECRET_ACCESS_KEY="$aws_secret_access_key"
export AWS_DEFAULT_REGION="$aws_region"

BUCKET="$aws_s3_bucket"
DISTRIBUTION_ID="$aws_cloudfront_distribution"
DIST_DIR="$SCRIPT_DIR/dist"

# Verify dist/ exists
if [ ! -f "$DIST_DIR/index.html" ]; then
  echo "✗ $DIST_DIR/index.html not found. Run build.sh first."
  exit 1
fi

echo "▸ Deploying to S3 + CloudFront"
echo "  Bucket:       s3://$BUCKET"
echo "  Region:       $aws_region"
echo "  Distribution: $DISTRIBUTION_ID"
echo ""

# ─── S3 sync with cache headers ──────────────────────────────────────────────

# index.html — short cache (SPA entry point, must pick up new asset hashes)
echo "▸ Uploading index.html (short cache)"
aws s3 cp "$DIST_DIR/index.html" "s3://$BUCKET/index.html" \
    --cache-control "max-age=60, must-revalidate, stale-while-revalidate=86400" \
    --content-type "text/html; charset=utf-8"

# 404.html — copy of index.html for S3 static website hosting fallback
aws s3 cp "$DIST_DIR/index.html" "s3://$BUCKET/404.html" \
    --cache-control "max-age=60, must-revalidate" \
    --content-type "text/html; charset=utf-8"

# Static assets — long cache + immutable (content-hashed filenames from Vite)
echo "▸ Syncing assets (immutable cache)"
aws s3 sync "$DIST_DIR/" "s3://$BUCKET/" \
    --exclude "index.html" \
    --delete \
    --cache-control "max-age=31536000, immutable"

echo "▸ S3 sync complete"

# ─── CloudFront: configure SPA error responses ───────────────────────────────
#
# For a hash-routed SPA, we need CloudFront to return index.html for 403/404
# errors (when someone hits a path that doesn't exist in S3 like /favicon.ico
# or if S3 static website hosting isn't enabled).

echo "▸ Configuring CloudFront custom error responses for SPA routing"

# Get current distribution config
ETAG=$(aws cloudfront get-distribution-config \
    --id "$DISTRIBUTION_ID" \
    --query 'ETag' \
    --output text)

aws cloudfront get-distribution-config \
    --id "$DISTRIBUTION_ID" \
    --query 'DistributionConfig' \
    --output json > /tmp/cf-dist-config.json

# Patch in SPA-friendly custom error responses (403 → /index.html 200, 404 → /index.html 200)
python3 -c "
import json, sys

with open('/tmp/cf-dist-config.json') as f:
    config = json.load(f)

config['CustomErrorResponses'] = {
    'Quantity': 2,
    'Items': [
        {
            'ErrorCode': 403,
            'ResponsePagePath': '/index.html',
            'ResponseCode': '200',
            'ErrorCachingMinTTL': 10
        },
        {
            'ErrorCode': 404,
            'ResponsePagePath': '/index.html',
            'ResponseCode': '200',
            'ErrorCachingMinTTL': 10
        }
    ]
}

# Ensure compress is enabled for better performance
config['DefaultCacheBehavior']['Compress'] = True

with open('/tmp/cf-dist-config.json', 'w') as f:
    json.dump(config, f)
"

aws cloudfront update-distribution \
    --id "$DISTRIBUTION_ID" \
    --if-match "$ETAG" \
    --distribution-config file:///tmp/cf-dist-config.json \
    --output text \
    --query 'Distribution.Id' > /dev/null

rm -f /tmp/cf-dist-config.json
echo "▸ CloudFront error responses configured (403/404 → /index.html)"

# ─── CloudFront invalidation ─────────────────────────────────────────────────

echo "▸ Creating CloudFront invalidation"

INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id "$DISTRIBUTION_ID" \
    --paths '/index.html' '/404.html' '/assets/*' \
    --query 'Invalidation.Id' \
    --output text)

echo "▸ Invalidation created: $INVALIDATION_ID"
echo "  Waiting for propagation..."

aws cloudfront wait invalidation-completed \
    --distribution-id "$DISTRIBUTION_ID" \
    --id "$INVALIDATION_ID"

echo "▸ Invalidation complete"
echo ""
echo "✓ Deployment finished"
