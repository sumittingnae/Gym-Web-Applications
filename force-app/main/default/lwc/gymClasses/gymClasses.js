import { LightningElement, wire } from 'lwc';
import getAllClasses from '@salesforce/apex/memberpackagesprice.getAllClasses';
import getAllRegistration from '@salesforce/apex/memberpackagesprice.getRegistration';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Name', fieldName: 'Name__c' },
    { label: 'Email', fieldName: 'Email__c' },
    { label: 'Contact', fieldName: 'Contact__c' },
    { label: 'Package Price', fieldName: 'Package_Price__c' },
    { label: 'Amount to paid', fieldName: 'Amount_to_paid__c' },
    { label: 'Balanced', fieldName: 'Balanced__c' },

];

export default class GymClasses extends LightningElement {
    classList;
    className;
    classesInfo;
    columns = columns;
    showModal = false;
    showSpinner = false;

    @wire(getAllClasses)
    classes({ error, data }) {
        if (data) {
            this.classList = data;
            console.log('Classes data:', data);
        } else if (error) {
            console.error('Error fetching classes:', error);
        }
    }

    handleBrandClick(event) {
        this.className = event.currentTarget.dataset.id;
        console.log('Selected class name:', this.className);
        this.showModal = true;
        this.showSpinner = true;

        getAllRegistration({ className: this.className })
            .then(result => {
                console.log('Registration data:', result);
                this.classesInfo = result;
                this.showSpinner = false;
            })
            .catch(error => {
                console.error('Error fetching registration data:', error);
            });
    }

    hideBox() {
        this.showModal = false;
    }
}
