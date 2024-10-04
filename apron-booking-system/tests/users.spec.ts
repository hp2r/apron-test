import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('http://localhost:5173/');
  
    await expect(page).toHaveTitle(/Apron Booking System - Hiren/);

    await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();
});

test('opens and closes Add User modal', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.getByRole('button', { name: 'Add User' }).click();

    await expect(page.getByRole('heading', { name: 'Add User' })).toBeVisible();

    await page.getByRole('button', { name: 'Cancel' }).click();

    await expect(page.getByRole('heading', { name: 'Add User' })).toBeHidden();
});

test('opens and closes Edit User modal', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.locator("data-testid=edit-btn-0").click();

    await expect(page.getByRole('heading', { name: 'Edit User' })).toBeVisible();

    await page.getByRole('button', { name: 'Cancel' }).click();

    await expect(page.getByRole('heading', { name: 'Edit User' })).toBeHidden();
});

test('opens and closes Delete User modal', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.locator("data-testid=delete-btn-0").click();

    await expect(page.getByText(/Are you sure you want to delete user?/)).toBeVisible();

    await page.getByRole('button', { name: 'Cancel' }).click();

    await expect(page.getByText(/Are you sure you want to delete user?/)).toBeHidden();
});

test('add user form logic', async ({ page }) => {
    
    //Test First name minimum validation
    await page.goto('http://localhost:5173/');
    await page.getByRole('button', { name: 'Add User' }).click();
    await page.getByLabel('First name').fill('four');
    await page.locator("[type=submit]").click();
    await expect(page.getByText(/Must be at least 5 characters/)).toBeVisible();
    await page.getByLabel('First name').clear();
    await page.getByLabel('First name').fill('Harry');

    //Test Last name maximum validation
    await page.getByLabel('Last name').fill('onetwothreefourfivesix');
    await page.locator("[type=submit]").click();
    await expect(page.getByText(/Must be less than 20 characters/)).toBeVisible();
    await page.getByLabel('Last name').clear();
    await page.getByLabel('Last name').fill('Potter');

    //Test Age minimum validation
    await page.locator('input[name="age"]').fill('17');
    await page.locator("[type=submit]").click();
    await expect(page.getByText(/The minimum age is 18/)).toBeVisible();
    await page.locator('input[name="age"]').clear();

    //Test Male maximum age validation
    await page.locator('select[name="gender"]').selectOption('Male');
    await page.locator('input[name="age"]').fill('112');
    await expect(page.getByText(/The maximum age for Male users is 111/)).toBeVisible();

    //Test Female maximum age validation
    await page.locator('select[name="gender"]').selectOption('Female');
    await page.locator('input[name="age"]').clear();
    await page.locator('input[name="age"]').fill('118');
    await page.locator("[type=submit]").click();
    await expect(page.getByText(/The maximum age for Female users is 117/)).toBeVisible();
});
