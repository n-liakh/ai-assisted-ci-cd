// path: src/components/ProductCardComponent.ts
import { Page, Locator } from '@playwright/test';
import { BaseComponent } from '@components/BaseComponent';

/**
 * ProductCardComponent models a single product card on the inventory page,
 * providing typed access to name, price, description, and add-to-cart action.
 */
export class ProductCardComponent extends BaseComponent {
  /**
   * @param page - Playwright Page instance.
   * @param root - The locator for this specific product card container.
   */
  constructor(page: Page, root: Locator) {
    super(page, root);
  }

  /** Returns the product name locator. */
  private get nameLocator() {
    return this.root.getByTestId('inventory-item-name');
  }

  /** Returns the product price locator. */
  private get priceLocator() {
    return this.root.getByTestId('inventory-item-price');
  }

  /** Returns the product description locator. */
  private get descriptionLocator() {
    return this.root.getByTestId('inventory-item-desc');
  }

  /** Returns the Add to Cart button locator. */
  private get addToCartButton() {
    return this.root.getByRole('button', { name: /add to cart/i });
  }

  /** Returns the Remove button locator. */
  private get removeButton() {
    return this.root.getByRole('button', { name: /remove/i });
  }

  /** Gets the displayed product name. */
  async getName(): Promise<string> {
    return (await this.nameLocator.textContent()) ?? '';
  }

  /** Gets the displayed product price as a string (e.g. '$29.99'). */
  async getPrice(): Promise<string> {
    return (await this.priceLocator.textContent()) ?? '';
  }

  /** Gets the displayed product description. */
  async getDescription(): Promise<string> {
    return (await this.descriptionLocator.textContent()) ?? '';
  }

  /** Clicks 'Add to Cart' to add the product to the cart. */
  async addToCart(): Promise<void> {
    this.log.info(`Adding product to cart`);
    await this.addToCartButton.click();
  }

  /** Clicks 'Remove' to remove the product from the cart. */
  async removeFromCart(): Promise<void> {
    this.log.info(`Removing product from cart`);
    await this.removeButton.click();
  }

  /** Returns true if the 'Remove' button is currently visible. */
  async isInCart(): Promise<boolean> {
    return this.removeButton.isVisible();
  }
}
