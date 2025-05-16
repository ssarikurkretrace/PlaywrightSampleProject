const {test, expect, selectors} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
require('dotenv').config(); 

test.only('Patients Page Test', async ({page}) => {
    
    const loginPage = new LoginPage(page);

    await loginPage.goTo();
    console.log(await page.title)
    await expect(page).toHaveTitle("Login")
    // await page.waitForTimeout(50000);

    const partnerName = "qa-cls5"
    const practiceName = "CLS2"
    // const practiceName = "Headquarters"


    await loginPage.validLogin(partnerName);


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