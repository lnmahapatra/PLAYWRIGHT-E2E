import { Page } from '@playwright/test';


export class HomePage {
constructor(public page: Page) {}


async goto() {
await this.page.goto('https://www.demoblaze.com');
}


async openProductByName(name: string) {
await this.page.waitForSelector('.card-title a');
const links = this.page.locator('.card-title a');
const count = await links.count();
for (let i = 0; i < count; i++) {
const text = await links.nth(i).innerText();
if (text.trim() === name) {
await links.nth(i).click();
return;
}
}
throw new Error(`Product ${name} not found`);
}
}