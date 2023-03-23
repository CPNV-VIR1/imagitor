// @ts-check
const { test, expect } = require('@playwright/test');

test('has text area', async ({ page }) => {
    await page.goto('http://127.0.0.1:5173/');

  // Expect a title "to contain" a substring.
    await expect(page.locator('textarea')).toBeEditable();
});

test('textarea contains text', async ({ page }) => {
    await page.goto('http://127.0.0.1:5173/');

    const text = "La saint poire";
    const locator = page.locator('textarea');
    locator.fill(text);
    await expect(locator).toHaveValue(text);
});

/*test('On submit form, output has image', async ({ page }) => {
    await page.goto('http://127.0.0.1:5173/');

    const text = "La saint poire";
    const locator = page.locator('textarea');
    const image = page.locator('img');
    locator.fill(text);

    const imageSrc = "tests/Image/images.jpg";

    await page.getByRole('button').press('Enter');
    image.fill(imageSrc);


    await expect(image).toContain(imageSrc);
});*/
