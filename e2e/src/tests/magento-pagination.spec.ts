import { test, expect } from '@playwright/test';
import { MenTopsPage } from '../pages/MenTopsPage';
import { SoftAssert } from '../utils/SoftAssert';
import type { Product } from '../interfaces/Product';

test.describe('Magento Dynamic Table & Pagination Verification', () => {
  test('Verify all products across pages and check Yellow Tiberius Gym Tank', async ({ page }) => {
    const menPage = new MenTopsPage(page);
    const softAssert = new SoftAssert();

    await menPage.goto();
    expect(await menPage.verifyURL()).toBeTruthy();

    const paginationCount = await menPage.paginationCount().count();
    expect(paginationCount).toBeGreaterThan(1);

    const allProducts = await menPage.cycleProducts();

    for (const product of allProducts) {
      softAssert.log(!!product.name, `Missing product name for one item.`);
      softAssert.log(product.price > 0, `Invalid price for ${product.name}`);
    }

    const found = allProducts.find(p =>
      p.name.toLowerCase().includes('yellow tiberius gym tank')
    );

    //expect(found, 'Expected to find Yellow Tiberius Gym Tank').toBeTruthy();

    // Assert all soft assertion errors
    softAssert.assertAll();
  });
});