import { chromium } from 'playwright';


export async function networkEvents() {
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();


page.on('request', request => {
console.log('[Request]', request.method(), request.url());
});


page.on('response', response => {
console.log('[Response]', response.status(), response.url());
});


await page.goto('https://coderbyte.com');
await browser.close();
}


// If executed as a script
if (require.main === module) {
networkEvents().catch(err => {
console.error(err);
process.exit(1);
});
}