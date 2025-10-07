#!/usr/bin/env node

/**
 * Local E2E Test Runner
 * Runs the complete E2E test suite locally for development and debugging
 */

const { spawn } = require('child_process');
const axios = require('axios');

const APP_URL = process.env.APP_URL || 'http://localhost:3000';
const TEST_TIMEOUT = parseInt(process.env.TEST_TIMEOUT || '1800000'); // 30 minutes

class LocalE2ERunner {
    constructor() {
        this.results = {
            health: false,
            clients: false,
            orders: false,
            payments: false,
            admin: false,
            postman: false
        };
        this.startTime = Date.now();
    }

    async runAllTests() {
        console.log('🚀 Starting Local E2E Test Suite...');
        console.log(`📍 Target Application: ${APP_URL}`);
        console.log(`⏱️  Timeout: ${TEST_TIMEOUT / 1000}s`);
        console.log('=' .repeat(60));

        try {
            await this.waitForApplication();
            await this.runHealthCheck();
            await this.runTestSuites();
            await this.runPostmanTests();

            this.printFinalResults();
        } catch (error) {
            console.error('❌ E2E Test Suite Failed:', error.message);
            process.exit(1);
        }
    }

    async waitForApplication() {
        console.log('\n🔍 Waiting for application to be ready...');

        const maxAttempts = 30;
        const attemptInterval = 5000; // 5 seconds

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                const response = await axios.get(`${APP_URL}/health`, { timeout: 5000 });
                if (response.status === 200) {
                    console.log(`✅ Application is ready (attempt ${attempt}/${maxAttempts})`);
                    return;
                }
            } catch (error) {
                console.log(`⏳ Waiting for application... (attempt ${attempt}/${maxAttempts})`);
                if (attempt < maxAttempts) {
                    await this.sleep(attemptInterval);
                }
            }
        }

        throw new Error('Application did not become ready within the timeout period');
    }

    async runHealthCheck() {
        console.log('\n🏥 Running Health Check...');

        try {
            const response = await axios.get(`${APP_URL}/health`);
            if (response.status === 200) {
                this.results.health = true;
                console.log('✅ Health check passed');

                if (response.data) {
                    console.log(`📊 Health data: ${JSON.stringify(response.data, null, 2)}`);
                }
            } else {
                throw new Error(`Health check failed with status: ${response.status}`);
            }
        } catch (error) {
            console.log('❌ Health check failed:', error.message);
            this.results.health = false;
        }
    }

    async runTestSuites() {
        console.log('\n🧪 Running Test Suites...');

        const testSuites = [
            { name: 'clients', script: 'npm run test:e2e:clients' },
            { name: 'orders', script: 'npm run test:e2e:orders' },
            { name: 'payments', script: 'npm run test:e2e:payments' },
            { name: 'admin', script: 'npm run test:e2e:admin' }
        ];

        for (const suite of testSuites) {
            console.log(`\n📋 Running ${suite.name} tests...`);

            try {
                const success = await this.runCommand(suite.script);
                this.results[suite.name] = success;

                if (success) {
                    console.log(`✅ ${suite.name} tests passed`);
                } else {
                    console.log(`❌ ${suite.name} tests failed`);
                }
            } catch (error) {
                console.log(`❌ ${suite.name} tests error:`, error.message);
                this.results[suite.name] = false;
            }
        }
    }

    async runPostmanTests() {
        console.log('\n📮 Running Postman Tests...');

        try {
            // Set environment variable for Newman
            process.env.APP_URL = APP_URL;

            const success = await this.runCommand('npm run test:postman');
            this.results.postman = success;

            if (success) {
                console.log('✅ Postman tests passed');
            } else {
                console.log('❌ Postman tests failed');
            }
        } catch (error) {
            console.log('❌ Postman tests error:', error.message);
            this.results.postman = false;
        }
    }

    async runCommand(command) {
        return new Promise((resolve) => {
            console.log(`🔧 Executing: ${command}`);

            const [cmd, ...args] = command.split(' ');
            const child = spawn(cmd, args, {
                stdio: 'inherit',
                shell: true,
                env: { ...process.env, APP_URL }
            });

            child.on('close', (code) => {
                if (code === 0) {
                    resolve(true);
                } else {
                    console.log(`⚠️  Command exited with code ${code}`);
                    resolve(false);
                }
            });

            child.on('error', (error) => {
                console.log(`⚠️  Command error: ${error.message}`);
                resolve(false);
            });
        });
    }

    printFinalResults() {
        const duration = Math.round((Date.now() - this.startTime) / 1000);
        const totalTests = Object.keys(this.results).length;
        const passedTests = Object.values(this.results).filter(result => result === true).length;
        const failedTests = totalTests - passedTests;

        console.log('\n' + '=' .repeat(60));
        console.log('📊 E2E TEST SUITE RESULTS');
        console.log('=' .repeat(60));

        console.log(`⏱️  Duration: ${duration}s`);
        console.log(`✅ Passed: ${passedTests}/${totalTests}`);
        console.log(`❌ Failed: ${failedTests}/${totalTests}`);
        console.log(`📍 Target: ${APP_URL}`);

        console.log('\n📋 Detailed Results:');
        Object.entries(this.results).forEach(([test, passed]) => {
            const icon = passed ? '✅' : '❌';
            const status = passed ? 'PASSED' : 'FAILED';
            console.log(`   ${icon} ${test.padEnd(12)} ${status}`);
        });

        if (failedTests > 0) {
            console.log('\n🚨 Some tests failed. Please check the output above for details.');
            console.log('💡 Tips:');
            console.log('   - Ensure the application is running and accessible');
            console.log('   - Check database connectivity');
            console.log('   - Verify API endpoints are responding correctly');
            console.log('   - Review application logs for errors');

            process.exit(1);
        } else {
            console.log('\n🎉 All E2E tests passed successfully!');
            console.log('🚀 Your application is ready for deployment.');
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Run if executed directly
if (require.main === module) {
    const runner = new LocalE2ERunner();
    runner.runAllTests().catch(console.error);
}

module.exports = LocalE2ERunner;
