// import { Page } from '@playwright/test';


// export class MenTopsPage {
// constructor(public page: Page) {}


// async goto() {
// await this.page.goto('https://magento2demo.firebearstudio.com/men.html');
// await this.page.waitForLoadState('networkidle');
// }


// paginationNext() {
// return this.page.locator('li.page-item a[rel="next"], li a[aria-label="Next"]');
// }


// pageCountFromPager() {
// return this.page.locator('ul.pagination li.page-item:not(.prev):not(.next)');
// }


// productCards() {
// return this.page.locator('ol.products.list li.item');
// }


// async extractProductsFromPage() {
// const products = [] as {name:string, price:number, colors:string[]}[];
// const cards = this.productCards();
// const count = await cards.count();
// for (let i = 0; i < count; i++) {
// const card = cards.nth(i);
// const name = (await card.locator('a.product-item-link').innerText()).trim();
// const priceText = (await card.locator('.price-box .price').first().innerText()).replace(/[^0-9.]/g,'');
// const price = Number(priceText);
// // colors: some pages expose color swatches
// const colorNodes = card.locator('.swatch-option');
// const colorCount = await colorNodes.count();
// const colors: string[] = [];
// for (let c = 0; c < colorCount; c++) {
// const attr = await colorNodes.nth(c).getAttribute('option-label');
// if (attr) colors.push(attr);
// }
// products.push({ name, price, colors });
// }
// return products;
// }
// }

import { Page } from '@playwright/test';
import { Product } from '../interfaces/Product';

export class MenTopsPage {
  constructor(public page: Page) {}

  async goto() {
    await this.page.goto('https://magento2demo.firebearstudio.com/men.html');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyURL() {
    return this.page.url().includes('/men.html');
  }

  paginationNext() {
    return this.page.locator('li.pages-item-next > a');
  }

  paginationCount() {
    return this.page.locator('ul.items');
  }

  productCards() {
    return this.page.locator('ol.products.list.items.product-items li.product-item');
  }

  async extractProductsFromPage(): Promise<Product[]> {
    const products: Product[] = [];
    const cards = this.productCards();
    const count = await cards.count();

    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const name = (await card.locator('.product-item-link').innerText()).trim();

      const priceText = await card.locator('.price-final_price .price').first().innerText();
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));

      const colorElements = card.locator('.swatch-option');
      const colors: string[] = [];
      const colorCount = await colorElements.count();
      for (let j = 0; j < colorCount; j++) {
        const color = await colorElements.nth(j).getAttribute('option-label');
        if (color) colors.push(color);
      }

      products.push({ name, colors, price, review: null });
    }

    return products;
  }

  async cycleProducts(): Promise<Product[]> {
    const allProducts: Product[] = [];

    while (true) {
      const productsOnPage = await this.extractProductsFromPage();
      allProducts.push(...productsOnPage);

      const nextBtn = this.paginationNext();
      if (await nextBtn.count() === 0) break;

      const isDisabled = await nextBtn.first().getAttribute('aria-disabled');
      if (isDisabled === 'true') break;

      await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'networkidle' }),
        nextBtn.click()
      ]);
    }

    return allProducts;
  }
}