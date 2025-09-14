import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
  });

  test('should open mobile menu when menu button is clicked', async ({ page }) => {
    // Click the mobile menu button
    await page.click('[aria-label="Open menu"]');
    
    // Check that the mobile menu is visible
    await expect(page.locator('text=Menu')).toBeVisible();
    
    // Check that navigation items are visible
    await expect(page.locator('text=Home')).toBeVisible();
    await expect(page.locator('text=Shop')).toBeVisible();
    await expect(page.locator('text=Collections')).toBeVisible();
    await expect(page.locator('text=About')).toBeVisible();
    await expect(page.locator('text=Contact')).toBeVisible();
  });

  test('should expand submenu when Shop is clicked', async ({ page }) => {
    // Open mobile menu
    await page.click('[aria-label="Open menu"]');
    
    // Click on Shop to expand submenu
    await page.click('text=Shop');
    
    // Check that submenu items are visible
    await expect(page.locator('text=Bags')).toBeVisible();
    await expect(page.locator('text=Shoes')).toBeVisible();
  });

  test('should expand Bags submenu and navigate to sub-item', async ({ page }) => {
    // Open mobile menu
    await page.click('[aria-label="Open menu"]');
    
    // Click on Shop to expand submenu
    await page.click('text=Shop');
    
    // Click on Bags to expand further
    await page.click('text=Bags');
    
    // Check that bag subcategories are visible
    await expect(page.locator('text=Totes')).toBeVisible();
    await expect(page.locator('text=Handbags')).toBeVisible();
    await expect(page.locator('text=Clutches')).toBeVisible();
    
    // Click on Totes - this should navigate immediately
    await page.click('text=Totes');
    
    // Check that we navigated to the totes page
    await expect(page).toHaveURL('/shop/bags/totes');
  });

  test('should expand Shoes submenu and navigate to sub-item', async ({ page }) => {
    // Open mobile menu
    await page.click('[aria-label="Open menu"]');
    
    // Click on Shop to expand submenu
    await page.click('text=Shop');
    
    // Click on Shoes to expand further
    await page.click('text=Shoes');
    
    // Check that shoe subcategories are visible
    await expect(page.locator('text=Slippers')).toBeVisible();
    await expect(page.locator('text=Owambe')).toBeVisible();
    await expect(page.locator('text=Office')).toBeVisible();
    
    // Click on Slippers - this should navigate immediately
    await page.click('text=Slippers');
    
    // Check that we navigated to the slippers page
    await expect(page).toHaveURL('/shop/shoes/slippers');
  });

  test('should close mobile menu when close button is clicked', async ({ page }) => {
    // Open mobile menu
    await page.click('[aria-label="Open menu"]');
    
    // Verify menu is open
    await expect(page.locator('text=Menu')).toBeVisible();
    
    // Click close button
    await page.click('[aria-label="Close menu"]');
    
    // Verify menu is closed
    await expect(page.locator('text=Menu')).not.toBeVisible();
  });

  test('should close mobile menu when backdrop is clicked', async ({ page }) => {
    // Open mobile menu
    await page.click('[aria-label="Open menu"]');
    
    // Verify menu is open
    await expect(page.locator('text=Menu')).toBeVisible();
    
    // Click on backdrop (the overlay)
    await page.click('.fixed.inset-0.bg-background\\/80');
    
    // Verify menu is closed
    await expect(page.locator('text=Menu')).not.toBeVisible();
  });

  test('should have proper tap targets (44px minimum)', async ({ page }) => {
    // Open mobile menu
    await page.click('[aria-label="Open menu"]');
    
    // Check that navigation items have proper tap target sizes
    const homeButton = page.locator('text=Home');
    const shopButton = page.locator('text=Shop');
    
    const homeBox = await homeButton.boundingBox();
    const shopBox = await shopButton.boundingBox();
    
    // Check that tap targets are at least 44px in height
    expect(homeBox?.height).toBeGreaterThanOrEqual(44);
    expect(shopBox?.height).toBeGreaterThanOrEqual(44);
  });

  test('should navigate to main pages directly', async ({ page }) => {
    // Open mobile menu
    await page.click('[aria-label="Open menu"]');
    
    // Test direct navigation to About page
    await page.click('text=About');
    await expect(page).toHaveURL('/about');
    
    // Go back to home and test Contact
    await page.goto('/');
    await page.click('[aria-label="Open menu"]');
    await page.click('text=Contact');
    await expect(page).toHaveURL('/contact');
  });
});

