import { Page } from '@playwright/test';

export class HomePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async addToCart(itemName: string) {
        await this.page.click(`[data-test="add-to-cart-${itemName.toLowerCase().replace(/ /g, '-')}"]`);
    }

    async removeFromCart(itemName: string) {
        await this.page.click(`[data-test="remove-${itemName.toLowerCase().replace(/ /g, '-')}"]`);
    }

    async resetAppState() {
        await this.page.click('#react-burger-menu-btn', { force: true });
        await this.page.waitForSelector('.bm-menu', { state: 'visible', timeout: 5000 });
        await this.page.click('#reset_sidebar_link');
        await this.page.waitForSelector('.shopping_cart_badge', { state: 'hidden', timeout: 5000 });
    }

    async sortProductsByPrice(order: 'lowToHigh' | 'highToLow') {
        await this.page.selectOption('.product_sort_container', order === 'lowToHigh' ? 'lohi' : 'hilo');
    }

    async sortProductsByName(order: 'az' | 'za') {
        await this.page.selectOption('.product_sort_container', order === 'az' ? 'az' : 'za');
    }
}