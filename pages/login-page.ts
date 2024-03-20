import type { Page } from 'playwright';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open() {
        await this.page.goto('/login');
    }
    async setUserName(email) {
        await this.page.getByLabel('Username or email address').fill(email);
    }
    async setPassword(password) {
        await this.page.getByLabel('Password').fill(password);
    }
    async singIn() {
        await this.page.getByRole('button', { name: 'Sign in', exact: true }).click();
    }
    
}