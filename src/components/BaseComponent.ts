// path: src/components/BaseComponent.ts
import { Page, Locator } from '@playwright/test';
import { createLogger } from '@utils/logger';

/**
 * BaseComponent is the parent class for all reusable UI components.
 * Each component is scoped to a root locator within the page.
 */
export abstract class BaseComponent {
  protected readonly page: Page;
  protected readonly root: Locator;
  protected readonly log = createLogger(this.constructor.name);

  /**
   * @param page - Playwright Page instance.
   * @param root - The root locator that scopes the component's DOM subtree.
   */
  constructor(page: Page, root: Locator) {
    this.page = page;
    this.root = root;
  }

  /**
   * Checks if the component's root element is visible.
   */
  async isVisible(): Promise<boolean> {
    return this.root.isVisible();
  }
}
