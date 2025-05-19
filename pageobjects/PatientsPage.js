// require('dotenv').config(); 
class PatientsPage {

    constructor(page){
        this.page = page;
        this.patientTabLoc = page.locator("._navbarItem_13kkp_199").getByText("Patients");
        this.patientSearchBox = page.getByPlaceholder("Search Name ID")
        this.patientNameDropdown =  page.locator("[name=' Carla Ave']")
    }




}
module.exports = {PatientsPage};
