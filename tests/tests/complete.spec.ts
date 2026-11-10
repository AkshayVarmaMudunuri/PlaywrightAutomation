import { test, expect} from '@playwright/test'

test.describe("Complete Page Test", () => {

    test.beforeEach(async ({ page }) => {

        await page.goto('https://www.saucedemo.com/');
    
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
        await expect(page).toHaveURL(/inventory/);

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page).toHaveURL(/cart/);

        await page.locator('[data-test="checkout"]').click();
        await expect(page).toHaveURL(/checkout-step-one/);

        await page.locator('[data-test="firstName"]').fill('Akshay Varma');
        await page.locator('[data-test="lastName"]').fill('Mudunuri');
        await page.locator('[data-test="postalCode"]').fill('LS17 7SU');
        await page.locator('[data-test="continue"]').click();

        await expect(page).toHaveURL(/checkout-step-two/);
        await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');

        await expect(page.locator('[data-test="finish"]')).toBeVisible();
        await expect(page.locator('[data-test="finish"]')).toHaveText('Finish');
        await page.locator('[data-test="finish"]').click();

        await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');
        await expect(page).toHaveURL(/checkout-complete/);

    })

    test('Should Display Order Confirmation Message', async ({ page }) => {
        
        await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
        await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');

        await expect(page.locator('[data-test="complete-text"]')).toBeVisible();
        await expect(page.locator('[data-test="complete-text"]')).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');

    })

    test('Should Go Back to Product Page', async ({ page }) => {

        await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
        await expect(page.locator('[data-test="back-to-products"]')).toHaveText('Back Home');
        await page.locator('[data-test="back-to-products"]').click();

        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('[data-test="title"]')).toHaveText('Products');

        await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
        await expect(page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')).toBeVisible();

        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
    })

    test('Should Generate Order Confirmation', async ({ page }) => {

        await expect(page.locator('[data-test="generate-pdf-order"]')).toBeVisible();
        await expect(page.locator('[data-test="generate-pdf-order"]')).toHaveText('Generate PDF order');
        await page.locator('[data-test="generate-pdf-order"]').click();

        const downloadPromise = page.waitForEvent('download');

        await page.locator('[data-test="generate-pdf-order"]').click();

        const download = await downloadPromise;

        expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

    })

})