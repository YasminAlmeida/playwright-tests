import { Page, expect } from '@playwright/test';

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string) {
        await this.page.fill('#user-name', username);
        await this.page.fill('#password', password);
        await this.page.click('#login-button');
        const loginSuccess = await this.page.locator('[data-test="inventory-list"]').isVisible();
        if (!loginSuccess) {
            await expect(this.page.locator('[data-test="error"]')).toBeVisible();
        }
    }

    async assertUserIsLoggedIn() {
        await this.page.click('#react-burger-menu-btn');
        await expect(this.page.locator('[data-test="logout-sidebar-link"]')).toBeVisible();
    }

    async assertUserIsLoggedOut() {
        await expect(this.page.locator('[data-test="login-button"]')).toBeVisible();
    }

    async assertLoginFailed() {
        await expect(this.page.locator('[data-test="error"]')).toBeVisible({ timeout: 10000 });
    }

    async logout() {
        try {
            await this.page.click('#react-burger-menu-btn', { force: true });
            await this.page.waitForSelector('.bm-menu', { state: 'visible', timeout: 5000 });
            await this.page.evaluate(() => {
                const logoutLink = document.querySelector('#logout_sidebar_link');
                if (logoutLink) {
                    (logoutLink as HTMLElement).click();
                }
            });

            await this.page.waitForSelector('#login-button', { state: 'visible', timeout: 10000 });
        } catch (error) {
            console.error('Erro durante o logout:', error);
            throw error;
        }
    }
}