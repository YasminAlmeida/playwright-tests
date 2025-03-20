import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

test.describe('Testes para Ordenação', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('Ordenar produtos por menor preço (low to high)', async ({ page }) => {
        await homePage.sortProductsByPrice('lowToHigh');
        await expect(page.locator('.inventory_item_price').first()).toContainText('$7.99');
    });

    test('Ordenar produtos por maior preço (high to low)', async ({ page }) => {
        await homePage.sortProductsByPrice('highToLow');
        await expect(page.locator('.inventory_item_price').first()).toContainText('$49.99');
    });

    test('Ordenar produtos por ordem alfabética (A-Z)', async ({ page }) => {
        await homePage.sortProductsByName('az');
        await expect(page.locator('.inventory_item_name').first()).toContainText('Sauce Labs Backpack');
    });

    test('Ordenar produtos por ordem alfabética (Z-A)', async ({ page }) => {
        await homePage.sortProductsByName('za');
        await expect(page.locator('.inventory_item_name').first()).toContainText('Test.allTheThings() T-Shirt (Red)');
    });
});
