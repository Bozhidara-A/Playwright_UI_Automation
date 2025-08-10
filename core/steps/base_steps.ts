import { expect, Page } from '@playwright/test';

export class BaseSteps {
    constructor(protected page: Page) { }

    async waitForElementVisible(page: Page, selector: string) {
        await page.waitForSelector(selector, { state: 'visible' });
    }

    async waitForElementHidden(page: Page, selector: string) {
        await page.waitForSelector(selector, { state: 'hidden' });
    }

    async verifyElementHasText(page: Page, selector: string, text: string, caseSensitive: boolean = false) {
        const locator = page.locator(selector);

        if (caseSensitive) {
            await expect(locator).toHaveText(text);
        } else {
            const regex = new RegExp(text, 'i');
            await expect(locator).toHaveText(regex);
        }
    }

    async verifyElementVisible(selector: string) {
        await expect(this.page.locator(selector)).toBeVisible();
    }

    async verifyNavigation(page: Page, buttonSelector: string, expectedUrl: RegExp, expectedElement: string, expectedText: string) {
        await page.click(buttonSelector);
        //await page.waitForLoadState('networkidle');
        await expect(page).toHaveURL(expectedUrl);
        await this.verifyElementHasText(page, expectedElement, expectedText)
    }

    async verifySubmenuNavigation(page: Page, hoverSelector: string, buttonSelector: string, expectedUrl: RegExp, expectedElement: string, expectedText: string) {
        await page.hover(hoverSelector);
        await this.waitForElementVisible(page, buttonSelector);
        await this.verifyNavigation(page, buttonSelector, expectedUrl, expectedElement, expectedText);
    }

    getSubmenuButton(text: string): string {
        const formattedLocator = `xpath=//ul[@class="sub-menu"]//a[text()= "${text}"]`;
        return formattedLocator;
    }
}