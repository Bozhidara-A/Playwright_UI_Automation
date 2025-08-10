export class ContactPageLocators {
    static NAME_FIELD = 'xpath=//form[@aria-label="Kontaktformular"]//span[@data-name="your-name"]'
    static EMAIL_FIELD = '[data-name="your-email"]'
    static MESSAGE_FIELD = '[data-name="your-message"]'
    static SEND_BUTTON = '[value="Send"]'
    static SEND_SPINNER = 'xpath=//input[@value="Send"]//following-sibling::span[@class="wpcf7-spinner"]'
    static RECAPTCHA_ERROR_FIELD = 'xpath=//span[@data-name="recaptcha"]//span[@class="wpcf7-not-valid-tip"]'
}