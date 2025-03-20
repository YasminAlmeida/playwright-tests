import { Page, expect } from '@playwright/test';

export class CarrinhoPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goToCheckout() {
        await this.page.click('#checkout');
    }

    async removeItem(itemName: string) {
        await this.page.locator(`[data-test="remove-${itemName.toLowerCase().replace(/ /g, '-')}"]`).click();
    }

    async assertItemRemoved(itemName: string) {
        await expect(this.page.locator(`[data-test="remove-${itemName.toLowerCase().replace(/ /g, '-')}"]`)).toBeHidden();
    }

    async goBackToProducts() {
        try {
            await this.page.click('[data-test="continue-shopping"]');
            await expect(this.page.locator('.inventory_list')).toBeVisible();
        } catch (error) {
            console.error('Erro ao tentar voltar a pagina de listagem:', error);
            throw error;
        }
    }

    async assertItemsAreInCart(items: string[]) {
        for (const item of items) {
            await expect(
                this.page.locator(`.cart_item .inventory_item_name`, { hasText: item })
            ).toBeVisible({ timeout: 10000 });
        }
    }
}