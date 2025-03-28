import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class EventLeadForm extends LightningElement {
    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: "Success!",
            message: "Lead record created successfully.",
            variant: "success",
        });
        this.dispatchEvent(evt);
    }
}