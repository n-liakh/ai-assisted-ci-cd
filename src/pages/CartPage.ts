// path: src/pages/CartPage.ts
import { Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';
import { HeaderComponent } from '@components/HeaderComponent';

/**
 * CartPage models the shopping cart page at '/cart.html'.
 * Provides access to cart items, checkout navigation, and the continue shopping link.
 */
export class CartPage extends BasePage {
  readonly header: HeaderComponent;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
  }

  /** Returns the cart items list container locator. */
  private get cartList() {
    return this.page.getByTestId('cart-list');
  }

  /** Returns the Checkout button locator. */
  private get checkoutButton() {
    return this.page.getByTestId('checkout');
  }

  /** Returns the Continue Shopping button locator. */
  private get continueShoppingButton() {
    return this.page.getByTestId('continue-shopping');
  }

  /** Returns the Remove button locator, matched by button text. */
  private get removeButton() {
    return this.page.getByRole('button', { name: 'Remove' });
  }

  /** Navigates directly to the cart page. */
  async goto(): Promise<void> {
    await this.navigate('/cart.html');
  }

  /**
   * Returns all cart item name texts as an array of strings.
   */
  async getCartItemNames(): Promise<string[]> {
    const items = await this.page.getByTestId('inventory-item-name').all();
    return Promise.all(items.map((item) => item.textContent().then((t) => t ?? '')));
  }

  /**
   * Returns the number of items currently in the cart.
   */
  async getCartItemCount(): Promise<number> {
    const items = await this.page.getByTestId('cart-item').all();
    return items.length;
  }  

  /**
   * Clicks the Remove button to remove the item from the cart.
   * Intended for use when exactly one item is present in the cart.
   */
  async removeItem(): Promise<void> {
    this.log.info('Removing item from cart');
    await this.click(this.removeButton, 'remove button');
  }

  /**
   * Clicks either the Checkout or Continue Shopping button.
   * @param action - 'checkout' navigates to checkout; 'continueShopping' returns to the inventory.
   */
  async clickAction(action: 'checkout' | 'continueShopping'): Promise<void> {
    const actions = {
      checkout: { locator: this.checkoutButton, label: 'checkout button' },
      continueShopping: { locator: this.continueShoppingButton, label: 'continue shopping button' },
    } as const;
    const { locator, label } = actions[action];
    this.log.info(`Clicking ${label}`);
    await this.click(locator, label);
  }

  /** Returns the cart list locator for assertions. */
  getCartList() {
    return this.cartList;
  }
}
