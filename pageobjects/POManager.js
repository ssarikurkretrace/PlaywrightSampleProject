const {LoginPage} = require('./LoginPage');
const {PatientsPage} = require('./PatientsPage');



class POManager{

    constructor(page){
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new PatientsPage(this.page);

}

}