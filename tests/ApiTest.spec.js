const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
const loginPayLoad = {
    user: "suleyman+testsuper@retrace.ai",
    password: "Su1eym@n.",
    expiresIn: 100,
    partnerId: "qa-cls5"
    };
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"67a8dde5c0d3e6622a297cc8"}]};

let response;
// test.beforeAll( async()=>{
//     const apiContext = await request.newContext({
//         ignoreHTTPSErrors: true // ← this line fixes the SSL error
//       });


//    const loginResponse = await apiContext.post("https://staging.retrace.ai/api/request_json_web_token", {

//    data: loginPayLoad,
//    headers: {
//        'User-Agent': 'test',
//        'Content-Type': 'application/json',
//    }
// }); // 200, 201
// const loginResponseJson = await loginResponse.json();
// const token = loginResponseJson.token;
// console.log(token);



// //    const apiUtils = new APIUtils(apiContext,loginPayLoad);
// //    response =  await apiUtils.createOrder(orderPayLoad);
 
// })
 
let token;
 test('Generate Token', async ()=>{

    const apiContext = await request.newContext({
        ignoreHTTPSErrors: true // ← this line fixes the SSL error
    });

    // const loginResponse = await apiContext.post("https://staging.retrace.ai/api/request_json_web_token", {

    //     data: loginPayLoad,
    //     headers: {
    //         'User-Agent': 'test',
    //         'Content-Type': 'application/json',
    //     }
    // }); // 200, 201
    // const loginResponseJson = await loginResponse.json();
    // const token = loginResponseJson.token;
    // console.log(token);

    const apiUtils = new APIUtils(apiContext,loginPayLoad);
    // token =  await apiUtils.generateToken(loginPayLoad);
    // console.log(token);
    // console.log(await apiUtils.getPatientData("qa-cls5","iCyaFQjSsFmt1RfN","1707"));

    const patientData = await apiUtils.getPatientData("qa-cls5","iCyaFQjSsFmt1RfN","1707");

    const firstName = patientData.first_name;
    console.log("Patient First Name = "+firstName);


 });



//create order is success
test('@API Place the order', async ({page})=>
{ 
    page.addInitScript(value => {
 
        window.localStorage.setItem('token',value);
    }, response.token );
await page.goto("https://rahulshettyacademy.com/client");
 await page.locator("button[routerlink*='myorders']").click();
 await page.locator("tbody").waitFor();
const rows = await page.locator("tbody tr");
 
 
for(let i =0; i<await rows.count(); ++i)
{
   const rowOrderId =await rows.nth(i).locator("th").textContent();
   if (response.orderId.includes(rowOrderId))
   {
       await rows.nth(i).locator("button").first().click();
       break;
   }
}
const orderIdDetails =await page.locator(".col-text").textContent();
//await page.pause();
expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
 
});
