import { LightningElement } from 'lwc';
import heroImages from '@salesforce/resourceUrl/heroImages';

export default class HeroCarousel extends LightningElement {
    images = [
        { id: 1, url: heroImages + '/heroImages/wedding_event.jpg', altText: 'Wedding Event' },
        { id: 2, url: heroImages + '/heroImages/corporate_event.jpg', altText: 'Corporate Event' },
        { id: 3, url: heroImages + '/heroImages/concert_event.jpg', altText: 'Concert Event' }
    ];

    mainMessage = "Partner with Flynaut Event Planner in Maharashtra";
    subMessage = "MAHARASHTRA'S #1 EXCLUSIVE EVENT COMPANY";

    currentIndex = 0;
    intervalId;

    connectedCallback() {
        this.applyZoomEffect(0);
        this.startAutoSlide();
    }

    startAutoSlide() {
        this.intervalId = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    nextSlide() {
        const track = this.template.querySelector('.carousel');
        const images = this.template.querySelectorAll('.carousel-item img');

        if (track && images.length > 0) {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
            track.style.transform = `translateX(-${this.currentIndex * 100}%)`;

            images.forEach(img => img.classList.remove('active'));
            setTimeout(() => {
                this.applyZoomEffect(this.currentIndex);
            }, 100);
        }
    }

    applyZoomEffect(index) {
        const images = this.template.querySelectorAll('.carousel-item img');
        if (images.length > 0) {
            images.forEach(img => img.classList.remove('active'));
            images[index].classList.add('active');
        }
    }

    pauseAutoSlide() {
        clearInterval(this.intervalId);
    }

    resumeAutoSlide() {
        this.startAutoSlide();
    }

    disconnectedCallback() {
        clearInterval(this.intervalId);
    }
}