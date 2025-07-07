const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils');
const loginPayLoad = {
    user: process.env.SUPERUSER,
    password: process.env.SUPERPASS,
    expiresIn: 100,
    partnerId: process.env.TESTPARTNER
};

let response;
let token;
test('Generate Token', async () => {

    const apiContext = await request.newContext({
        ignoreHTTPSErrors: true // ← this line fixes the SSL error
    });

    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    // token =  await apiUtils.generateToken(loginPayLoad);
    // console.log(token);
    const patientData = await apiUtils.getPatientData(process.env.TESTPARTNER, process.env.TESTPRACTICE, "1707");

    console.log(patientData);

    const firstName = patientData.first_name;
    console.log("Patient First Name = " + firstName);


});

test('Get Pet with Petid', async () => {

    
    const apiContext = await request.newContext({
        ignoreHTTPSErrors: true
    });

    const petId = 1; // Replace with desired petId
    const response = await apiContext.get(`https://petstore.swagger.io/v2/pet/${petId}`, {
        headers: {
            Accept: 'application/json'
        }
    });

    expect(response.status()).toBe(200);

    const json = await response.json();
    console.log(json);



});

test('Get Pet with Petid With UtilClass', async () => {
    const apiContext = await request.newContext({
        ignoreHTTPSErrors: true
    });

    const apiUtils = new APIUtils(apiContext);
    const petData = await apiUtils.getPetDataWithId(2);
    console.log(petData);

});
