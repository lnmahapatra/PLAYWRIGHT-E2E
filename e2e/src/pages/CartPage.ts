import { Page } from '@playwright/test';


export class CartPage {
constructor(public page: Page) {}


async goto() {
await this.page.click('#cartur');
//await this.page.waitForLoadState('networkidle');
}


productRows() { return this.page.locator('table#cart tbody tr'); }
async getCartItems() {
const rows = this.productRows();
const result: {title:string, price:number}[] = [];
const count = await rows.count();
for (let i = 0; i < count; i++) {
const row = rows.nth(i);
const title = (await row.locator('td').nth(1).innerText()).trim();
const priceText = (await row.locator('td').nth(2).innerText()).trim();
const price = Number(priceText);
result.push({ title, price });
}
return result;
}
}