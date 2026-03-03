const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  page.on('response', response => {
    const url = response.url();
    if (url.includes('api.bseindia.com') || url.includes('.aspx')) {
      console.log('Response URL:', url, response.status());
    }
  });

  await page.goto('https://www.bseindia.com/markets/equity/EQReports/StockPrcHistori.html?flag=0');
  
  // Fill the scrip search
  await page.fill('#smartSearch', 'reliance');
  await page.waitForTimeout(2000); // Wait for autocomplete
  // Assume we select Reliance (500325)
  // But wait, we can just use the DOM to set dates directly
  
  await page.evaluate(() => {
    document.getElementById('fromdate').value = '01/01/2004';
    document.getElementById('todate').value = '31/12/2004';
    document.getElementById('rdAson').click();
  });
  
  await browser.close();
})();
