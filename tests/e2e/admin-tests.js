#!/usr/bin/env node

/**
 * E2E Admin Operations Tests
 * Tests administrative operations and system health
 */

const axios = require('axios');

const APP_URL = process.env.APP_URL || 'http://localhost:3000';
const API_BASE = `${APP_URL}/api`;

class AdminE2ETests {
    constructor() {
        this.testCategory = null;
        this.testProduct = null;
        this.testResults = [];
    }

    async runAllTests() {
        console.log('🚀 Starting Admin Operations E2E Tests...');
        console.log(`📍 Testing against: ${APP_URL}`);

        try {
            await this.testSystemHealth();
            await this.testProductCategoryManagement();
            await this.testProductManagement();
            await this.testOrderReporting();
            await this.testSystemMetrics();

            this.printResults();
        } catch (error) {
            console.error('❌ Test suite failed:', error.message);
            process.exit(1);
        }
    }

    async testSystemHealth() {
        console.log('\n🧪 Test: System Health Check');

        try {
            const response = await axios.get(`${APP_URL}/health`);

            if (response.status === 200) {
                this.logSuccess('Health check passed', `Status: ${response.status}`);

                // Check if response has expected health data
                if (response.data && typeof response.data === 'object') {
                    const healthData = response.data;

                    // Validate typical health check properties
                    const healthChecks = [
                        { check: 'Has status', passed: !!healthData.status },
                        { check: 'Has timestamp', passed: !!healthData.timestamp || !!healthData.time },
                        { check: 'Database connectivity', passed: healthData.database !== false }
                    ];

                    const passedChecks = healthChecks.filter(check => check.passed).length;
                    this.logSuccess(`Health validation passed (${passedChecks}/${healthChecks.length})`);
                } else {
                    this.logSuccess('Basic health check responded');
                }
            } else {
                throw new Error(`Unexpected status code: ${response.status}`);
            }
        } catch (error) {
            this.logError('System health check failed', error);
        }
    }

    async testProductCategoryManagement() {
        console.log('\n🧪 Test: Product Category Management');

        try {
            // Test category creation
            const categoryData = {
                name: `E2E Test Category ${Date.now()}`,
                description: 'Test category for E2E testing'
            };

            const createResponse = await axios.post(`${API_BASE}/categories`, categoryData);

            if (createResponse.status === 201 && createResponse.data.id) {
                this.testCategory = createResponse.data;
                this.logSuccess('Category created successfully', `ID: ${createResponse.data.id}`);
            } else {
                throw new Error('Category creation failed');
            }

            // Test category listing
            const listResponse = await axios.get(`${API_BASE}/categories`);

            if (listResponse.status === 200 && Array.isArray(listResponse.data)) {
                const categoryFound = listResponse.data.some(cat => cat.id === this.testCategory.id);
                if (categoryFound) {
                    this.logSuccess('Category listing successful and test category found');
                } else {
                    this.logError('Category not found in list', new Error('Test category missing from list'));
                }
            } else {
                throw new Error('Category listing failed');
            }

            // Test category update
            const updateData = { name: `Updated ${categoryData.name}` };
            const updateResponse = await axios.put(`${API_BASE}/categories/${this.testCategory.id}`, updateData);

            if (updateResponse.status === 200) {
                this.logSuccess('Category updated successfully');
            } else {
                this.logError('Category update failed', new Error(`Status: ${updateResponse.status}`));
            }

        } catch (error) {
            this.logError('Product category management failed', error);
        }
    }

