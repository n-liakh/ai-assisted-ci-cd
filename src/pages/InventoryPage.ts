// path: src/pages/InventoryPage.ts
import { Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';
import { HeaderComponent } from '@components/HeaderComponent';
import { SideMenuComponent } from '@components/SideMenuComponent';
import { ProductCardComponent } from '@components/ProductCardComponent';

/** Valid sort option labels on the inventory dropdown. */
export type SortOption =
  | 'Name (A to Z)'
  | 'Name (Z to A)'
  | 'Price (low to high)'
  | 'Price (high to low)';

/**
 * InventoryPage models the main product listing page at '/inventory.html'.
 * Composes the header, side menu, and individual product card components.
 */
export class InventoryPage extends BasePage {
  readonly header: HeaderComponent;
  readonly sideMenu: SideMenuComponent;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.sideMenu = new SideMenuComponent(page);
  }

  /** Returns the sort dropdown locator. */
  private get sortDropdown() {
    return this.page.getByTestId('product-sort-container');
  }

  /** Returns the inventory list container locator. */
  private get inventoryList() {
    return this.page.getByTestId('inventory-container');
  }

  /** Navigates directly to the inventory page. */
  async goto(): Promise<void> {
    await this.navigate('/inventory.html');
  }

  /**
   * Returns all product cards on the page as typed component objects.
   */
  async getProductCards(): Promise<ProductCardComponent[]> {
    const cards = await this.page.getByTestId('inventory-item').all();
    return cards.map((locator) => new ProductCardComponent(this.page, locator));
  }

  /**
   * Finds a product card by its exact displayed name.
   * Throws if the product is not found.
   * @param name - The product name to search for.
   */
  async getProductCardByName(name: string): Promise<ProductCardComponent> {
    const cards = await this.getProductCards();
    for (const card of cards) {
      const cardName = await card.getName();
      if (cardName === name) return card;
    }
    throw new Error(`Product with name "${name}" not found on inventory page`);
  }

  /**
   * Selects a sort option from the product sort dropdown.
   * @param option - A valid sort label string.
   */
  async sortBy(option: SortOption): Promise<void> {
    this.log.info(`Sorting products by "${option}"`);
    await this.sortDropdown.selectOption({ label: option });
  }

  /** Returns all displayed product names in DOM order. */
  async getProductNames(): Promise<string[]> {
    const cards = await this.getProductCards();
    return Promise.all(cards.map((c) => c.getName()));
  }

  /**
   * Adds the first product in the list to the cart and navigates to the cart page.
   * Encapsulates the repeated "add item → go to cart" setup flow used across multiple tests.
   * @returns The displayed name of the product that was added.
   */
  async addFirstItemAndGoToCart(): Promise<string> {
    const cards = await this.getProductCards();
    const productName = await cards[0].getName();
    await cards[0].addToCart();
    await this.header.goToCart();
    return productName;
  }

  /** Returns the inventory list container locator for assertions. */
  getInventoryList() {
    return this.inventoryList;
  }
}
