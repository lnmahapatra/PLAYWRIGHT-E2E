// This test demonstrates the networkEvents function in a test-friendly way.
import { test } from '@playwright/test';
import { chromium } from 'playwright';


async function networkEvents() {
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


// Provide a test wrapper so it can be run with playwright test runner or node
test('networkEvents prints requests and responses', async () => {
await networkEvents();
});