import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CreateNewRegistration extends NavigationMixin(LightningElement) {
    handleOpenGlobalAction() {
        // Navigate to the global action
        this[NavigationMixin.Navigate]({
            type: 'standard__globalAction',
            attributes: {
                actionName: 'New_Registration' // Replace with your Global Action API Name
            }
        });
    }
}