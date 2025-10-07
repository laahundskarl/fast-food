#!/usr/bin/env node

/**
 * E2E Order Workflow Tests
 * Tests complete order lifecycle from creation to completion
 */

const axios = require('axios');

const APP_URL = process.env.APP_URL || 'http://localhost:3000';
const API_BASE = `${APP_URL}/api`;

class OrderE2ETests {
    constructor() {
        this.testOrder = null;
        this.testClient = null;
        this.testProducts = [];
        this.testResults = [];
    }

    async runAllTests() {
        console.log('🚀 Starting Order Workflow E2E Tests...');
        console.log(`📍 Testing against: ${APP_URL}`);

        try {
            await this.setupTestData();
            await this.testCreateOrder();
            await this.testGetOrder();
            await this.testUpdateOrderStatus();
            await this.testListOrders();
            await this.testCompleteOrderWorkflow();

            this.printResults();
        } catch (error) {
            console.error('❌ Test suite failed:', error.message);
            process.exit(1);
        }
    }

    async setupTestData() {
        console.log('\n🔧 Setting up test data...');

        try {
            // Create test client
            const clientResponse = await axios.post(`${API_BASE}/clients`, {
                name: 'Order Test Client',
                email: `order-test-${Date.now()}@example.com`,
                cpf: '98765432109'
            });
            this.testClient = clientResponse.data;
            console.log('   ✅ Test client created');

            // Get available products
            const productsResponse = await axios.get(`${API_BASE}/products`);
            this.testProducts = productsResponse.data.slice(0, 2); // Take first 2 products
            console.log(`   ✅ Retrieved ${this.testProducts.length} test products`);

        } catch (error) {
            console.log('   ❌ Setup failed:', error.message);
            throw error;
        }
    }

    async testCreateOrder() {
        console.log('\n🧪 Test: Create Order');

        if (!this.testClient || this.testProducts.length === 0) {
            return this.logSkipped('Create order - missing test data');
        }

        const orderData = {
            clientId: this.testClient.id,
            products: this.testProducts.map(product => ({
                productId: product.id,
                quantity: 2
            }))
        };

        try {
            const response = await axios.post(`${API_BASE}/orders`, orderData);

            if (response.status === 201 && response.data.id) {
                this.testOrder = response.data;
                this.logSuccess('Order created successfully', `Order ID: ${response.data.id}`);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            this.logError('Create order failed', error);
        }
    }

    async testGetOrder() {
        if (!this.testOrder) return this.logSkipped('Get order - no order to test');

        console.log('\n🧪 Test: Get Order');

        try {
            const response = await axios.get(`${API_BASE}/orders/${this.testOrder.id}`);

            if (response.status === 200 && response.data.id === this.testOrder.id) {
                this.logSuccess('Order retrieved successfully', `Status: ${response.data.status}`);
            } else {
                throw new Error('Order data mismatch');
            }
        } catch (error) {
            this.logError('Get order failed', error);
        }
    }

    async testUpdateOrderStatus() {
        if (!this.testOrder) return this.logSkipped('Update order status - no order to test');

        console.log('\n🧪 Test: Update Order Status');

        const statusProgression = ['RECEIVED', 'IN_PREPARATION', 'READY', 'FINISHED'];

        for (const status of statusProgression) {
            try {
                const response = await axios.patch(`${API_BASE}/orders/${this.testOrder.id}/status`, { status });

                if (response.status === 200 && response.data.status === status) {
                    this.logSuccess(`Order status updated to ${status}`);
                    await this.sleep(1000); // Wait 1 second between status updates
                } else {
                    throw new Error(`Failed to update status to ${status}`);
                }
            } catch (error) {
                this.logError(`Update order status to ${status} failed`, error);
                break; // Stop progression if one status update fails
            }
        }
    }

    async testListOrders() {
        console.log('\n🧪 Test: List Orders');

        try {
            const response = await axios.get(`${API_BASE}/orders`);

            if (response.status === 200 && Array.isArray(response.data)) {
                const orderFound = response.data.some(order => order.id === this.testOrder?.id);
                if (orderFound) {
                    this.logSuccess('Orders listed successfully and test order found', `Total orders: ${response.data.length}`);
                } else {
                    this.logSuccess('Orders listed successfully', `Total orders: ${response.data.length}`);
                }
            } else {
                throw new Error('Invalid orders response');
            }
        } catch (error) {
            this.logError('List orders failed', error);
        }
    }

    async testCompleteOrderWorkflow() {
        console.log('\n🧪 Test: Complete Order Workflow Validation');

        if (!this.testOrder) return this.logSkipped('Order workflow validation - no order to test');

        try {
            // Get final order state
            const response = await axios.get(`${API_BASE}/orders/${this.testOrder.id}`);
            const finalOrder = response.data;

            // Validate order completion
            const validationChecks = [
                { check: 'Order exists', passed: !!finalOrder.id },
                { check: 'Order has client', passed: !!finalOrder.clientId },
                { check: 'Order has products', passed: finalOrder.products && finalOrder.products.length > 0 },
                { check: 'Order has valid status', passed: ['WAITING', 'RECEIVED', 'IN_PREPARATION', 'READY', 'FINISHED'].includes(finalOrder.status) },
                { check: 'Order has timestamps', passed: !!finalOrder.createdAt },
                { check: 'Order has total amount', passed: finalOrder.totalAmount > 0 }
            ];

            const passedChecks = validationChecks.filter(check => check.passed).length;
            const totalChecks = validationChecks.length;

            if (passedChecks === totalChecks) {
                this.logSuccess(`Order workflow validation passed (${passedChecks}/${totalChecks})`, finalOrder.status);
            } else {
                const failedChecks = validationChecks.filter(check => !check.passed).map(check => check.check);
                throw new Error(`Validation failed for: ${failedChecks.join(', ')}`);
            }

        } catch (error) {
            this.logError('Order workflow validation failed', error);
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    logSuccess(message, data = null) {
        console.log(`   ✅ ${message}`);
        if (data && typeof data === 'object') {
            console.log(`      📄 Data: ${JSON.stringify(data, null, 2).slice(0, 200)}...`);
        } else if (data) {
            console.log(`      📄 Data: ${data}`);
        }
        this.testResults.push({ type: 'success', message });
    }

    logError(message, error) {
        console.log(`   ❌ ${message}`);
        console.log(`      🚨 Error: ${error.message || error}`);
        this.testResults.push({ type: 'error', message, error: error.message || error });
    }

    logSkipped(message) {
        console.log(`   ⏭️  ${message}`);
        this.testResults.push({ type: 'skipped', message });
    }

    printResults() {
        const passed = this.testResults.filter(r => r.type === 'success').length;
        const failed = this.testResults.filter(r => r.type === 'error').length;
        const skipped = this.testResults.filter(r => r.type === 'skipped').length;

        console.log('\n📊 Order Workflow Test Results:');
        console.log(`   ✅ Passed: ${passed}`);
        console.log(`   ❌ Failed: ${failed}`);
        console.log(`   ⏭️  Skipped: ${skipped}`);

        if (failed > 0) {
            console.log('\n🚨 Failures:');
            this.testResults.filter(r => r.type === 'error').forEach(result => {
                console.log(`   - ${result.message}: ${result.error}`);
            });
            process.exit(1);
        } else {
            console.log('\n🎉 All order workflow tests passed!');
        }
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    const tests = new OrderE2ETests();
    tests.runAllTests().catch(console.error);
}

module.exports = OrderE2ETests;
