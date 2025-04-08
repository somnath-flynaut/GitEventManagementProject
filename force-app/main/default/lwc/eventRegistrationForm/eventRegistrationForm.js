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
ticketCount ;

handleEvt(event)
{
    this.EvtId = event.target.value;
    this.fetchBasePrice(); // fletch base price
}
handleTicketTypeChange(event)
{
    this.ticketType = event.target.value;
    this.calculatePrice(); // for multiplyer
}
handlenumber(event)
{
    const count = parseInt(event.target.value, 10);
    this.ticketCount = count;
    this.calculatePrice();
}

fetchBasePrice() {
    if(this.EvtId) {
        ticketprice({EvtId : this.EvtId})
        .then((data) => {
            this.price = data;
        })
        .catch((error)=> {
            console.error('Error fetching base price:', error);
                this.showprice = 0;
        })
    }
}

calculatePrice() {
    if(this.price && this.ticketType && this.ticketCount)
    {
    let finalPrice = this.price;
    if (this.ticketType === 'VIP') {
        finalPrice *= 1.5 *this.ticketCount;
    }  if (this.ticketType === 'Student') {
        finalPrice *= 0.85 *this.ticketCount ;
    }
    else if (this.ticketType === 'General') {
        finalPrice *= 1 *this.ticketCount ;
    }
    
       
    this.showprice = finalPrice;
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