import { test } from './fixtures';
import { BaseLocators } from '../core/pages/base_locators';
import { ContactPageLocators } from '../core/pages/contact_page_locators';
import { expect } from '@playwright/test';

test.describe('Navigation via header buttons', () => {
    test.beforeEach(async ({ page, steps }) => {
        await page.goto('https://www.leadconsult.eu/', { waitUntil: 'networkidle' });
        await steps.verifyElementVisible(BaseLocators.HEADER_SECTION);
    });

    test('Navigation to Home page from Header section', async ({ page, steps }) => {
        await page.click(BaseLocators.HOME_BUTTON);
        await steps.verifyElementHasText(page, BaseLocators.HEADING_TITLE, "LEAD BY EXAMPLE");
    });

    test('Navigation to About Us page from Header section', async ({ page, steps }) => {
        await steps.verifySubmenuNavigation(page, BaseLocators.ABOUT_US_BUTTON, BaseLocators.OUR_COMPANY_BUTTON, /.*\/about-us/, BaseLocators.HEADING_TITLE, "ABOUT US");
    });

    test('Navigation to Core Values and Vision page from Header section', async ({ page, steps }) => {
        const CORE_VALUES_BUTTON = steps.getSubmenuButton("Core Values and Vision");
        const heading_text = "LEAD Core Values, Vision and Mission Statement"

        await steps.verifySubmenuNavigation(page, BaseLocators.ABOUT_US_BUTTON, CORE_VALUES_BUTTON, /.*\/core-values-and-vision/, BaseLocators.HEADING_TITLE, heading_text);
    });

    test('Navigation to Services page from Header section', async ({ page, steps }) => {
        await steps.verifyNavigation(page, BaseLocators.SERVICES_BUTTON, /.*\/services/, BaseLocators.HEADING_TITLE, "Our services");
    });

    test('Navigation to Products page from Header section', async ({ page, steps }) => {
        await steps.verifyNavigation(page, BaseLocators.PRODUCTS_BUTTON, /.*\/products/, BaseLocators.HEADING_TITLE, "Our Products");
    });

    test('Navigation to Customers page from Header section', async ({ page, steps }) => {
        await steps.verifyNavigation(page, BaseLocators.CUSTOMERS_BUTTON, /.*\/customers/, BaseLocators.HEADING_TITLE, "Our Customers");
    });

    test('Navigation to Business Partners page from Header section', async ({ page, steps }) => {
        const BUSINESS_PARTNERS = steps.getSubmenuButton("Business Partners");
        await steps.verifySubmenuNavigation(page, BaseLocators.OUR_PARTNERS_BUTTON, BUSINESS_PARTNERS, /.*\/business-partners/, BaseLocators.HEADING_TITLE, "Business Partners");
    });

    test('Navigation to Technical Partners page from Header section', async ({ page, steps }) => {
        const TECHNICAL_PARTNERS = steps.getSubmenuButton("Technical Partners");
        await steps.verifySubmenuNavigation(page, BaseLocators.OUR_PARTNERS_BUTTON, TECHNICAL_PARTNERS, /.*\/technical-partners/, BaseLocators.HEADING_TITLE, "Technical Partners");
    });

    test('Navigation to Newsroom pages from Header section', async ({ page, steps }) => {
        const NEWS_BUTTON = steps.getSubmenuButton("News");
        const LEAD_BLOG_BUTTON = steps.getSubmenuButton("LEAD Blog");
        const SUCCESS_STORIES_BUTTON = steps.getSubmenuButton("Success Stories");
        const WHITEPAPERS_BUTTON = steps.getSubmenuButton("Whitepapers");
        const CASE_STUDIES_BUTTON = steps.getSubmenuButton("Case Studies");
        const WEBINARS_BUTTON = steps.getSubmenuButton("Webinars");
        const EVENTS_BUTTON = steps.getSubmenuButton("Events");

        await steps.verifySubmenuNavigation(page, BaseLocators.NEWSROOM_BUTTON, NEWS_BUTTON, /.*\/articles/, BaseLocators.PAGE_TITLE, "News Articles");
        await steps.verifySubmenuNavigation(page, BaseLocators.NEWSROOM_BUTTON, LEAD_BLOG_BUTTON, /.*\/blog/, BaseLocators.PAGE_TITLE, "Blog");
        await steps.verifySubmenuNavigation(page, BaseLocators.NEWSROOM_BUTTON, SUCCESS_STORIES_BUTTON, /.*\/success/, BaseLocators.PAGE_TITLE, "Success Stories");
        await steps.verifySubmenuNavigation(page, BaseLocators.NEWSROOM_BUTTON, WHITEPAPERS_BUTTON, /.*\/whitepapers/, BaseLocators.PAGE_TITLE, "Whitepapers");
        await steps.verifySubmenuNavigation(page, BaseLocators.NEWSROOM_BUTTON, CASE_STUDIES_BUTTON, /.*\/case-studies/, BaseLocators.PAGE_TITLE, "Case Studies");
        await steps.verifySubmenuNavigation(page, BaseLocators.NEWSROOM_BUTTON, WEBINARS_BUTTON, /.*\/webinars/, BaseLocators.PAGE_TITLE, "Webinars");
        await steps.verifySubmenuNavigation(page, BaseLocators.NEWSROOM_BUTTON, EVENTS_BUTTON, /.*\/events/, BaseLocators.PAGE_TITLE, "Events");
    });

    test('Navigation to Carrers page from Header section', async ({ page, steps }) => {
        await steps.verifyNavigation(page, BaseLocators.CAREERS_BUTTON, /.*\/careers/, BaseLocators.HEADING_TITLE, "Careers");
    });

    test('Navigation to Contact page from Header section', async ({ page, steps }) => {
        await steps.verifyNavigation(page, BaseLocators.CONTACT_US_BUTTON, /.*\/contact/, BaseLocators.HEADING_TITLE, "Contact us");
    });

});

