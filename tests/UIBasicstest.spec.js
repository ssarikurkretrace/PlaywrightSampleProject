const {test, expect, selectors} = require('@playwright/test');
require('dotenv').config(); 

test('Browser Context Playwright Test', async ({browser}) =>
{
const context = await browser.newContext();
const page = await context.newPage();
await page.goto ("https://staging.retrace.ai");
await page.waitForTimeout(50000);
});


test('Page Playwright Test', async ({page}) =>
{
await page.goto ("https://staging.retrace.ai");
console.log(await page.title)
await expect(page).toHaveTitle("Login")
// await page.waitForTimeout(50000);
// Su1eym@n.
// suleyman+testsuper@retrace.ai

const partnerName = "qa-cls5"
const practiceName = "CLS2"
// const practiceName = "Headquarters"

await page.getByRole("textbox", {name: "Enter your email address"}).fill(process.env.SUPERUSER)
await page.getByPlaceholder("Enter your password").fill(process.env.SUPERPASS)
await page.getByPlaceholder("Enter the Partner ID").fill(partnerName)
// await page.getByRole(" ")

await page.getByRole( "button", {name:'Login'} ).click()
await page.waitForTimeout(3000);
// await expect(page).toHaveTitle("Home")
// await page.locator("[placeholder='Enter your email address']").fill('suleyman+testsuper@retrace.ai')

// await page.locator('index [placeholder="Enter your password"]').fill('Su1eym@n.')

// check practice name is correct 
const practiceExisting = await page.locator("._practice_name_13kkp_123").textContent();
console.log("existing practice = " + practiceExisting)
console.log("practice name= " + practiceName)
if(practiceExisting != practiceName){
    await page.locator("._practice_name_13kkp_123").click();
    const practiceNameList = await page.locator(".ant-collapse-content-active ._practice_name_13kkp_123").allTextContents();
    console.log(practiceNameList[0])
    console.log("result = "+practiceNameList.length);
    console.log("result = "+practiceNameList);

    await page.locator("._practice_name_13kkp_123:has-text('"+practiceName+"')").click();
}

await page.locator("._navbarItem_13kkp_199").getByText("Patients").click();

await page.getByPlaceholder("Search Name ID").fill("Ave")
await page.locator("[name=' Carla Ave']").click()



await page.pause();

// await page.pause();


// select correct practice


});