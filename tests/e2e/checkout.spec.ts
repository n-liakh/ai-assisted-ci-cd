// path: tests/e2e/checkout.spec.ts
import { test, expect } from '@fixtures/pageFixtures';
import { VALID_CHECKOUT_INFO } from '@test-data/checkoutData';

test.describe('Checkout', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    // Add an item and navigate to cart before each test
    await authenticatedPage.addFirstItemAndGoToCart();
  });

  test('should complete a full checkout flow', async ({ cartPage, checkoutPage, page }) => {
    await cartPage.clickAction('checkout');
    await checkoutPage.fillCheckoutInfo(VALID_CHECKOUT_INFO);

    await expect(page).toHaveURL(/checkout-step-two/);
    const total = await checkoutPage.getOrderTotal();
    expect(total).toMatch(/Total:/);

    await checkoutPage.finishCheckout();

    await expect(page).toHaveURL(/checkout-complete/);
    const confirmation = await checkoutPage.getConfirmationHeader();
    expect(confirmation).toContain('Thank you for your order');
  });
});