test.describe('Page content', () => {
    test.beforeEach(async ({ page, steps }) => {
        await page.goto('https://www.leadconsult.eu/', { waitUntil: 'networkidle' });
        await steps.verifyElementVisible(BaseLocators.HEADER_SECTION);
    });

    test('About us page content', async ({ page, steps }) => {
        await page.hover(BaseLocators.ABOUT_US_BUTTON);
        await steps.waitForElementVisible(page, BaseLocators.HEADER_SUBMENU);
        await page.click(BaseLocators.OUR_COMPANY_BUTTON);

        const visibleText = await page.locator('body').innerText();
        expect(visibleText).toMatch(/team|consulting/i);
    });

    test('Contact us page content', async ({ page, steps }) => {
        await page.click(BaseLocators.CONTACT_US_BUTTON);
        await page.waitForLoadState('networkidle');

        const isEmailVisible = await page.locator(ContactPageLocators.EMAIL_FIELD).isVisible();
        const isMessageVisible = await page.locator(ContactPageLocators.MESSAGE_FIELD).isVisible();
        const isSubmitVisible = await page.locator(ContactPageLocators.SEND_BUTTON).isVisible();

        expect(isEmailVisible || isMessageVisible || isSubmitVisible).toBeTruthy();
    });
});

test('Contact Form Submission Without reCAPTCHA Verification', async ({ page, steps }) => {
    await page.goto('https://www.leadconsult.eu/contact-us/', { waitUntil: 'networkidle' });
    await steps.verifyElementVisible(BaseLocators.HEADER_SECTION);

    await steps.verifyElementVisible(ContactPageLocators.NAME_FIELD);
    await page.fill(ContactPageLocators.NAME_FIELD, 'Ivan Ivanov');
    await expect(page.locator(ContactPageLocators.NAME_FIELD)).toHaveValue('Ivan Ivanov');

    await page.fill(ContactPageLocators.EMAIL_FIELD, 'ivan@example.com');
    await expect(page.locator(ContactPageLocators.EMAIL_FIELD)).toHaveValue('ivan@example.com');

    await page.fill(ContactPageLocators.MESSAGE_FIELD, 'This is a test message.');
    await expect(page.locator(ContactPageLocators.MESSAGE_FIELD)).toHaveValue('This is a test message.');

    await page.click(ContactPageLocators.SEND_BUTTON);
    await steps.waitForElementHidden(page, ContactPageLocators.SEND_SPINNER);

    await steps.waitForElementVisible(page, ContactPageLocators.RECAPTCHA_ERROR_FIELD);
    await steps.verifyElementHasText(page, ContactPageLocators.RECAPTCHA_ERROR_FIELD, "Please verify that you are not a robot.");
});