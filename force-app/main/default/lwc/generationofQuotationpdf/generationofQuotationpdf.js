import { LightningElement,api,wire,track } from 'lwc';// decorators
import sendemailmethod from '@salesforce/apex/GenerationOfQuotationPDFApexClass.sendemailmethod';//for calling class we import this
import { getRecord, getFieldValue } from "lightning/uiRecordApi";//AFTER GETTING ID TO GET RECORDS FIELD  STANDARD REFFER SF https://developer.salesforce.com/docs/platform/lwc/guide/reference-get-field-value.html

import ID_FIELD from "@salesforce/schema/Quote__c.Id";//ONLY WANT ID 
const fields=[ID_FIELD];// SCOPE WE USE ANY WHERE 

export default class GenerationofQuotationpdf extends LightningElement {


 @api recordId;// VARIABLE DECLARE HERE FRO STROE ID VALUE
 @track Quote__c; // Holds the @wire response
 // idReady = false; // Tracks whether the Id is ready

  @wire(getRecord, { recordId: "$recordId", fields: [ID_FIELD] })
  wiredAccount({ error, data }) {
    if (data) {
      this.Quote__c = data;
      const id = this.Id;
      console.log('id..',id);
      if (id) {
        //this.idReady = true;
        this.SENDEMAIL(id); // Call the method when the Id is available
      }
    } else if (error) {
      console.error("Error fetching account record:", error);
    }
  }

  get Id() {
    console.log('test match')
    return this.Quote__c ? getFieldValue(this.Quote__c, ID_FIELD) : null;
  }

  SENDEMAIL(Id) {
    console.log("ID received in SENDEMAIL:", Id);
     sendemailmethod({recid:this.recordId}).then((result) => {
         console.log("result:", result);

     })
  }
}