import { LightningElement, track, wire } from 'lwc';
import getPastEvents from '@salesforce/apex/EventController.getPastEvents';
import EventImages from '@salesforce/resourceUrl/Image';

export default class PastEvents extends LightningElement {
    @track pastEvents = [];

    @wire(getPastEvents)
    wiredPastEvents({ error, data }) {
        if (data) {
            this.pastEvents = data.map(event => ({
                id: event.Id,
                name: event.Name,
                date: event.Event_Date_Time__c ? event.Event_Date_Time__c.split('T')[0] : '',
                location: event.Venues__r ? event.Venues__r.Name : 'Unknown Venue',
                imageUrl: EventImages + '/' + event.Static_Image_URL__c // Fetch Image URL from Record
            }));
        } else if (error) {
            console.error('Error fetching past events:', error);
        }
    }
}