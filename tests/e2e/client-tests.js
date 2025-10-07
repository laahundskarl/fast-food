#!/usr/bin/env node

/**
 * E2E Client Management Tests
 * Tests client creation, updates, retrieval, and deletion
 */

const axios = require('axios');

const APP_URL = process.env.APP_URL || 'http://localhost:3000';
const API_BASE = `${APP_URL}/api`;

class ClientE2ETests {
    constructor() {
        this.testClient = null;
        this.testResults = [];
    }

    async runAllTests() {
        console.log('🚀 Starting Client Management E2E Tests...');
        console.log(`📍 Testing against: ${APP_URL}`);

        try {
            await this.testCreateClient();
            await this.testGetClient();
            await this.testUpdateClient();
            await this.testListClientOrders();
            await this.testDeleteClient();

            this.printResults();
        } catch (error) {
            console.error('❌ Test suite failed:', error.message);
            process.exit(1);
        }
    }

    async testCreateClient() {
        console.log('\n🧪 Test: Create Client');

        const clientData = {
            name: 'E2E Test Client',
            email: `e2e-test-${Date.now()}@example.com`,
            cpf: '12345678901'
        };

        try {
            const response = await axios.post(`${API_BASE}/clients`, clientData);

            if (response.status === 201 && response.data.id) {
                this.testClient = response.data;
                this.logSuccess('Client created successfully', response.data);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            this.logError('Create client failed', error);
        }
    }

    async testGetClient() {
        if (!this.testClient) return this.logSkipped('Get client - no client to test');

        console.log('\n🧪 Test: Get Client');

        try {
            const response = await axios.get(`${API_BASE}/clients/${this.testClient.id}`);

            if (response.status === 200 && response.data.id === this.testClient.id) {
                this.logSuccess('Client retrieved successfully', response.data);
            } else {
                throw new Error('Client data mismatch');
            }
        } catch (error) {
            this.logError('Get client failed', error);
        }
    }

    async testUpdateClient() {
        if (!this.testClient) return this.logSkipped('Update client - no client to test');

        console.log('\n🧪 Test: Update Client');

        const updateData = {
            name: 'Updated E2E Test Client'
        };

        try {
            const response = await axios.put(`${API_BASE}/clients/${this.testClient.id}`, updateData);

            if (response.status === 200 && response.data.name === updateData.name) {
                this.testClient = response.data;
                this.logSuccess('Client updated successfully', response.data);
            } else {
                throw new Error('Update failed or data mismatch');
            }
        } catch (error) {
            this.logError('Update client failed', error);
        }
    }

    async testListClientOrders() {
        if (!this.testClient) return this.logSkipped('List client orders - no client to test');

        console.log('\n🧪 Test: List Client Orders');

        try {
            const response = await axios.get(`${API_BASE}/clients/${this.testClient.id}/orders`);

            if (response.status === 200 && Array.isArray(response.data)) {
                this.logSuccess('Client orders retrieved successfully', `Found ${response.data.length} orders`);
            } else {
                throw new Error('Invalid orders response');
            }
        } catch (error) {
            this.logError('List client orders failed', error);
        }
    }

    async testDeleteClient() {
        if (!this.testClient) return this.logSkipped('Delete client - no client to test');

        console.log('\n🧪 Test: Delete Client');

        try {
            const response = await axios.delete(`${API_BASE}/clients/${this.testClient.id}`);

            if (response.status === 200 || response.status === 204) {
                this.logSuccess('Client deleted successfully');
            } else {
                throw new Error('Delete failed');
            }
        } catch (error) {
            this.logError('Delete client failed', error);
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

        console.log('\n📊 Client Management Test Results:');
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
            console.log('\n🎉 All client management tests passed!');
        }
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    const tests = new ClientE2ETests();
    tests.runAllTests().catch(console.error);
}

module.exports = ClientE2ETests;
