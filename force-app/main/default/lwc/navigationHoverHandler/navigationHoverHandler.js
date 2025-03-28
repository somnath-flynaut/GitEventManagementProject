import { LightningElement } from 'lwc';

export default class EventCategories extends LightningElement {
    connectedCallback() {
        setTimeout(() => {
            let eventTab = document.querySelector('a[href="/s/event"]'); // Find "Event" tab
            let lwcComponent = document.querySelector('c-event-categories');

            if (eventTab && lwcComponent) {
                console.log("✅ Event Tab & LWC Found!");

                // Show component on hover
                eventTab.addEventListener('mouseenter', () => {
                    console.log("🎯 Hovering over Event Tab");
                    lwcComponent.classList.add('show');
                    lwcComponent.classList.remove('hidden');
                    lwcComponent.style.display = 'block';
                });

                // Hide component when mouse leaves
                eventTab.addEventListener('mouseleave', () => {
                    console.log("🔻 Mouse left Event Tab");
                    setTimeout(() => {
                        lwcComponent.classList.remove('show');
                        lwcComponent.classList.add('hidden');
                        lwcComponent.style.display = 'none';
                    }, 500);
                });

                // Keep visible if hovered
                lwcComponent.addEventListener('mouseenter', () => {
                    console.log("✅ Hovered over LWC Component");
                    lwcComponent.classList.add('show');
                    lwcComponent.classList.remove('hidden');
                    lwcComponent.style.display = 'block';
                });

                // Hide when mouse leaves LWC component
                lwcComponent.addEventListener('mouseleave', () => {
                    console.log("🚫 Mouse left LWC Component");
                    lwcComponent.classList.remove('show');
                    lwcComponent.classList.add('hidden');
                    lwcComponent.style.display = 'none';
                });

            } else {
                console.error("❌ Event Tab or LWC Component NOT FOUND.");
            }
        }, 2000); // Ensure DOM is loaded before querying elements
    }
}