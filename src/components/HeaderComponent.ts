// path: src/components/HeaderComponent.ts
import { Page } from '@playwright/test';
import { BaseComponent } from '@components/BaseComponent';

/**
 * HeaderComponent models the top navigation bar shared across all
 * authenticated pages (cart icon, burger menu, app logo).
 */
export class HeaderComponent extends BaseComponent {
  constructor(page: Page) {
    super(page, page.getByTestId('primary-header'));
  }

  /** Returns the shopping cart link locator. */
  private get cartLink() {
    return this.page.getByTestId('shopping-cart-link');
  }

  /** Returns the burger menu button locator. */
  private get menuButton() {
    return this.page.getByRole('button', { name: 'Open Menu' });
  }

  /** Returns the cart badge showing item count. */
  private get cartBadge() {
    return this.page.getByTestId('shopping-cart-badge');
  }

  /** Clicks the shopping cart icon to navigate to the cart page. */
  async goToCart(): Promise<void> {
    this.log.info('Navigating to cart via header icon');
    await this.cartLink.click();
  }

  /**
   * Returns the number shown on the cart badge.
   * Returns 0 if the badge is not visible.
   */
  async getCartCount(): Promise<number> {
    const visible = await this.cartBadge.isVisible();
    if (!visible) return 0;
    const text = await this.cartBadge.textContent();
    return parseInt(text ?? '0', 10);
  }

  /** Opens the side navigation burger menu. */
  async openMenu(): Promise<void> {
    this.log.info('Opening burger menu');
    await this.menuButton.click();
  }
}
