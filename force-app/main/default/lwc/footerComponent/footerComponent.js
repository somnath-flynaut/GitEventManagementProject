import { LightningElement } from 'lwc';
import EventImages from '@salesforce/resourceUrl/Image';

export default class FooterComponent extends LightningElement {
    facebookIcon = EventImages +'/Image/facebook.png';
    instagramIcon = EventImages +'/Image/instagram.png';
    linkedinIcon = EventImages +'/Image/linkedin.png';
    twitterIcon = EventImages +'/Image/twitter.png';
}