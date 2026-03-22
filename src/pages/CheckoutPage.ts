// path: src/pages/CheckoutPage.ts
import { Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';
import { HeaderComponent } from '@components/HeaderComponent';
import type { CheckoutInfo } from '@shared/index';

export type { CheckoutInfo };

/**
 * CheckoutPage models the two-step checkout flow:
 * Step 1 ('/checkout-step-one.html') – personal information form.
 * Step 2 ('/checkout-step-two.html') – order overview and confirmation.
 */
export class CheckoutPage extends BasePage {
  readonly header: HeaderComponent;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
  }

  // ── Step 1 locators ──────────────────────────────────────────────────────

  /** Returns the First Name input locator. */
  private get firstNameInput() {
    return this.page.getByTestId('firstName');
  }

  /** Returns the Last Name input locator. */
  private get lastNameInput() {
    return this.page.getByTestId('lastName');
  }

  /** Returns the Postal Code input locator. */
  private get postalCodeInput() {
    return this.page.getByTestId('postalCode');
  }

  /** Returns the Continue button locator on step 1. */
  private get continueButton() {
    return this.page.getByTestId('continue');
  }

  /** Returns the Cancel button locator. */
  private get cancelButton() {
    return this.page.getByTestId('cancel');
  }

  /** Returns the error message locator. */
  private get errorMessage() {
    return this.page.getByTestId('error');
  }

  // ── Step 2 locators ──────────────────────────────────────────────────────

  /** Returns the Finish button locator on step 2. */
  private get finishButton() {
    return this.page.getByTestId('finish');
  }

  /** Returns the order summary total label locator. */
  private get totalLabel() {
    return this.page.getByTestId('total-label');
  }

  /** Returns the order complete header locator (confirmation page). */
  private get completeHeader() {
    return this.page.getByTestId('complete-header');
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  /**
   * Fills and submits the checkout information form (step 1).
   * @param info - First name, last name, and postal code.
   */
  async fillCheckoutInfo(info: CheckoutInfo): Promise<void> {
    this.log.info('Filling checkout information');
    await this.fill(this.firstNameInput, info.firstName, 'first name');
    await this.fill(this.lastNameInput, info.lastName, 'last name');
    await this.fill(this.postalCodeInput, info.postalCode, 'postal code');
    await this.click(this.continueButton, 'continue button');
  }

  /** Clicks Finish to complete the purchase on step 2. */
  async finishCheckout(): Promise<void> {
    this.log.info('Finishing checkout');
    await this.click(this.finishButton, 'finish button');
  }

  /** Clicks Cancel to abandon checkout and return to inventory. */
  async cancelCheckout(): Promise<void> {
    this.log.info('Cancelling checkout');
    await this.click(this.cancelButton, 'cancel button');
  }

  /**
   * Returns the text of the order total on the overview page.
   * Example: 'Total: $32.39'
   */
  async getOrderTotal(): Promise<string> {
    return (await this.totalLabel.textContent()) ?? '';
  }

  /**
   * Returns the confirmation header text shown after a successful order.
   * Example: 'Thank you for your order!'
   */
  async getConfirmationHeader(): Promise<string> {
    return (await this.completeHeader.textContent()) ?? '';
  }

  /**
   * Returns the error message text after a failed form submission.
   * Returns null if no error is displayed.
   */
  async getErrorMessage(): Promise<string | null> {
    return this.getErrorText(this.errorMessage);
  }
}
