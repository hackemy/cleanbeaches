#!/usr/bin/env bash
set -euo pipefail

# ------------------------------------------------------------------------------
# dynamo.sh
# Creates DynamoDB table named "data" with standard single-table pattern
# Exits if table already exists
# Uses credentials/region from .env file
# ------------------------------------------------------------------------------

ENV_FILE=".env"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Error: .env file not found in current directory"
  exit 1
fi

# Load .env (ignores comments and empty lines)
set -a
source "$ENV_FILE"
set +a

# Required variables from .env
: "${AWS_ACCESS_KEY_ID:?Error: AWS_ACCESS_KEY_ID not set in .env}"
: "${AWS_SECRET_ACCESS_KEY:?Error: AWS_SECRET_ACCESS_KEY not set in .env}"
: "${AWS_REGION:?Error: AWS_REGION not set in .env (example: us-east-1)}"

export AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY
export AWS_DEFAULT_REGION="$AWS_REGION"

echo "Using AWS Region: $AWS_DEFAULT_REGION"

TABLE_NAME="data"

# Check if table already exists
if aws dynamodb describe-table --table-name "$TABLE_NAME" >/dev/null 2>&1; then
  echo "Table '$TABLE_NAME' already exists → exiting."
  exit 0
fi

echo "Creating table '$TABLE_NAME' ..."

aws dynamodb create-table \
  --table-name "$TABLE_NAME" \
  --attribute-definitions \
    AttributeName=PK,AttributeType=S \
    AttributeName=SK,AttributeType=S \
    AttributeName=GSI1PK,AttributeType=S \
    AttributeName=GSI1SK,AttributeType=S \
    AttributeName=GSI2PK,AttributeType=S \
    AttributeName=GSI2SK,AttributeType=S \
  --key-schema \
    AttributeName=PK,KeyType=HASH \
    AttributeName=SK,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST \
  --global-secondary-indexes '[
    {
      "IndexName": "GSI1",
      "KeySchema": [
        {"AttributeName":"GSI1PK","KeyType":"HASH"},
        {"AttributeName":"GSI1SK","KeyType":"RANGE"}
      ],
      "Projection": {"ProjectionType":"KEYS_ONLY"}
    },
    {
      "IndexName": "GSI2",
      "KeySchema": [
        {"AttributeName":"GSI2PK","KeyType":"HASH"},
        {"AttributeName":"GSI2SK","KeyType":"RANGE"}
      ],
      "Projection": {"ProjectionType":"KEYS_ONLY"}
    }
  ]' \
  --sse-specification Enabled=true,SSEType=KMS \
  --deletion-protection-enabled \
  --point-in-time-recovery-specification PointInTimeRecoveryEnabled=true

echo ""
echo "Table creation requested. Waiting for table to become ACTIVE..."

aws dynamodb wait table-exists --table-name "$TABLE_NAME"

echo "Done! Table '$TABLE_NAME' is now ACTIVE."
echo ""
echo "Summary:"
echo "• Billing mode     : On-demand (PAY_PER_REQUEST)"
echo "• Encryption       : AWS-managed KMS"
echo "• Deletion protection : Enabled"
echo "• PITR             : Enabled (35 days default)"
echo "• GSIs             : GSI1 + GSI2 (both KEYS_ONLY projection)"
echo "• Primary keys     : PK (HASH), SK (RANGE)"
echo ""
echo "You can now start using it."
