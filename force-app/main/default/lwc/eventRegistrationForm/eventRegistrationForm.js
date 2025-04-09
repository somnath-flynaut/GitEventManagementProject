import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ticketprice from '@salesforce/apex/EventController.ticketprice';

export default class EventRegistrationForm extends LightningElement {
    @track eventName = '';
    @track eventId = '';
    @track isLoading = true;
    @track showPaymentModal = false;
    @track showprice = 0;
    @track price; // base price from Apex

    EvtId;
    ticketType;
    ticketCount;

    @wire(CurrentPageReference)
    getPageReference(currentPageReference) {
        if (currentPageReference) {
            this.eventName = currentPageReference.state.eventName || 'Unknown Event';
            this.eventId = currentPageReference.state.eventId || '';
            this.EvtId = this.eventId;

            if (this.EvtId) {
                this.fetchBasePrice();
            }
        }
        this.isLoading = false;
    }

    fetchBasePrice() {
        if (this.EvtId) {
            ticketprice({ EvtId: this.EvtId })
                .then((data) => {
                    this.price = data;
                    console.log('Base price fetched:', this.price);
                })
                .catch((error) => {
                    console.error('Error fetching base price:', error);
                    this.showprice = 0;
                });
        }
    }

    handleTicketTypeChange(event) {
        this.ticketType = event.target.value;
        this.calculatePrice();
    }

    handlenumber(event) {
        const count = parseInt(event.target.value, 10);
        this.ticketCount = count;
        this.calculatePrice();
    }

    calculatePrice() {
        if (this.price && this.ticketType && this.ticketCount) {
            let finalPrice = this.price;
            if (this.ticketType === 'VIP') {
                finalPrice *= 1.5;
            } else if (this.ticketType === 'Student') {
                finalPrice *= 0.85;
            } else if (this.ticketType === 'General') {
                finalPrice *= 1;
            }
            finalPrice *= this.ticketCount;
            this.showprice = finalPrice;
        }
    }

    handleProceedToPay() {
        this.showPaymentModal = true;
    }

    closePaymentModal() {
        this.showPaymentModal = false;
    }

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
