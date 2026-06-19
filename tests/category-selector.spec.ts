import { test, expect } from '@playwright/test';

const APP_URL = 'http://localhost:4200';

test.describe('CategorySelector', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
  });

  test('should display initial layout and top-level categories', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Selected Category' })).toBeVisible();
    await expect(page.getByText('Please select a leaf category')).toBeVisible();
    await expect(page.getByText('กระเป๋า & กระเป๋าเดินทาง')).toBeVisible();
    await expect(page.getByText('Category Group').first()).toBeVisible();
  });

  test('should navigate through category tree using drill-down and back button', async ({ page }) => {
    await page.getByText('กระเป๋า & กระเป๋าเดินทาง').click();
    await expect(page.getByText('กระเป๋าเด็ก')).toBeVisible();

    const backButton = page.getByRole('button', { name: 'Back' });
    await expect(backButton).toBeVisible();
    
    await backButton.click();
    await expect(page.getByText('กระเป๋า & กระเป๋าเดินทาง')).toBeVisible();
    await expect(backButton).toBeHidden();
  });

  test('should filter categories by search term', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search categories...');
    await searchInput.fill('นาฬิกาแฟชั่น');

    await expect(page.getByText('นาฬิกาแฟชั่น').first()).toBeVisible();
    await expect(page.getByText('ID: 3288')).toBeVisible();
  });

  test('should display selected category ID when a leaf node is clicked', async ({ page }) => {
    await page.getByText('อื่นๆ').click();

    await expect(page.getByText('Category ID', { exact: true })).toBeVisible();
    await expect(page.locator('.font-mono')).toHaveText('999999');
    await expect(page.getByRole('button', { name: 'Save & Continue' })).toBeVisible();
  });

});