import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class CreateEventManagerRecordByGuestUser extends LightningElement {

    handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: 'Success',
            message: 'Registration Successful! Record ID: ' + event.detail.id,
            variant: 'success',
        });
        this.dispatchEvent(toastEvent);
    }
}