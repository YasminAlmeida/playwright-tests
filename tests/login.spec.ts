import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Testes de Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Login com credenciais válidas', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.assertUserIsLoggedIn();
  });

  test('Login com credenciais inválidas', async ({ page }) => {
    await loginPage.login('invalid_user', 'invalid_password');
    await loginPage.assertLoginFailed();
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

  test('Logout', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForTimeout(1000);

    await loginPage.logout();
    await loginPage.assertUserIsLoggedOut();
  });

});