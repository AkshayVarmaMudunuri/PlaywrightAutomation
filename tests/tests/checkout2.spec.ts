import { test, expect} from '@playwright/test'

test.describe("Checkout Flow Test", () => {

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

    })

    test('Should Display the Correct Product Items', async ({ page }) => {

        await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
        await expect(page.locator('[data-test="item-4-title-link"]')).toHaveText('Sauce Labs Backpack');
        await expect(page.locator('.cart_item').filter({ has: page.locator('[data-test="item-4-title-link"]') }).locator('[data-test="inventory-item-desc"]')).toHaveText("carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.");
        await expect(page.locator('.cart_item').filter({ has: page.locator('[data-test="item-4-title-link"]') }).locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
        await expect(page.locator('.cart_item').filter({ has: page.locator('[data-test="item-4-title-link"]') }).locator('[data-test="item-quantity"]')).toHaveText('1');


        await expect(page.locator('[data-test="item-0-title-link"]')).toBeVisible();
        await expect(page.locator('[data-test="item-0-title-link"]')).toHaveText('Sauce Labs Bike Light');
        await expect(page.locator('.cart_item').filter({ has: page.locator('[data-test="item-0-title-link"]') }).locator('[data-test="inventory-item-desc"]')).toHaveText("A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.");
        await expect(page.locator('.cart_item').filter({ has: page.locator('[data-test="item-0-title-link"]') }).locator('[data-test="inventory-item-price"]')).toHaveText('$9.99')
        await expect(page.locator('.cart_item').filter({ has: page.locator('[data-test="item-0-title-link"]') }).locator('[data-test="item-quantity"]')).toHaveText('1');

    })

    test('Should Display Correct Payment Information', async ({ page }) => {

        await expect(page.locator('[data-test="payment-info-label"]')).toBeVisible();
        await expect(page.locator('[data-test="payment-info-label"]')).toHaveText('Payment Information:');

        await expect(page.locator('[data-test="payment-info-value"]')).toBeVisible();
        await expect(page.locator('[data-test="payment-info-value"]')).toHaveText('SauceCard #31337');

    })

    test('Should Display Correct Shipping Information', async ({ page }) => {

        await expect(page.locator('[data-test="shipping-info-label"]')).toBeVisible();
        await expect(page.locator('[data-test="shipping-info-label"]')).toHaveText('Shipping Information:');

        await expect(page.locator('[data-test="shipping-info-value"]')).toBeVisible();
        await expect(page.locator('[data-test="shipping-info-value"]')).toHaveText('Free Pony Express Delivery!');

    })

    test('Should Display Correct Item Total Prices', async ({ page }) => {

        await expect(page.locator('[data-test="total-info-label"]')).toBeVisible();
        await expect(page.locator('[data-test="total-info-label"]')).toHaveText('Price Total');

        await expect(page.locator('[data-test="subtotal-label"]')).toBeVisible();
        await expect(page.locator('[data-test="subtotal-label"]')).toHaveText('Item total: $39.98');

    })

    test('Should Display Correct Tax Amount', async ({ page }) => {

        await expect(page.locator('[data-test="tax-label"]')).toBeVisible();
        await expect(page.locator('[data-test="tax-label"]')).toHaveText('Tax: $3.20');

    })

    test('Should Display Correct Total Amount', async ({ page }) => {

        await expect(page.locator('[data-test="total-label"]')).toBeVisible();
        await expect(page.locator('[data-test="total-label"]')).toHaveText('Total: $43.18');

    })

    test('Should Proceed to Complete Page', async ({ page }) => {

        await expect(page.locator('[data-test="finish"]')).toBeVisible();
        await expect(page.locator('[data-test="finish"]')).toHaveText('Finish');
        await page.locator('[data-test="finish"]').click();

        await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');
        await expect(page).toHaveURL(/checkout-complete/);

    })

    test('Should Cancel the Order', async ({ page }) => {

        await expect(page.locator('[data-test="cancel"]')).toBeVisible();
        await expect(page.locator('[data-test="cancel"]')).toHaveText('Cancel');
        await page.locator('[data-test="cancel"]').click();

        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    })

})