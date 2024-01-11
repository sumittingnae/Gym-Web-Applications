import { LightningElement} from 'lwc';
import getRegistration from '@salesforce/schema/Member_Registration__c';
import { createRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
// import {reduceErrors} from 'c/ldsUtils';

export default class Registration extends LightningElement {
 memberregister={};
 

handlechange(event){
   //const { name, value } = event.target;
    this.memberregister[event.target.name] = event.target.value;
    console.log(this.memberregister);
}
handleSubmitInformation(){
    const fields=this.memberregister;
    const recordInputs={apiName: getRegistration.objectApiName, fields};
    console.log(recordInputs);
    createRecord(recordInputs)
    .then((register)=>{
        this.registerId=register.id;
        console.log( this.registerId);
        this.dispatchEvent(
            new ShowToastEvent({
                title:"Success",
                variant:"success"
            })
        );
        this.memberregister={};
    })
    .catch((error)=>{
        this.dispatchEvent(
            new ShowToastEvent({
                title:"Error",
                // message: error.body.message || 'Unknown error',
                variant:"error"
            })
        )
    })
    }
    // handleClear(){
    //   this.clearFileld=this.memberregister;
    //   this.clearFileld='';
        
    // }
}
