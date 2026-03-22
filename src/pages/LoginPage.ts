// path: src/pages/LoginPage.ts
import { Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';
import { UserCredentials } from '@utils/envHelper';

/**
 * LoginPage models the SauceDemo login screen at '/'.
 * Provides methods to interact with the username, password,
 * and login button, as well as error message inspection.
 */
export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Returns the username input locator. */
  private get usernameInput() {
    return this.page.getByTestId('username');
  }

  /** Returns the password input locator. */
  private get passwordInput() {
    return this.page.getByTestId('password');
  }

  /** Returns the login submit button locator. */
  private get loginButton() {
    return this.page.getByTestId('login-button');
  }

  /** Returns the error message container locator. */
  private get errorMessage() {
    return this.page.getByTestId('error');
  }

  /** Navigates to the login page (root path). */
  async goto(): Promise<void> {
    await this.navigate('/');
  }

  /**
   * Fills the username field.
   * @param username - The username string.
   */
  async enterUsername(username: string): Promise<void> {
    await this.fill(this.usernameInput, username, 'username');
  }

  /**
   * Fills the password field.
   * @param password - The password string.
   */
  async enterPassword(password: string): Promise<void> {
    await this.fill(this.passwordInput, password, 'password');
  }

  /** Clicks the Login button. */
  async clickLogin(): Promise<void> {
    await this.click(this.loginButton, 'login button');
  }

  /**
   * Performs a full login with the given credentials.
   * @param credentials - Object containing username and password.
   */
  async login(credentials: UserCredentials): Promise<void> {
    this.log.info(`Logging in as "${credentials.username}"`);
    await this.enterUsername(credentials.username);
    await this.enterPassword(credentials.password);
    await this.clickLogin();
  }

  /**
   * Returns the text of the error message shown after a failed login.
   * Returns null if no error is visible.
   */
  async getErrorMessage(): Promise<string | null> {
    return this.getErrorText(this.errorMessage);
  }

  /** Returns true if the error message container is visible. */
  async hasError(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }
}
