# E2E Testing Configuration

This file contains configuration for the End-to-End testing pipeline.

## Test Environment Variables

```bash
# Application Configuration
APP_URL=http://fast-food-e2e-test.example.com
API_BASE_URL=${APP_URL}/api
HEALTH_ENDPOINT=${APP_URL}/health

# Test Configuration
TEST_TIMEOUT=1800000  # 30 minutes in milliseconds
MAX_RETRIES=3
RETRY_DELAY=5000     # 5 seconds

# Database Configuration (for test validation)
TEST_DB_HOST=fast-food-e2e-test-db.cluster-xxx.us-east-1.rds.amazonaws.com
TEST_DB_NAME=fastfood_e2e
TEST_DB_USER=fastfood_user

# Payment Gateway (Test Mode)
MERCADO_PAGO_ACCESS_TOKEN=TEST-your-test-token
MERCADO_PAGO_PUBLIC_KEY=TEST-your-public-key
MERCADO_PAGO_WEBHOOK_SECRET=your-webhook-secret
```

## Test Suites

### 1. Client Management Tests
- Create new client
- Update client information
- Get client details
- List client orders
- Delete client (soft delete)

### 2. Order Workflow Tests
- Create order with multiple products
- Update order status progression
- Cancel order
- Complete order workflow
- Validate order timestamps

### 3. Payment Integration Tests
- Generate payment QR code
- Simulate payment webhook
- Validate payment status updates
- Handle payment failures
- Test payment refunds

### 4. Admin Operations Tests
- Product category management
- Product CRUD operations
- Order status reporting
- System health checks

## Test Data

The E2E pipeline uses isolated test data that is:
- Created at the start of each test run
- Cleaned up after test completion
- Does not interfere with production data

## Manual Test Execution

To run specific test suites manually:

```bash
# Run all E2E tests
npm run test:e2e

# Run specific test suite
npm run test:e2e:clients
npm run test:e2e:orders
npm run test:e2e:payments
npm run test:e2e:admin

# Run with custom environment
TEST_ENVIRONMENT=staging npm run test:e2e
```

## Postman Collection

The E2E pipeline also runs the Postman collection (`api/Fast-Food.postman_collection.json`) to validate API endpoints.

Make sure to update the environment variables in the collection:
- `{{base_url}}` - Application base URL
- `{{client_id}}` - Test client ID
- `{{order_id}}` - Test order ID
- `{{payment_id}}` - Test payment ID

## Security Testing

The pipeline includes basic security tests:
- SQL injection protection
- Authorization validation
- Input sanitization
- Rate limiting (if implemented)

## Performance Testing

Basic performance validation:
- API response time monitoring
- Health check response time
- Database query performance

## Cleanup Process

The pipeline automatically destroys test infrastructure to avoid costs:
1. Application deployment cleanup
2. Kubernetes infrastructure destruction
3. Database infrastructure cleanup
4. Verification of resource removal

## Troubleshooting

### Common Issues

1. **Service not ready**: The pipeline waits for services to be healthy before running tests
2. **Timeout errors**: Increase `test_timeout` input parameter
3. **Cleanup failures**: Manual cleanup may be needed if pipeline fails

### Manual Cleanup

If automatic cleanup fails, manually trigger cleanup workflows:

```bash
# In each repository, run the cleanup workflow:
# - fast-food: "Cleanup - Application and Infrastructure"
# - fast-food-k8s-infra: "Cleanup - Destroy Kubernetes"
# - fast-food-db-infra: "Cleanup - Destroy Database"
```

## Monitoring

The pipeline provides:
- Test execution summary
- Artifact uploads for test reports
- Performance metrics
- Security scan results
- Cleanup verification