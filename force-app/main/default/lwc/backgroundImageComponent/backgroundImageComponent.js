import { LightningElement } from 'lwc';

export default class BackgroundImageComponent extends LightningElement {
    backgroundImageUrl = 'http://i.stack.imgur.com/L8rHf.png'; // Replace with your image URL

    get backgroundStyle() {
        return `background-image: url(${this.backgroundImageUrl}); background-size: cover; background-position: center;`;
    }
}