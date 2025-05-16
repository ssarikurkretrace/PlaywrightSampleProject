
require('dotenv').config(); 
class LoginPage {

    constructor(page)
    {
        this.page = page;
        this.userName = page.getByRole("textbox", {name: "Enter your email address"});
        this.password = page.getByPlaceholder("Enter your password");
        this.partnerName = page.getByPlaceholder("Enter the Partner ID");
        this.loginButton = page.getByRole( "button", {name:'Login'} );

    }
    
    async goTo()
    {
        await this.page.goto (process.env.URL);
    }
    
    async validLogin(partnerName)
    {
        await this.userName.fill(process.env.SUPERUSER);
        await this.password.fill(process.env.SUPERPASS);
        await this.partnerName.fill(partnerName);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    
    }
    
    }
    module.exports = {LoginPage};