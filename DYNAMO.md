# DynamoDB Design & Rust Usage Rules (Single-Table Pattern)

This is the **canonical** way we design and use DynamoDB in this Rust API.

## 1. The Table (fixed forever)

**Table name**: `data` (never anything else)

**Primary key**:
- `PK` (String) – HASH
- `SK` (String) – RANGE

**Global Secondary Indexes** (exactly two, always named the same):
- `GSI1`
  - Partition: `GSI1PK` (String)
  - Sort:      `GSI1SK` (String)
- `GSI2`
  - Partition: `GSI2PK` (String)
  - Sort:      `GSI2SK` (String)

**All other settings** (enforced by `dynamo.sh`):
- Billing: On-demand (PAY_PER_REQUEST)
- Encryption: AWS-managed KMS
- Deletion protection: Enabled
- Point-in-Time Recovery: Enabled
- Projection on both GSIs: **KEYS_ONLY** (we almost never project more)

## 2. Core Modeling Principles

1. **Every item must have**:
   - `PK`, `SK`
   - `entity_type: String` (e.g. `"USER"`, `"ORDER"`, `"SESSION"`)
   - `id: String` (the business ID, usually a ULID or UUID)
   - `created_at`, `updated_at` (ISO 8601 strings)

2. **Key format convention** (strict):
   - Use `#` as separator
   - Always uppercase entity type
   - Examples:
     - `PK = "USER#01H9K2M3N4P5Q6R7S8T9U0V1"`
     - `SK = "PROFILE"` or `SK = "ORDER#2026-02-28#01H9..."`

3. **GSI overloading rules**:
   - One GSI can serve many access patterns via different prefixes.
   - Always document every prefix you add (see Access Patterns section below).

4. **Sparse indexes** – only populate `GSI1PK`/`GSI1SK` (or GSI2) when the item actually needs that access pattern.

## 3. Rust Implementation Rules (MUST follow)

### Crates we use
```toml
aws-sdk-dynamodb = "1"
aws-config = { version = "1", features = ["behavior-version-latest"] }
serde = { version = "1", features = ["derive"] }
serde_dynamo = "0.9"
ulid = { version = "1", features = ["serde"] }
chrono = { version = "0.4", features = ["serde"] }
