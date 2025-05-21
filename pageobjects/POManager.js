const {LoginPage} = require('./LoginPage');
const {PatientsPage} = require('./PatientsPage');

class POManager{

    constructor(page){
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.patientsPage = new PatientsPage(this.page);

}

getLoginPage(){
    return this.loginPage;
}

getPatiensPage(){
    return this.patientsPage;
}

}

module.exports = {POManager};