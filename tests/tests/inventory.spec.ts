import { test, expect} from '@playwright/test'

test.describe("Product Page Test", () => {

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

    test('Should Display six products in the page', async ({ page }) => {

        await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
        await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);

        await expect(page.locator('[data-test="inventory-item-name"]')).toHaveCount(6);
        
        await expect(page.locator('img.inventory_item_img')).toHaveCount(6);

        await expect(page.locator('[data-test="inventory-item-desc"]')).toHaveCount(6);

        await expect(page.locator('[data-test="inventory-item-price"]')).toHaveCount(6);

        await expect(page.locator('.btn_inventory')).toHaveCount(6);

    })
    
    test('Should Display the Correct Product', async ({ page }) => {


        await expect(page.locator('[data-test="item-4-title-link"]')).toHaveText("Sauce Labs Backpack");

        await expect(page.locator('.inventory_item').filter({ has: page.locator('[data-test="item-4-title-link"]') }).locator('[data-test="inventory-item-desc"]')).toHaveText("carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.");

        await expect(page.locator('.inventory_item').filter({ has: page.locator('[data-test="item-4-title-link"]') }).locator('[data-test="item-4-img-link"]')).toBeVisible();
        
        await expect(page.locator('.inventory_item').filter({ has: page.locator('[data-test="item-4-title-link"]') }).locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');


        await expect(page.locator('[data-test="item-0-title-link"]')).toHaveText('Sauce Labs Bike Light')

        await expect(page.locator('.inventory_item').filter({ has: page.locator('[data-test="item-0-title-link"]') }).locator('[data-test="item-0-title-link"]')).toBeVisible();

        await expect(page.locator('.inventory_item').filter({ has: page.locator('[data-test="item-0-title-link"]') }).locator('[data-test="inventory-item-desc"]')).toHaveText("A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.");

        await expect(page.locator('.inventory_item').filter({ has: page.locator('[data-test="item-0-title-link"]') }).locator('[data-test="inventory-item-price"]')).toHaveText('$9.99')


        await expect(page.locator('[data-test="item-1-title-link"]')).toHaveText('Sauce Labs Bolt T-Shirt')

        await expect(page.locator('.inventory_item').filter({ has: page.locator('[data-test="item-1-title-link"]') }).locator('[data-test="item-1-title-link"]')).toBeVisible();

        await expect(page.locator('.inventory_item').filter({ has: page.locator('[data-test="item-1-title-link"]') }).locator('[data-test="inventory-item-desc"]')).toHaveText("Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.");

        await expect(page.locator('.inventory_item').filter({ has: page.locator('[data-test="item-1-title-link"]') }).locator('[data-test="inventory-item-price"]')).toHaveText('$15.99')


        await expect(page.locator('[data-test="item-5-title-link"]')).toHaveText('Sauce Labs Fleece Jacket')

        await expect(page.locator('.inventory_item').filter({ has: page.locator('[data-test="item-5-title-link"]') }).locator('[data-test="item-5-title-link"]')).toBeVisible();

        await expect(page.locator('.inventory_item').filter({ has: page.locator('[data-test="item-5-title-link"]') }).locator('[data-test="inventory-item-desc"]')).toHaveText("It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.");

        await expect(page.locator('.inventory_item').filter({ has: page.locator('[data-test="item-5-title-link"]') }).locator('[data-test="inventory-item-price"]')).toHaveText('$49.99')

    })

    test('Should sort the products from A to Z', async ({ page }) => {

        await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
        
        await page.locator('[data-test="product-sort-container"]').selectOption("az")

        await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue("az")

        await expect(page.locator('[data-test="inventory-item-name"]').first()).toHaveText("Sauce Labs Backpack")

        await expect(page.locator('[data-test="inventory-item-name"]').last()).toHaveText("Test.allTheThings() T-Shirt (Red)")

    })

    test('Should sort the products from Z to A', async ({ page }) => {

        await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
        
        await page.locator('[data-test="product-sort-container"]').selectOption("za")

        await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue("za")

        await expect(page.locator('[data-test="inventory-item-name"]').first()).toHaveText("Test.allTheThings() T-Shirt (Red)")

        await expect(page.locator('[data-test="inventory-item-name"]').last()).toHaveText("Sauce Labs Backpack")


    })   

    test('Should sort the products from Low to High', async ({ page }) => {

        await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
        
        await page.locator('[data-test="product-sort-container"]').selectOption("lohi")

        await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue("lohi")

        await expect(page.locator('[data-test="inventory-item-name"]').first()).toHaveText("Sauce Labs Onesie")

        await expect(page.locator('[data-test="inventory-item-price"]').first()).toHaveText("$7.99")

        await expect(page.locator('[data-test="inventory-item-name"]').last()).toHaveText("Sauce Labs Fleece Jacket")

        await expect(page.locator('[data-test="inventory-item-price"]').last()).toHaveText("$49.99")

    })   

    test('Should sort the products from High to Low', async ({ page }) => {

        await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
        
        await page.locator('[data-test="product-sort-container"]').selectOption("hilo")

        await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue("hilo")

        await expect(page.locator('[data-test="inventory-item-name"]').first()).toHaveText("Sauce Labs Fleece Jacket")

        await expect(page.locator('[data-test="inventory-item-price"]').first()).toHaveText("$49.99")

        await expect(page.locator('[data-test="inventory-item-name"]').last()).toHaveText("Sauce Labs Onesie")

        await expect(page.locator('[data-test="inventory-item-price"]').last()).toHaveText("$7.99")

    }) 

    test('Product iteam Should add to the Cart', async ({ page }) => {

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()

        await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();

        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

        await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();

        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("2")

    })

    test('Should Remove the Added Products from Cart when clicked in product page', async ({ page }) => {

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()

        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

        await page.locator('[data-test="remove-sauce-labs-backpack"]').click()

        await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();

        await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();

        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("1")

    })

    test('Should Open the item product details by clicking', async ({ page }) => {

        await page.locator('[data-test="item-4-title-link"]').click()

        await expect(page).toHaveURL(/inventory-item/);

        await expect(page.locator('.inventory_details').locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');

        await expect(page.locator('.inventory_details').locator('[data-test="item-sauce-labs-backpack-img"]')).toBeVisible();

        await expect(page.locator('.inventory_details').locator('[data-test="inventory-item-desc"]')).toHaveText("carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.");

        await expect(page.locator('.inventory_details').locator('[data-test="inventory-item-price"]')).toHaveText("$29.99");

        await page.locator('[data-test="add-to-cart"]').click();

        await expect(page.locator('[data-test="remove"]')).toBeVisible();

        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("1")

        await page.locator('[data-test="remove"]').click();

        await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();

        await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeHidden();

        await page.locator('[data-test="back-to-products"]').click();

        await expect(page).toHaveURL(/inventory/);

        await expect(page.locator('[data-test="title"]')).toBeVisible();

    })

    test('Should Open product details by clicking the image', async ({ page }) => {

        await page.locator('[data-test="inventory-item-sauce-labs-backpack-img"]').click()

        await expect(page).toHaveURL(/inventory-item/);

        await expect(page.locator('.inventory_details').locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');

        await expect(page.locator('.inventory_details').locator('[data-test="item-sauce-labs-backpack-img"]')).toBeVisible();

        await expect(page.locator('.inventory_details').locator('[data-test="inventory-item-desc"]')).toHaveText("carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.");

        await expect(page.locator('.inventory_details').locator('[data-test="inventory-item-price"]')).toHaveText("$29.99");

        await page.locator('[data-test="add-to-cart"]').click();

        await expect(page.locator('[data-test="remove"]')).toBeVisible();

        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("1")

        await page.locator('[data-test="remove"]').click();

        await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();

        await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeHidden();

        await page.locator('[data-test="back-to-products"]').click();

        await expect(page).toHaveURL(/inventory/);

        await expect(page.locator('[data-test="title"]')).toBeVisible();

    })

    test('Should Display the Loaded Product Image', async ({ page }) => {

        const backpackImage = page.locator('[data-test="inventory-item-sauce-labs-backpack-img"]');
    
        await expect(backpackImage).toBeVisible();
    

        const imageSrc = await backpackImage.getAttribute('src');
        expect(imageSrc).not.toBeNull();
    

        const imageWidth = await backpackImage.evaluate(img => (img as HTMLImageElement).naturalWidth);
        expect(imageWidth).toBeGreaterThan(0);
    
    });

})