import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class EventCategories extends NavigationMixin(LightningElement) {
    hideTimeout; // Store timeout reference

    connectedCallback() {
        setTimeout(() => {
            let servicesTab = document.querySelector('a[href="/Flynaut/s/service"]'); // Find "Services" tab
            let lwcComponent = this.template.querySelector('.event-categories-container'); // Get LWC div

            if (servicesTab && lwcComponent) {
                console.log("✅ Services Tab & LWC Found!");

                servicesTab.addEventListener('mouseenter', () => {
                    console.log("🎯 Hovering over Services Tab");
                    this.showComponent(lwcComponent);
                });

                servicesTab.addEventListener('mouseleave', () => {
                    console.log("🔻 Mouse left Services Tab");
                    this.scheduleHideComponent(lwcComponent);
                });

                lwcComponent.addEventListener('mouseenter', () => {
                    console.log("✅ Hovered over LWC Component");
                    this.cancelHideComponent(); // Cancel hide if hovering over LWC
                });

                lwcComponent.addEventListener('mouseleave', () => {
                    console.log("🚫 Mouse left LWC Component");
                    this.scheduleHideComponent(lwcComponent);
                });
            } else {
                console.error("❌ Services Tab or LWC Component NOT FOUND.");
            }
        }, 2000); // Wait for DOM to fully load
        // Add event listener for mouse scroll
        window.addEventListener('wheel', this.handleScroll.bind(this));
    }

    showComponent(lwcComponent) {
        clearTimeout(this.hideTimeout);
        lwcComponent.classList.add('show');
        lwcComponent.classList.remove('hidden');
        lwcComponent.style.display = 'block';
    }

    scheduleHideComponent(lwcComponent) {
        this.hideTimeout = setTimeout(() => {
            lwcComponent.classList.remove('show');
            lwcComponent.classList.add('hidden');
            lwcComponent.style.display = 'none';
        }, 500); // 500ms delay to allow moving between tab and LWC
    }

    cancelHideComponent() {
        clearTimeout(this.hideTimeout); // Prevent hiding if hovering over LWC
    }

    handleCategoryClick(event) {
        const category = event.target.dataset.category;
        //alert(`You clicked on: ${category}`);
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: `https://flynautsaasprivatelimited8-dev-ed.develop.my.site.com/Flynaut/s/event`
            }
        });
    }
    handleScroll(event) {
        const scrollContainer = this.template.querySelector('.event-categories');

        if (event.deltaY > 0) {
            // Scroll Down
            scrollContainer.scrollBy({ top: 50, behavior: 'smooth' });
        } else {
            // Scroll Up
            scrollContainer.scrollBy({ top: -50, behavior: 'smooth' });
        }
    }
    disconnectedCallback() {
        // Remove event listener when component is removed
        window.removeEventListener('wheel', this.handleScroll.bind(this));
    }
}