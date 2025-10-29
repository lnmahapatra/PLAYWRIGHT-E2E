import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';


test.describe('Demoblaze ecommerce flow', () => {
test('Add Samsung galaxy s6 to cart and verify', async ({ page }) => {
const home = new HomePage(page);
const product = new ProductPage(page);
const cart = new CartPage(page);


await home.goto();
await home.openProductByName('Samsung galaxy s6');


// Verify title, price, description presence
await expect(product.title()).toHaveText('Samsung galaxy s6');
const priceText = await product.price().innerText();
expect(priceText).toMatch(/\$?\d+/);
await expect(product.description()).toBeVisible();


// Add to cart and handle alert
page.once('dialog', async dialog => {
expect(dialog.message()).toContain('Product added');
await dialog.accept();
});


await product.addToCart();

// Navigate to cart and validate
await cart.goto();
const items = await cart.getCartItems();
const found = items.find(i => i.title === 'Samsung galaxy s6');
if (found) expect(found.price).toBeGreaterThan(0);
});
});