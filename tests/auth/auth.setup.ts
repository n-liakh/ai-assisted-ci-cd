// path: tests/auth/auth.setup.ts
import path from 'path';
import { test as setup } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { Users } from '@utils/envHelper';

/** Path where the authenticated browser storage state is saved. */
export const AUTH_FILE = path.join(__dirname, '../../playwright/.auth/user.json');

/**
 * Auth setup project: logs in once as the standard user and persists
 * the browser storage state so subsequent test projects skip UI login.
 */
setup('authenticate as standard_user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(Users.STANDARD);
  await page.context().storageState({ path: AUTH_FILE });
});
