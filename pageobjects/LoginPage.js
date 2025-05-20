
require('dotenv').config(); 
class LoginPage {

    constructor(page){
        this.page = page;
        this.userName = page.getByRole("textbox", {name: "Enter your email address"});
        this.password = page.getByPlaceholder("Enter your password");
        this.partnerName = page.getByPlaceholder("Enter the Partner ID");
        this.loginButton = page.getByRole( "button", {name:'Login'} );
        this.practiceNameUI = page.locator("._practice_name_13kkp_123");
        this.practiceNameListLoc = page.locator(".ant-collapse-content-active ._practice_name_13kkp_123");
        this.patientTabLoc = page.locator("._navbarItem_13kkp_199").getByText("Patients");
        this.patientSearchBox = page.getByPlaceholder("Search Name ID")
        this.patientNameDropdown =  page.locator("[name=' Carla Ave']")
    }
    
    async goTo(){
        await this.page.goto (process.env.URL);
    }
    
    async validLogin(partnerName){
        await this.userName.fill(process.env.SUPERUSER);
        await this.password.fill(process.env.SUPERPASS);
        await this.partnerName.fill(partnerName);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async checkPractice(practiceName){
        const practiceExisting = await this.practiceNameUI.textContent();

        console.log("existing practice = " + practiceExisting)
        console.log("practice name= " + practiceName)
        if(practiceExisting != practiceName){
            await this.practiceNameUI.click();
            const practiceNameList = await this.practiceNameListLoc.allTextContents();
            console.log(practiceNameList[0])
            console.log("result = "+practiceNameList.length);
            console.log("result = "+practiceNameList);
    
            await this.page.locator("._practice_name_13kkp_123:has-text('"+practiceName+"')").click();
        }

    }

    async navigateToPage(pageNameForNavigate){
        const selectPage =this.page.locator("._container_1qnps_1._titleHstack_13kkp_29").getByText(pageNameForNavigate);
        await selectPage.click();
    }


    async navigateToDropdownPage(pageNameForNavigate){
        const selectPage =this.page.locator("._container_1qnps_1._titleHstack_13kkp_29").getByRole('link', { name: 'Unsubmitted Claims' });
        await selectPage.click();
    }


    }
    module.exports = {LoginPage};