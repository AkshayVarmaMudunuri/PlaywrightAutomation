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

    test('Should Rest the Page', async ({ page }) => {

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("2")

        await expect(page.locator('.bm-burger-button')).toBeVisible();
        await page.locator('.bm-burger-button').click();
        await expect(page.locator('.bm-menu')).toBeVisible();

        await expect(page.locator('[data-test="reset-sidebar-link"]')).toBeVisible();
        await expect(page.locator('[data-test="reset-sidebar-link"]')).toHaveText('Reset App State');

        await page.locator('[data-test="reset-sidebar-link"]').click();
        await expect(page.locator('.bm-menu')).toBeVisible();

        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0)

        console.log(await page.locator('[data-test="remove-sauce-labs-backpack"]').count());
        console.log(await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').count());

    })

})