    async testProductManagement() {
        console.log('\n🧪 Test: Product Management');

        try {
            // Get available categories first
            let categoryId = this.testCategory?.id;

            if (!categoryId) {
                const categoriesResponse = await axios.get(`${API_BASE}/categories`);
                if (categoriesResponse.data && categoriesResponse.data.length > 0) {
                    categoryId = categoriesResponse.data[0].id;
                } else {
                    throw new Error('No categories available for product testing');
                }
            }

            // Test product creation
            const productData = {
                name: `E2E Test Product ${Date.now()}`,
                description: 'Test product for E2E testing',
                price: 29.99,
                categoryId: categoryId
            };

            const createResponse = await axios.post(`${API_BASE}/products`, productData);

            if (createResponse.status === 201 && createResponse.data.id) {
                this.testProduct = createResponse.data;
                this.logSuccess('Product created successfully', `ID: ${createResponse.data.id}`);
            } else {
                throw new Error('Product creation failed');
            }

            // Test product retrieval
            const getResponse = await axios.get(`${API_BASE}/products/${this.testProduct.id}`);

            if (getResponse.status === 200 && getResponse.data.id === this.testProduct.id) {
                this.logSuccess('Product retrieved successfully');
            } else {
                throw new Error('Product retrieval failed');
            }

            // Test product listing
            const listResponse = await axios.get(`${API_BASE}/products`);

            if (listResponse.status === 200 && Array.isArray(listResponse.data)) {
                const productFound = listResponse.data.some(prod => prod.id === this.testProduct.id);
                if (productFound) {
                    this.logSuccess('Product listing successful and test product found');
                } else {
                    this.logError('Product not found in list', new Error('Test product missing from list'));
                }
            } else {
                throw new Error('Product listing failed');
            }

            // Test product update
            const updateData = { price: 34.99 };
            const updateResponse = await axios.put(`${API_BASE}/products/${this.testProduct.id}`, updateData);

            if (updateResponse.status === 200) {
                this.logSuccess('Product updated successfully');
            } else {
                this.logError('Product update failed', new Error(`Status: ${updateResponse.status}`));
            }

        } catch (error) {
            this.logError('Product management failed', error);
        }
    }

    async testOrderReporting() {
        console.log('\n🧪 Test: Order Reporting');

        try {
            // Test order listing with different filters
            const tests = [
                { endpoint: '/orders', description: 'All orders' },
                { endpoint: '/orders?status=WAITING', description: 'Waiting orders' },
                { endpoint: '/orders?status=FINISHED', description: 'Finished orders' }
            ];

            for (const test of tests) {
                try {
                    const response = await axios.get(`${API_BASE}${test.endpoint}`);

                    if (response.status === 200 && Array.isArray(response.data)) {
                        this.logSuccess(`${test.description} report generated`, `Found ${response.data.length} orders`);
                    } else {
                        throw new Error(`Invalid response for ${test.description}`);
                    }
                } catch (error) {
                    this.logError(`${test.description} report failed`, error);
                }
            }

        } catch (error) {
            this.logError('Order reporting failed', error);
        }
    }

    async testSystemMetrics() {
        console.log('\n🧪 Test: System Metrics');

        try {
            // Test various system endpoints that might provide metrics
            const metricsTests = [
                { endpoint: '/api/products', metric: 'Total products' },
                { endpoint: '/api/categories', metric: 'Total categories' },
                { endpoint: '/api/orders', metric: 'Total orders' },
                { endpoint: '/api/clients', metric: 'Total clients' }
            ];

            const metrics = {};

            for (const test of metricsTests) {
                try {
                    const response = await axios.get(`${APP_URL}${test.endpoint}`);

                    if (response.status === 200 && Array.isArray(response.data)) {
                        metrics[test.metric] = response.data.length;
                        this.logSuccess(`${test.metric} counted`, `Count: ${response.data.length}`);
                    } else {
                        metrics[test.metric] = 'N/A';
                        this.logSuccess(`${test.metric} endpoint accessible`);
                    }
                } catch (error) {
                    metrics[test.metric] = 'Error';
                    this.logError(`${test.metric} count failed`, error);
                }
            }

            // Log summary metrics
            console.log('\n📊 System Metrics Summary:');
            Object.entries(metrics).forEach(([metric, value]) => {
                console.log(`   📈 ${metric}: ${value}`);
            });

        } catch (error) {
            this.logError('System metrics collection failed', error);
        }
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

        console.log('\n📊 Admin Operations Test Results:');
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
            console.log('\n🎉 All admin operations tests passed!');
        }
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    const tests = new AdminE2ETests();
    tests.runAllTests().catch(console.error);
}

module.exports = AdminE2ETests;
