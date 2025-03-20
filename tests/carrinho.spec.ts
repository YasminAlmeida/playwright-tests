import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CarrinhoPage } from '../pages/CarrinhoPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Testes do Carrinho na Home', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('Adicionar item ao carrinho', async ({ page }) => {
        await homePage.addToCart('Sauce Labs Backpack');
        await expect(page.locator('.shopping_cart_badge')).toContainText('1');
    });

    test('Remover item do carrinho', async ({ page }) => {
        await homePage.addToCart('Sauce Labs Backpack');
        await homePage.removeFromCart('Sauce Labs Backpack');
        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
    });
});

test.describe('Testes do Carrinho na Página de Cart e Checkout', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let carrinhoPage: CarrinhoPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        carrinhoPage = new CarrinhoPage(page);
        checkoutPage = new CheckoutPage(page);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('Adicionar item ao carrinho e validar se ele esta na pagina de cart', async ({ page }) => {
        await homePage.addToCart('Sauce Labs Backpack');
        await homePage.addToCart('Sauce Labs Bike Light');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
        await page.click('.shopping_cart_link');
        await carrinhoPage.assertItemsAreInCart(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    });

    test('Realizar a compra de um item', async ({ page }) => {
        await homePage.addToCart('Sauce Labs Backpack');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
        await page.click('.shopping_cart_link');
        await page.click('#checkout');
        await expect(page.locator('#checkout_info_container')).toBeVisible();
        await page.fill('#first-name', 'John');
        await page.fill('#last-name', 'Doe');
        await page.fill('#postal-code', '12345');
        await page.click('#continue');
        await carrinhoPage.assertItemsAreInCart(['Sauce Labs Backpack']);
        await checkoutPage.completePurchase();
    });

    test('Realizar a compra de vários itens', async ({ page }) => {
        await homePage.addToCart('Sauce Labs Backpack');
        await homePage.addToCart('Sauce Labs Bike Light');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
        await page.click('.shopping_cart_link');
        await page.click('#checkout');
        await expect(page.locator('#checkout_info_container')).toBeVisible();
        await page.fill('#first-name', 'John');
        await page.fill('#last-name', 'Doe');
        await page.fill('#postal-code', '12345');
        await page.click('#continue');
        await carrinhoPage.assertItemsAreInCart(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
        await checkoutPage.completePurchase();
    });
});

test.describe('Teste do Reset do Estado Inicial do Carrinho a partir da Home', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('Resetar carrinho a partir da Home', async ({ page }) => {
        await homePage.addToCart('Sauce Labs Backpack');
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1'); // Corrigindo o seletor
        await homePage.resetAppState();
        await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
    });
});