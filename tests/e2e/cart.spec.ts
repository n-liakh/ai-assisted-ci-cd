// path: tests/e2e/cart.spec.ts
import { test, expect } from '@fixtures/pageFixtures';

test.describe('Cart', () => {
  test('should show empty cart when no items added', async ({ authenticatedPage, cartPage }) => {
    await authenticatedPage.header.goToCart();
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(0);
  });

  test('should add one item to cart and show it in cart', async ({ authenticatedPage, cartPage }) => {
    const productName = await authenticatedPage.addFirstItemAndGoToCart();
    const names = await cartPage.getCartItemNames();
    expect(names).toContain(productName);
  });

  test('should remove item from cart', async ({ authenticatedPage, cartPage }) => {
    const productName = await authenticatedPage.addFirstItemAndGoToCart();
    await cartPage.removeItem();
    const names = await cartPage.getCartItemNames();
    expect(names).toContain(productName);
  });
});
