const { test } = require('@playwright/test');
require('dotenv').config(); 
const mongoUtils = require('./utils/MongoUtils');

test('Fetch patient record from MongoDB', async () => {
  const mongo = new mongoUtils(process.env.MONGO_URI, process.env.TESTPARTNER);

  await mongo.connect();

  const collection = mongo.getCollection("patient_1");
  const doc = await collection.findOne({
    patient_id: "1000",
    practice_id: process.env.TESTPRACTICE,
  });

  console.log("Patient Doc:", doc);

  const docPatientsList = await collection.find({patient_id: "1000"}).toArray();
  console.log("patientList = " +docPatientsList.toString());

  const patientZero = docPatientsList[0].toString();
  console.log("patientZero = "+patientZero);

  const patientZero2 = JSON.stringify(docPatientsList[0]);
  console.log("patientZero = "+patientZero2);

  for(const patient of docPatientsList){
    console.log("Patient: ", patient.name);
  }

  await mongo.close();
});
