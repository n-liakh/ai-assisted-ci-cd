// path: tests/e2e/login.spec.ts
import { test, expect } from '@fixtures/pageFixtures';
import { Users } from '@utils/envHelper';
import { LOGIN_ERRORS } from '@test-data/loginData';

// Login tests must run against a clean session – override the project-level storageState.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should login successfully as standard_user', async ({ loginPage, page }) => {
    await loginPage.login(Users.STANDARD);
    await expect(page).toHaveURL(/inventory/);
  });

  test('should show error for locked_out_user', async ({ loginPage }) => {
    await loginPage.login(Users.LOCKED_OUT);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain(LOGIN_ERRORS.LOCKED_OUT);
  });

  test('should show error for invalid credentials', async ({ loginPage }) => {
    // Initialization: open login – done in beforeEach

    // User actions: fill invalid credentials, submit
    await loginPage.login(Users.INVALID);

    // Verification: error message visible
    const error = await loginPage.getErrorMessage();
    expect(error).toContain(LOGIN_ERRORS.INVALID_CREDENTIALS);
  });
});
