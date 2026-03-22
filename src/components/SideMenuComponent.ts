// path: src/components/SideMenuComponent.ts
import { Page } from '@playwright/test';
import { BaseComponent } from '@components/BaseComponent';

/**
 * SideMenuComponent models the slide-out navigation menu
 * accessible from the burger icon in the header.
 */
export class SideMenuComponent extends BaseComponent {
  constructor(page: Page) {
    super(page, page.getByRole('navigation'));
  }

  /** Returns the 'All Items' menu link locator. */
  private get allItemsLink() {
    return this.page.getByRole('link', { name: 'All Items' });
  }

  /** Returns the 'About' menu link locator. */
  private get aboutLink() {
    return this.page.getByRole('link', { name: 'About' });
  }

  /** Returns the 'Logout' menu link locator. */
  private get logoutLink() {
    return this.page.getByRole('link', { name: 'Logout' });
  }

  /** Returns the 'Reset App State' menu link locator. */
  private get resetLink() {
    return this.page.getByRole('link', { name: 'Reset App State' });
  }

  /** Returns the close button locator. */
  private get closeButton() {
    return this.page.getByRole('button', { name: 'Close Menu' });
  }

  /** Navigates to the inventory (all items) page via menu. */
  async goToAllItems(): Promise<void> {
    this.log.info('Clicking All Items menu link');
    await this.allItemsLink.click();
  }

  /** Clicks logout and returns to the login page. */
  async logout(): Promise<void> {
    this.log.info('Logging out via side menu');
    await this.logoutLink.click();
  }

  /** Resets the app state via menu. */
  async resetAppState(): Promise<void> {
    this.log.info('Resetting app state via menu');
    await this.resetLink.click();
  }

  /** Closes the side menu. */
  async close(): Promise<void> {
    this.log.info('Closing side menu');
    await this.closeButton.click();
  }
}
