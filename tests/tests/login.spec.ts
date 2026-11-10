import { test, expect} from '@playwright/test'

test('Login Page to be Visible', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await expect(page.locator('#user-name')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#login-button')).toBeVisible();
} );


test('Login Page With Correct credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

test('Login Should Fail with Incorrect Username', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('Akshay_Varma');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('Login Should Fail with Incorrect Password', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('Akshay');
    await page.locator('#login-button').click();

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('Login Should Fail with Incorrect credentials', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('Akshay_varma');
    await page.locator('#password').fill('Akshay');
    await page.locator('#login-button').click();

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('Login Should Fail without entering the credentials', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('');
    await page.locator('#password').fill('');
    await page.locator('#login-button').click();

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
});

test('Password field masks the entered password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('#password').fill('secret_sauce');

    await expect(page.locator('#password')).toHaveAttribute('type', 'password');
});