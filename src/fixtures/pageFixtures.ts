// path: src/fixtures/pageFixtures.ts
import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { InventoryPage } from '@pages/InventoryPage';
import { CartPage } from '@pages/CartPage';
import { CheckoutPage } from '@pages/CheckoutPage';

/**
 * Extended fixture types providing typed page objects
 * and a pre-authenticated session for tests that need it.
 */
export type PageFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  /** Authenticated page: navigates to inventory using session from storageState. */
  authenticatedPage: InventoryPage;
};

/**
 * Extended Playwright test with SauceDemo page object fixtures.
 * Use `test` from this file instead of `@playwright/test` in spec files.
 */
export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  /**
   * Fixture that navigates to the inventory page using the pre-authenticated
   * browser context loaded from storageState (set by the auth setup project).
   * Ideal for tests that require an authenticated state without testing login itself.
   */
  authenticatedPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await use(inventoryPage);
  },
});

export { expect } from '@playwright/test';
