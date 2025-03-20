import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getUpcomingEvents from '@salesforce/apex/EventController.getUpcomingEvents';
import EventImages from '@salesforce/resourceUrl/Image';

export default class UpcomingEventRegistration extends NavigationMixin(LightningElement) {
    @track events = [];
    @wire(getUpcomingEvents)
        wiredPastEvents({ error, data }) {
            if (data) {
                this.events = data.map(event => ({
                    id: event.Id,
                    name: event.Name,
                    date: event.Event_Date_Time__c ? event.Event_Date_Time__c.split('T')[0] : '',
                    location: event.Venues__r ? event.Venues__r.Name : 'Unknown Venue', // Fetch Venue Name
                    imageUrl: EventImages + '/' + event.Static_Image_URL__c // Fetch Image URL from Record
                }));
            } else if (error) {
                console.error('Error fetching past events:', error);
            }
        }

    handleViewDetails(event) {
        const eventId = event.target.dataset.id;
        // Navigate to the Event Details LWC component
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'eventDetails__c' // This should match the community page API name
            },
            state: {
                eventId: eventId
            }
        });
    }
}