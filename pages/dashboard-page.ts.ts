import type { Page } from 'playwright';

export class DashboardPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

}