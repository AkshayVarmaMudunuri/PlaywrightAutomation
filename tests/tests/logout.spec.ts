import { test, expect} from '@playwright/test'

test.describe("Menu Button Test", () => {

    test.beforeEach(async ({ page }) => {

        await page.goto('https://www.saucedemo.com/');
    
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    })

    test('Should logout from page', async ({ page }) => {

        await expect(page.locator('.bm-burger-button')).toBeVisible();
        await page.locator('.bm-burger-button').click();
        await expect(page.locator('.bm-menu')).toBeVisible();

        await expect(page.locator('[data-test="logout-sidebar-link"]')).toBeVisible();
        await expect(page.locator('[data-test="logout-sidebar-link"]')).toHaveText('Logout');

        await page.locator('[data-test="logout-sidebar-link"]').click();

        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('#user-name')).toBeVisible();
        await expect(page.locator('#password')).toBeVisible();
        await expect(page.locator('#login-button')).toBeVisible();


    })

})