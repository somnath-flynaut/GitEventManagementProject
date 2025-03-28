import { LightningElement } from 'lwc';
import whatsappLogo from '@salesforce/resourceUrl/WhatsappLogo'; 
export default class WhatsappFloatingButton extends LightningElement {
    phoneNumber = '9021056895'; // Replace with your WhatsApp number
    message = 'Hi - we would love to learn more about your services. Could you please get back with some additional information?'; // Customize your message
    whatsappIcon = whatsappLogo; // Assign the imported WhatsApp logo

    get whatsappUrl() {
        return `https://web.whatsapp.com/send?phone=${this.phoneNumber}&text=${encodeURIComponent(this.message)}`;
    }
}