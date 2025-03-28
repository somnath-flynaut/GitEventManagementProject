import { LightningElement,api } from 'lwc';

export default class MapComponent extends LightningElement {
    @api street;
    @api city;
    @api state;
    @api postalCode;
    @api country;
    @api title = 'Location'; // Default title for the map marker
    @api description = 'Address location'; // Default description

    // Compute the map markers
    mapMarkers = [  
        {
          location: {
        Street: 'Sr.No 22/2, One Mall, BRT Link Rd, Ravet',
        City: 'Pune,Pimpri-Chinchwad',
        State: 'Maharashtra',
        PostalCode: '412101',
        Country: 'India',
    },
    title: 'Flynaut SAAS Pvt. Ltd',
    description: 'Office HeadQuarter',
},
];
                
    // Compute the center of the map
    get center() {
        const markers = this.mapMarkers;
        return markers && markers.length > 0 ? markers[0].location : null;
    }
}