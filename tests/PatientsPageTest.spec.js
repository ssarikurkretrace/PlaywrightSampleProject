const {test, expect, selectors} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
require('dotenv').config(); 

test.only('Patients Page Test', async ({page}) => {
    
    const loginPage = new LoginPage(page);

    await loginPage.goTo();
    console.log(await page.title)
    await expect(page).toHaveTitle("Login")

    const partnerName = "qa-cls5"
    const practiceName = "CLS2"
    // const practiceName = "Headquarters"

    await loginPage.validLogin(partnerName);


    // check practice name is correct 
    await loginPage.checkPractice(practiceName);

    //Navigate to patients page
    await loginPage.patientTabLoc.click();

    //enter patient name
    await loginPage.patientSearchBox.fill("Ave")

    //select patient from dropdown
    await loginPage.patientNameDropdown.click()



    // await page.pause();



});