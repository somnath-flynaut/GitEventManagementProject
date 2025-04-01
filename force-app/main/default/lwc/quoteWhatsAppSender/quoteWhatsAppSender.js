import { LightningElement, api, wire, track } from 'lwc';
import whatsappMethod from '@salesforce/apex/WhatsAppIntigrationCls.whatsappMethod';
import { getRecord } from 'lightning/uiRecordApi';

const PHONE_FIELD = 'Quote__c.Phone__c'; // Replace with actual API name

export default class QuoteWhatsAppSender extends LightningElement {
    @api recordId;
    @track message;

    @wire(getRecord, { recordId: '$recordId', fields: [PHONE_FIELD] })
    quote;

    handleClick() {
        const rawPhone = this.quote.data.fields.Phone__c.value;
    
        if (rawPhone) {
            const formattedPhone = '91' + rawPhone.replace(/\D/g, '');
    
            // ✅ Send both contactNumber and quoteID
            whatsappMethod({ contactNumber: formattedPhone, quoteID: this.recordId })
                .then((result) => {
                    this.message = 'WhatsApp sent successfully!';
                    console.log(result);
                })
                .catch((error) => {
                    this.message = 'Error: ' + error.body.message;
                    console.error(error);
                });
        } else {
            this.message = 'No phone number found on this record.';
        }
    }
}