
const {test, expect, request} = require('@playwright/test');
class APIUtils{

    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async generateToken(){
        const tokenResponse = await this.apiContext.post(process.env.APITOKENURI, {
            headers: {
                'User-Agent': 'test',
                'Content-Type': 'application/json',
            },
            data: this.loginPayLoad
        }); // 200, 201
        const tokenResponseJson = await tokenResponse.json();
        const token = tokenResponseJson.token;
        console.log(token);
        return token;
    }

    async generateToken2(partner){

        const generatedLoginPayload = this.createLoginPayload(partner);
        // console.log("generatedLoginPayload ="+generatedLoginPayload);

        const tokenResponse = await this.apiContext.post(process.env.APITOKENURI, {
            headers: {
                'User-Agent': 'test',
                'Content-Type': 'application/json',
            },
            data: generatedLoginPayload
        }); 
        const tokenResponseJson = await tokenResponse.json();
        const token = `Bearer ${tokenResponseJson.token}`;
        // console.log("generateToken2 result = "+token);
        return token;
    }

    createLoginPayload(partner) {
        return {
          user: process.env.SUPERUSER,
          password: process.env.SUPERPASS,
          expiresIn: 100,
          partnerId: partner,
        };
      }

    async getPatientData(partner, practice, patient){

        console.log("partner = " +partner);
        const token = await this.generateToken2(partner); 
        // console.log("token = "+token);

        const apiContext2 = await request.newContext({
            baseURL: process.env.URL, 
            ignoreHTTPSErrors: true,
            extraHTTPHeaders: {
            Authorization: token,
            'User-Agent': 'test',
            },
        });

        const response = await apiContext2.get(`/api/patient/${patient}/${practice}/with_insurance`);

        if (!response.ok()) {
            throw new Error(`Request failed with status: ${response.status()}`);
        }

        const json = await response.json();
        // console.log(json);
        // console.log(json.primary_provider.first_name);
        // console.log(json.first_name);
        return json; 

    }




}
module.exports = { APIUtils };