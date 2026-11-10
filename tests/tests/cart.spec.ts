import { test, expect} from '@playwright/test'

test.describe("Cart Page Test", () => {

    test.beforeEach(async ({ page }) => {

        await page.goto('https://www.saucedemo.com/');
    
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
    
    })


    test('Should Display Product Page after Login', async ({ page }) => {

        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    })


    test('Should Open Cart Page When Clicked', async ({ page }) => {

        await page.locator('[data-test="shopping-cart-link"]').click()
        await expect(page).toHaveURL(/cart/);

        await expect(page.locator('[data-test="title"]')).toBeVisible();
        await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
        await expect(page.locator('[data-test="cart-quantity-label"]')).toBeVisible();
        await expect(page.locator('[data-test="cart-desc-label"]')).toBeVisible();

        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);

        await expect (page.locator('[data-test="continue-shopping"]')).toBeVisible();
        await page.locator('[data-test="continue-shopping"]').click();
        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('[data-test="title"]')).toHaveText('Products');

    })

    test('Should Add the Products Items to the Cart', async ({ page }) => {

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

        await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
        await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();

        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("2");

        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page).toHaveURL(/cart/);
        await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');

    })

test.describe("Cart Tests with Products", () => {

    test.beforeEach(async ({ page }) => {
    
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page).toHaveURL(/cart/);
        
        })

    test('Should Display the Correct Added Items in the Cart', async ({ page }) => {


        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("2");

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

    test('Should Remove the Product items in the Cart', async ({ page }) => {

        await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
        await expect(page.locator('[data-test="item-0-title-link"]')).toBeVisible();

        await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
        await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();

        await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

        await expect(page.locator('[data-test="item-4-title-link"]')).toHaveCount(0);
        await expect(page.locator('[data-test="item-0-title-link"]')).toBeVisible();
        
    })

    test('Should Empty the Cart Page', async ({ page }) => {

        await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
        await expect(page.locator('[data-test="item-0-title-link"]')).toBeVisible();

        await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
        await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();

        await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
        await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();

        await expect(page.locator('[data-test="item-4-title-link"]')).toHaveCount(0);
        await expect(page.locator('[data-test="item-0-title-link"]')).toHaveCount(0);

        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
    })

    test('Should Go to Continue Shoping', async ({ page }) => {

        await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
        await expect(page.locator('[data-test="item-0-title-link"]')).toBeVisible();

        await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
        await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();

        await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
        await page.locator('[data-test="continue-shopping"]').click();
        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('[data-test="title"]')).toHaveText('Products');
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3');


    })

    test('Should Checkout the Product Items from Cart page', async ({ page }) => {

        await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
        await expect(page.locator('[data-test="item-0-title-link"]')).toBeVisible();

        await expect(page.locator('[data-test="checkout"]')).toBeVisible();
        await page.locator('[data-test="checkout"]').click();

        await expect(page).toHaveURL(/checkout-step-one/);
        await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');

        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    })
})
})