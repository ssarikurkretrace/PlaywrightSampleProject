const {test, expect, selectors} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');

require('dotenv').config(); 

test.only('Claim Page Test', async ({page}) => {

    const poManager = new POManager(page);
    //js file- Login js, DashboardPage
     const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();

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
    // await loginPage.navigateToPage("Patients")
    await loginPage.navigateToPage("Claims")
    await loginPage.navigateToDropdownPage("Unsubmitted Claims")


    //enter patient name
    await loginPage.patientSearchBox.fill("Ave")

    //select patient from dropdown
    await loginPage.patientNameDropdown.click()



    await page.pause();



});