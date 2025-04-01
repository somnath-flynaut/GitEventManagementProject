import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import getEventDetails from '@salesforce/apex/EventController.getEventDetails';
import EventImages from '@salesforce/resourceUrl/Image'; // Import static resource

export default class EventDetails extends LightningElement {
    @track event = {};
    eventId;
    isLoading = true;
    @track showRegistration = false;  // Initially hidden

    @wire(CurrentPageReference)
    getPageReference(currentPageReference) {
        if (currentPageReference) {
            this.eventId = currentPageReference.state.eventId;
            console.log("Extracted Event ID:", this.eventId);
            if (this.eventId) {
                this.fetchEventDetails();
            } else {
                console.error("No event ID found in URL");
                this.isLoading = false;
            }
        }
    }

    fetchEventDetails() {
        if (!this.eventId) {
            console.error("Event ID is undefined");
            return;
        }

        getEventDetails({ eventId: this.eventId })
            .then(eventData => {
                console.log("Fetched Event Data:", JSON.stringify(eventData));
                
                if (eventData && eventData.length > 0) {
                    let event = eventData[0]; // Assuming Apex returns an array

                    let imageUrl = event.Static_Image_URL__c;
                    
                    // Validate and construct image path
                    if (imageUrl && !imageUrl.startsWith('http')) {
                        imageUrl = EventImages + '/' + imageUrl; // Append to static resource URL
                    }
                    // Format Date (Extract only YYYY-MM-DD)
                let formattedDate = event.Event_Date_Time__c ? event.Event_Date_Time__c.split('T')[0] : '';

                    this.event = {
                        id: event.Id,
                        name: event.Name,
                        date: formattedDate,
                        location: event.Venues__r ? event.Venues__r.Name : 'Unknown Venue', // Fetch Venue Name,
                        imageUrl: imageUrl, // Final corrected image URL
                        description: event.Event_Description__c  //Add description field
                    };
                    console.log("Processed Event Data:", JSON.stringify(this.event));
                } else {
                    console.error("Event not found in database.");
                    this.event = null;
                }
            })
            .catch(error => {
                console.error("Error fetching event details:", error);
            })
            .finally(() => {
                this.isLoading = false;
            });
    }

    // ✅ Navigation to Registration Page (Prefill Event_Details__c)
    handleRegister() {
        this.showRegistration = true;
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: 'eventRegistrationForm' // Navigate to Registration LWC
            },
            state: {
                eventName: this.event.name,
                eventId: this.event.id
            }
        });
    }
    
}