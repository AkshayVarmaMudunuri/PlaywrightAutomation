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

    test('Should open Menu Dropdown', async ({ page }) => {

        await expect(page.locator('.bm-burger-button')).toBeVisible();
        await page.locator('.bm-burger-button').click();
        await expect(page.locator('.bm-menu')).toBeVisible();

        await expect(page.locator('[data-test="inventory-sidebar-link"]')).toBeVisible();
        await expect(page.locator('[data-test="inventory-sidebar-link"]')).toHaveText('All Items');

        await expect(page.locator('[data-test="dynamic-catalog-sidebar-link"]')).toBeVisible();
        await expect(page.locator('[data-test="dynamic-catalog-sidebar-link"]')).toHaveText('Dynamic Catalog');

        await expect(page.locator('[data-test="about-sidebar-link"]')).toBeVisible();
        await expect(page.locator('[data-test="about-sidebar-link"]')).toHaveText('About');

        await expect(page.locator('[data-test="logout-sidebar-link"]')).toBeVisible();
        await expect(page.locator('[data-test="logout-sidebar-link"]')).toHaveText('Logout');

        await expect(page.locator('[data-test="reset-sidebar-link"]')).toBeVisible();
        await expect(page.locator('[data-test="reset-sidebar-link"]')).toHaveText('Reset App State');

    })

    test('Should Close the Menu Dropdown', async ({ page }) => {

        await page.locator('.bm-burger-button').click();
        await expect(page.locator('.bm-menu')).toBeVisible();

        await page.locator('.bm-cross-button').click();
        await expect(page.locator('.bm-menu')).toBeHidden();

        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    })
})