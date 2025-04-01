import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class EventRegistrationForm extends LightningElement {
    @track eventName = '';
    @track eventId = '';
    @track isLoading = true;
    @track showPaymentModal = false; // Controls Payment Popup

    @wire(CurrentPageReference)
    getPageReference(currentPageReference) {
        if (currentPageReference) {
            this.eventName = currentPageReference.state.eventName || 'Unknown Event';
            this.eventId = currentPageReference.state.eventId || '';
        }
        this.isLoading = false;
    }

    // Open Payment Popup
    handleProceedToPay() {
        this.showPaymentModal = true;
    }

    // Close Payment Popup
    closePaymentModal() {
        this.showPaymentModal = false;
    }

    // Show success message when record is saved
    handleSuccess(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Registration Successful! Record ID: ' + event.detail.id,
                variant: 'success',
            })
        );
    }
}