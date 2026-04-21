import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Gimnasia Artística | Club Hacoaj/);
});

test('counter increments', async ({ page }) => {
    await page.goto('/');
});
