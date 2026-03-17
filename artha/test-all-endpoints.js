/**
 * Comprehensive API endpoint testing script
 * Tests all endpoints with sample data and verifies responses
 */

const BASE_URL = 'http://localhost:3000';

// Test results tracker
const results = {
  passed: [],
  failed: [],
  skipped: []
};

async function testEndpoint(name, url, options = {}) {
  try {
    console.log(`\n🧪 Testing: ${name}`);
    console.log(`   URL: ${url}`);
    
    const response = await fetch(url, options);
    const text = await response.text();
    
    // Check if redirected to login
    if (text.includes('/login')) {
      console.log(`   ⚠️  SKIPPED: Requires authentication`);
      results.skipped.push({ name, url, reason: 'Auth required' });
      return;
    }
    
    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.log(`   ❌ FAILED: Invalid JSON response`);
      console.log(`   Response: ${text.substring(0, 200)}`);
      results.failed.push({ name, url, error: 'Invalid JSON', response: text.substring(0, 200) });
      return;
    }
    
    // Check for error responses
    if (response.status >= 400) {
      console.log(`   ❌ FAILED: HTTP ${response.status}`);
      console.log(`   Error: ${JSON.stringify(data, null, 2).substring(0, 200)}`);
      results.failed.push({ name, url, status: response.status, error: data });
      return;
    }
    
    console.log(`   ✅ PASSED: HTTP ${response.status}`);
    console.log(`   Data keys: ${Object.keys(data).join(', ')}`);
    
    // Show sample data structure
    if (Array.isArray(data)) {
      console.log(`   Array length: ${data.length}`);
      if (data.length > 0) {
        console.log(`   First item keys: ${Object.keys(data[0]).join(', ')}`);
      }
    } else if (data.results && Array.isArray(data.results)) {
      console.log(`   Results count: ${data.results.length}`);
    }
    
    results.passed.push({ name, url, status: response.status, dataKeys: Object.keys(data) });
    
  } catch (error) {
    console.log(`   ❌ FAILED: ${error.message}`);
    results.failed.push({ name, url, error: error.message });
  }
}

async function runTests() {
  console.log('=' .repeat(80));
  console.log('ARTHA API ENDPOINT TESTING');
  console.log('=' .repeat(80));
  
  // Test public/search endpoints
  await testEndpoint('Search API - RELIANCE', `${BASE_URL}/api/search?q=RELIANCE`);
  await testEndpoint('Search API - TCS', `${BASE_URL}/api/search?q=TCS`);
  await testEndpoint('Search API - INFY', `${BASE_URL}/api/search?q=INFY`);
  
  // Test sector hierarchy
  await testEndpoint('Sectors Hierarchy', `${BASE_URL}/api/sectors/hierarchy`);
  
  // Test screener metadata
  await testEndpoint('Screener Metadata', `${BASE_URL}/api/screener/meta`);
  
  // Test feed
  await testEndpoint('Feed API', `${BASE_URL}/api/feed`);
  
  // Test stock-specific endpoints (using RELIANCE as example)
  const testSymbol = 'RELIANCE';
  await testEndpoint(`Stock Overview - ${testSymbol}`, `${BASE_URL}/api/stocks/${testSymbol}/overview`);
  await testEndpoint(`Stock Chart - ${testSymbol}`, `${BASE_URL}/api/stocks/${testSymbol}/chart?interval=1d&range=1y`);
  await testEndpoint(`Stock Financials - ${testSymbol}`, `${BASE_URL}/api/stocks/${testSymbol}/financials`);
  await testEndpoint(`Stock Analytics - ${testSymbol}`, `${BASE_URL}/api/stocks/${testSymbol}/analytics`);
  await testEndpoint(`Stock Ownership - ${testSymbol}`, `${BASE_URL}/api/stocks/${testSymbol}/ownership`);
  await testEndpoint(`Stock Peers - ${testSymbol}`, `${BASE_URL}/api/stocks/${testSymbol}/peers`);
  await testEndpoint(`Stock Documents - ${testSymbol}`, `${BASE_URL}/api/stocks/${testSymbol}/documents`);
  
  // Test analytics endpoints
  await testEndpoint('Analytics - Correlations', `${BASE_URL}/api/analytics/correlations?symbols=RELIANCE,TCS,INFY`);
  await testEndpoint('Analytics - Autocorrelations', `${BASE_URL}/api/analytics/autocorrelations?symbol=RELIANCE`);
  await testEndpoint('Analytics - Factor Attribution', `${BASE_URL}/api/analytics/factor-attribution?symbol=RELIANCE`);
  
  // Print summary
  console.log('\n' + '='.repeat(80));
  console.log('TEST SUMMARY');
  console.log('='.repeat(80));
  console.log(`✅ PASSED:  ${results.passed.length}`);
  console.log(`❌ FAILED:  ${results.failed.length}`);
  console.log(`⚠️  SKIPPED: ${results.skipped.length}`);
  
  if (results.failed.length > 0) {
    console.log('\nFailed Tests:');
    results.failed.forEach(f => {
      console.log(`  - ${f.name}: ${f.error || f.status}`);
    });
  }
  
  if (results.skipped.length > 0) {
    console.log('\nSkipped Tests (Auth Required):');
    results.skipped.forEach(s => {
      console.log(`  - ${s.name}`);
    });
  }
  
  console.log('\n' + '='.repeat(80));
  
  // Exit with error code if any tests failed
  if (results.failed.length > 0) {
    process.exit(1);
  }
}

// Run tests
runTests().catch(err => {
  console.error('Test runner failed:', err);
  process.exit(1);
});
