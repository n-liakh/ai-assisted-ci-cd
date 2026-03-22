// path: src/pages/BasePage.ts
import { Page, Locator } from '@playwright/test';
import { createLogger } from '@utils/logger';

/**
 * BasePage provides shared navigation, interaction helpers,
 * and a logger for all Page Object classes.
 */
export abstract class BasePage {
  protected readonly page: Page;
  protected readonly log = createLogger(this.constructor.name);

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to the given path relative to baseURL.
   * @param path - Relative URL path (e.g. '/inventory.html').
   */
  async navigate(path: string = '/'): Promise<void> {
    this.log.info(`Navigating to ${path}`);
    await this.page.goto(path);
  }

  /**
   * Returns the current page URL.
   */
  getUrl(): string {
    return this.page.url();
  }

  /**
   * Returns the text content of an error locator, or null when not visible.
   * Shared by LoginPage and CheckoutPage to avoid duplicated error-reading logic.
   * @param locator - The error element locator.
   */
  protected async getErrorText(locator: Locator): Promise<string | null> {
    if (!(await locator.isVisible())) return null;
    return locator.textContent();
  }

  /**
   * Clicks an element and logs the action.
   * @param locator - The target element locator.
   * @param description - Human-readable description for logging.
   */
  protected async click(locator: Locator, description: string): Promise<void> {
    this.log.debug(`Clicking: ${description}`);
    await locator.click();
  }

  /**
   * Fills an input field and logs the action.
   * @param locator - The target input locator.
   * @param value - The value to type.
   * @param description - Human-readable description for logging.
   */
  protected async fill(locator: Locator, value: string, description: string): Promise<void> {
    this.log.debug(`Filling "${description}" with value`);
    await locator.fill(value);
  }
}
