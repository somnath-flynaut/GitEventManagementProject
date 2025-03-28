import { LightningElement, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import findEventsByName from '@salesforce/apex/EventController.findEventsByName';

export default class FeedbackForm extends LightningElement {
    @track eventId = '';
    @track eventOptions = [];
    @track feedbackName = '';
    @track phone = '';
    @track overallExperience = '';
    @track comments = '';
    @track rating = '';
    @track interestedInHosting = false;

    // Options for Overall Experience and Rating
    overallExperienceOptions = [
        { label: 'Excellent', value: 'Excellent' },
        { label: 'Good', value: 'Good' },
        { label: 'Bad', value: 'Bad' }
    ];

    ratingOptions = Array.from({ length: 6 }, (_, i) => ({ label: String(i), value: String(i) }));

    // Fetch events when user types in the combobox
    handleEventSearch(event) {
        const searchKey = event.target.value;
        if (searchKey && searchKey.length > 1) {
            findEventsByName({ eventName: searchKey })
                .then(result => {
                    this.eventOptions = result.map(event => ({
                        label: `${event.Name} (${event.Event_Date_Time__c})`,
                        value: event.Id
                    }));
                })
                .catch(error => {
                    console.error('Error fetching events:', error);
                    this.eventOptions = [];
                });
        } else {
            this.eventOptions = [];
        }
    }

    // Handle Event Selection
    handleEventChange(event) {
        this.eventId = event.detail.value;
    }

    // Other field handlers
    handleNameChange(event) {
        this.feedbackName = event.target.value;
    }

    handlePhoneChange(event) {
        this.phone = event.target.value;
    }

    handleOverallExperienceChange(event) {
        this.overallExperience = event.target.value;
    }

    handleCommentsChange(event) {
        this.comments = event.target.value;
    }

    handleRatingChange(event) {
        this.rating = event.target.value;
    }

    handleInterestedChange(event) {
        this.interestedInHosting = event.target.checked;
    }

    // Submit the form
    handleSubmit() {
        const fields = {
            Event__c: this.eventId,
            Name__c: this.feedbackName,
            Phone__c: this.phone,
            Overall_Experience__c: this.overallExperience,
            Comments__c: this.comments,
            Rating__c: this.rating,
            Interested_in_Hosting_an_Event__c: this.interestedInHosting
        };

        const recordInput = { apiName: 'Feedback__c', fields };

        createRecord(recordInput)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Thank you for your feedback! We appreciate your time and effort in helping us improve.',
                        variant: 'success'
                    })
                );
                this.resetForm();
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Error submitting feedback: ' + error.body.message,
                        variant: 'error'
                    })
                );
            });
    }

    // Reset the form
    resetForm() {
        this.eventId = '';
        this.eventOptions = [];
        this.feedbackName = '';
        this.phone = '';
        this.overallExperience = '';
        this.comments = '';
        this.rating = '';
        this.interestedInHosting = false;
    }

    // Fetch default events when the component is loaded
    connectedCallback() {
        this.fetchDefaultEvents();
    }

    // Fetch default current and past events without search input
    fetchDefaultEvents() {
        findEventsByName({ eventName: '' })
            .then(result => {
                this.eventOptions = result.map(event => ({
                    label: `${event.Name} (${event.Event_Date_Time__c})`,
                    value: event.Id
                }));
            })
            .catch(error => {
                console.error('Error fetching default events:', error);
                this.eventOptions = [];
            });
    }
}