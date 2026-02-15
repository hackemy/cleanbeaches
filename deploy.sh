#!/usr/bin/env bash
set -euo pipefail

if [ -f .env ]; then
  # shellcheck disable=SC1091
  source .env
fi

: "${S3_BUCKET:?Set S3_BUCKET in .env (example: s3://cleanbeaches-site)}"
: "${CLOUDFRONT_DISTRIBUTION_ID:?Set CLOUDFRONT_DISTRIBUTION_ID in .env}"
: "${AWS_PROFILE:=default}"
: "${AWS_REGION:=eu-central-1}"

npm install
npm run build

aws s3 sync dist/ "$S3_BUCKET" --delete --region "$AWS_REGION" --profile "$AWS_PROFILE"
aws cloudfront create-invalidation --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" --paths "/*" --profile "$AWS_PROFILE"

echo "Deployment complete: artifacts synced to $S3_BUCKET and CloudFront cache invalidated."
