// imageGrid.js
import { LightningElement, track } from 'lwc';
import weddingImages from '@salesforce/resourceUrl/weddingImages';

export default class ImageGrid extends LightningElement {
    @track grids = [
        {
            id: 1,
            images: [
                weddingImages+'/weddingImages/1.jpeg',
                weddingImages+'/weddingImages/2.jpeg',
                weddingImages+'/weddingImages/3.jpeg'
            ]
        },
        {
            id: 2,
            images: [
                weddingImages+'/weddingImages/4.jpeg',
                weddingImages+'/weddingImages/5.jpeg',
                weddingImages+'/weddingImages/6.jpeg'
            ]
        },
        {
            id: 3,
            images: [
                weddingImages+'/weddingImages/7.jpeg',
                weddingImages+'/weddingImages/8.jpeg',
                weddingImages+'/weddingImages/9.jpeg'
            ]
        },
        {
            id: 4,
            images: [
                weddingImages+'/weddingImages/10.jpeg',
                weddingImages+'/weddingImages/11.jpeg',
                weddingImages+'/weddingImages/12.jpeg'
            ]
        }
    ];

    textContent = {
        title: 'UNLOCK YOUR DREAM DESTINATION WEDDING IN MAHARASHTRA',
        description: `Choose Flynaut Event Management Company for your premium
                      destination wedding in Maharashtra, India. Whether you dream of a
                      beach wedding in Maharashtra or a resort celebration, we will bring it to
                      life, infusing rich traditions.`,
        extraInfo: `We also offer venue selection assistance for an easier planning
                    process. Our track record includes clients from India and abroad,
                    making us your ideal partner for a dream destination wedding in
                    Maharashtra, India.`
    };

    connectedCallback() {
        this.startImageRotation();
    }

    startImageRotation() {
        setInterval(() => {
            this.grids = this.grids.map(grid => ({
                ...grid,
                images: [...grid.images.slice(1), grid.images[0]]
            }));
        }, 3000);
    }
    handleWhatsAppClick() {
        const phoneNumber = '9021056895'; // Replace with the actual phone number
        const message = 'Hi - we would love to learn more about your services. Could you please get back with some additional information?'; // Customize your message
        const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
}