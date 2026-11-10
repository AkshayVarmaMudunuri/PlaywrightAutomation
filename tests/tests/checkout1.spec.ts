import { test, expect} from '@playwright/test'

test.describe("Checkout Details Page Test", () => {

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
    
    })

    test('Should Enter the Details', async ({ page }) => {

        await expect(page.locator('[data-test="firstName"]')).toBeVisible();
        await page.locator('[data-test="firstName"]').click();
        await page.locator('[data-test="firstName"]').fill('Akshay Varma');
        await expect(page.locator('[data-test="firstName"]')).toHaveValue('Akshay Varma');

        await expect(page.locator('[data-test="lastName"]')).toBeVisible();
        await page.locator('[data-test="lastName"]').click();
        await page.locator('[data-test="lastName"]').fill('Mudunuri');
        await expect(page.locator('[data-test="lastName"]')).toHaveValue('Mudunuri');

        await expect(page.locator('[data-test="postalCode"]')).toBeVisible();
        await page.locator('[data-test="postalCode"]').click();
        await page.locator('[data-test="postalCode"]').fill('LS17 7SU');
        await expect(page.locator('[data-test="postalCode"]')).toHaveValue('LS17 7SU');
        

        await expect(page.locator('[data-test="continue"]')).toBeVisible();
        await page.locator('[data-test="continue"]').click();

        await expect(page).toHaveURL(/checkout-step-two/);
        await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');

    })

    test('Should Not Proceed Without Firstname', async ({ page }) => {

        await page.locator('[data-test="lastName"]').click();
        await page.locator('[data-test="lastName"]').fill('Mudunuri');

        await page.locator('[data-test="postalCode"]').click();
        await page.locator('[data-test="postalCode"]').fill('LS17 7SU');

        await page.locator('[data-test="continue"]').click();

        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');

        await expect(page).toHaveURL(/checkout-step-one/);

    })

    test('Should Not Proceed Without LastName', async ({ page }) => {

        await page.locator('[data-test="firstName"]').click();
        await page.locator('[data-test="firstName"]').fill('Akshay Varma');

        await page.locator('[data-test="postalCode"]').click();
        await page.locator('[data-test="postalCode"]').fill('LS17 7SU');

        await page.locator('[data-test="continue"]').click();

        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toHaveText('Error: Last Name is required');

        await expect(page).toHaveURL(/checkout-step-one/);

    })

    test('Should Not Proceed Without PostalCode', async ({ page }) => {

        await page.locator('[data-test="firstName"]').click();
        await page.locator('[data-test="firstName"]').fill('Akshay Varma');

        await page.locator('[data-test="lastName"]').click();
        await page.locator('[data-test="lastName"]').fill('Mudunuri');

        await page.locator('[data-test="continue"]').click();

        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toHaveText('Error: Postal Code is required');

        await expect(page).toHaveURL(/checkout-step-one/);

    })

    test('Should Not Proceed With All Fields Empty', async ({ page }) => {

        await page.locator('[data-test="continue"]').click();

        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');

        await expect(page).toHaveURL(/checkout-step-one/);
    })

    test('Should Close the Error Display Button', async ({ page }) => {

        await page.locator('[data-test="continue"]').click();

        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error-button"]')).toBeVisible();

        await page.locator('[data-test="error-button"]').click();

        await expect(page.locator('[data-test="error"]')).toBeHidden();

    })

    test('Should Go back to Cart page when clicked Cancel', async ({ page }) => {

        await expect(page.locator('[data-test="cancel"]')).toBeVisible();
        await page.locator('[data-test="cancel"]').click();

        await expect(page).toHaveURL(/cart/);
        await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');

        await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
        await expect(page.locator('[data-test="item-0-title-link"]')).toBeVisible();
    })

})