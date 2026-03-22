// path: tests/e2e/inventory.spec.ts
import { test, expect } from '@fixtures/pageFixtures';
import { EXPECTED_PRODUCT_COUNT } from '@test-data/inventoryData';

test.describe('Inventory Page', () => {
  test('should display inventory list after login', async ({ authenticatedPage }) => {
    const list = authenticatedPage.getInventoryList();
    await expect(list).toBeVisible();
  });

  test('should display 6 products', async ({ authenticatedPage }) => {
    const cards = await authenticatedPage.getProductCards();
    expect(cards).toHaveLength(EXPECTED_PRODUCT_COUNT);
  });
});
