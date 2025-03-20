import { Page } from '@playwright/test';

export class CheckoutPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
        await this.page.fill('#first-name', firstName);
        await this.page.fill('#last-name', lastName);
        await this.page.fill('#postal-code', postalCode);
        await this.page.click('#continue');
    }

    async completePurchase() {
        await this.page.click('#finish');
        await this.page.waitForSelector('.complete-header', { timeout: 10000 });
    }
}