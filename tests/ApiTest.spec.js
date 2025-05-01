const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
const loginPayLoad = {
    user: process.env.SUPERUSER,
    password: process.env.SUPERPASS,
    expiresIn: 100,
    partnerId: process.env.TESTPARTNER
    };

let response;
let token;
 test('Generate Token', async ()=>{

    const apiContext = await request.newContext({
        ignoreHTTPSErrors: true // ← this line fixes the SSL error
    });

    const apiUtils = new APIUtils(apiContext,loginPayLoad);
    // token =  await apiUtils.generateToken(loginPayLoad);
    // console.log(token);
    const patientData = await apiUtils.getPatientData(process.env.TESTPARTNER,process.env.TESTPRACTICE,"1707");

    console.log(patientData);

    const firstName = patientData.first_name;
    console.log("Patient First Name = "+firstName);


 });



