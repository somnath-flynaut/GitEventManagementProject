import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ticketprice from '@salesforce/apex/EventController.ticketprice';

export default class EventRegistrationForm extends LightningElement {
    @track eventName = '';
    @track eventId = '';
    @track isLoading = true;
    @track showPaymentModal = false; // Controls Payment Popup
    EvtId;
    ticketType;
    numTickets;
    showprice;
   
    handleEvt(event)
    {
        this.EvtId = event.target.value;
         this.calculatePrice();
    }
    handleTicketTypeChange(event)
    {
        this.ticketType = event.target.value;
        this.calculatePrice();
    }
    handlenumber(event)
    {
        this.numTickets = event.target.value;
        this.calculatePrice();
    }

    calculatePrice() {
        if(this.EvtId && this.ticketType && this.numTickets) {
         ticketprice({ EvtId:this.EvtId, ticketType : this.ticketType, numTickets: this.numTickets })
         .then(data => {
             this.showprice=data;
        })
        .catch((error) => {
         console.error('Error fetching price:', error);
         this.showprice = 0;
     });
        }
     }





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