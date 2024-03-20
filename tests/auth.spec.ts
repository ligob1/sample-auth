import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/login-page';
const username = process.env.USERNAME
const password = process.env.PASSWROD
const invaliduser='invalid';
const invalidpass='invalid';
const emptypass='';
const emptyuser='';

test.describe.configure({ mode: 'parallel' });

test.beforeEach('Clear cookies', async ({context}) => {
  await context.clearCookies();
});

test('correct login/pass', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open();
  await loginPage.setUserName(username);
  await loginPage.setPassword(password);
  await loginPage.singIn();
  
  await expect(page.getByLabel('Page context').locator('span')).toContainText('Dashboard');
  await expect(page.locator('feed-container')).toContainText('Home');
  await page.getByLabel('Open user account menu').click();

  await page.close();
});

test('invalid pass/correct user', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open();
  await loginPage.setUserName(username);
  await loginPage.setPassword(invalidpass);
  await loginPage.singIn();

  await expect(page).toHaveURL(/session/);
  await expect(page.getByRole('alert')).toContainText('Incorrect username or password.');
  await expect(page.locator('#login')).toContainText('Create an account');
  await expect(page.getByLabel('Page context').locator('span')).toHaveCount(0);

  await page.close();
});

test('invalid user/correct pass', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open();
  await loginPage.setUserName(invaliduser);
  await loginPage.setPassword(password);
  await loginPage.singIn();

  await expect(page).toHaveURL(/session/);
  await expect(page.getByRole('alert')).toContainText('Incorrect username or password.');
  await expect(page.locator('#login')).toContainText('Create an account');
  await expect(page.getByLabel('Page context').locator('span')).toHaveCount(0);

  await page.close();
});

test('invalid user/invalid pass', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open();
  await loginPage.setUserName(invaliduser);
  await loginPage.setPassword(invalidpass);
  await loginPage.singIn();

  await expect(page).toHaveURL(/session/);
  await expect(page.getByRole('alert')).toContainText('Incorrect username or password.');
  await expect(page.locator('#login')).toContainText('Create an account');
  await expect(page.getByLabel('Page context').locator('span')).toHaveCount(0);

  await page.close();
});

test('correct user/empty pass', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open();
  await loginPage.setUserName(username);
  await loginPage.setPassword(emptypass);
  await loginPage.singIn();

  await expect(page).toHaveURL(/login/);
  expect(await page.screenshot()).toMatchSnapshot("emptyPass.png");
  //await expect(page.getByRole('alert')).toContainText('Incorrect username or password.');
  //await expect(page.locator('#login')).toContainText('Create an account');
  //await expect(page.getByLabel('Page context').locator('span')).toHaveCount(0);

  await page.close();
});

test('empty user/empty pass', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open();
  await loginPage.setUserName(emptypass);
  await loginPage.setPassword(emptypass);
  await loginPage.singIn();

  await expect(page).toHaveURL(/login/);
  expect(await page.screenshot()).toMatchSnapshot("emptyUserPass.png");
 
  await page.close();
});