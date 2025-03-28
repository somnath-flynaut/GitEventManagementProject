import { LightningElement } from 'lwc';
import companyLogos from '@salesforce/resourceUrl/companyLogos';

export default class ImageCarousel extends LightningElement {
    images = [
        { id: 1, url: companyLogos + '/CompanyLogo/adidas.jpg', altText: 'Adidas' },
        { id: 2, url: companyLogos + '/CompanyLogo/Amazon.jpg', altText: 'Amazon' },
        { id: 3, url: companyLogos + '/CompanyLogo/Apple.jpg', altText: 'Apple' },
        { id: 4, url: companyLogos + '/CompanyLogo/CocaCola.jpg', altText: 'CocaCola' },
        { id: 5, url: companyLogos + '/CompanyLogo/Ford.jpg', altText: 'Ford' },
        { id: 6, url: companyLogos + '/CompanyLogo/Nike.jpg', altText: 'Nike' }
    ];

    intervalId;

    connectedCallback() {
        this.startAutoScroll();
    }

    startAutoScroll() {
        this.intervalId = setInterval(() => {
            let track = this.template.querySelector('.carousel-track');
            if (track) {
                track.style.transition = 'transform 0.5s ease-in-out';
                track.style.transform = 'translateX(-220px)'; // Move left by one image width + gap

                setTimeout(() => {
                    track.style.transition = 'none';
                    track.appendChild(track.firstElementChild);
                    track.style.transform = 'translateX(0)';
                }, 500);
            }
        }, 3000);
    }

    disconnectedCallback() {
        clearInterval(this.intervalId);
    }
}