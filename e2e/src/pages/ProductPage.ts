import { Page } from '@playwright/test';


export class ProductPage {
constructor(public page: Page) {}


title() { return this.page.locator('.name'); }
price() { return this.page.locator('.price-container'); }
description() { return this.page.locator('#more-information'); }
addToCartButton() { return this.page.locator('a:has-text("Add to cart")'); }


async addToCart() {
await this.addToCartButton().click();
}
}