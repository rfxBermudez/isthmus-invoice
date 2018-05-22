/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DebtorService } from './Debtor.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Debtor',
	templateUrl: './Debtor.component.html',
	styleUrls: ['./Debtor.component.css'],
  providers: [DebtorService]
})
export class DebtorComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
	private errorMessage;

  
      
          daysRemains = new FormControl("", Validators.required);
        
  
      
          mensualTax = new FormControl("", Validators.required);
        
  
      
          minimumTax = new FormControl("", Validators.required);
        
  
      
          userId = new FormControl("", Validators.required);
        
  
      
          identificationType = new FormControl("", Validators.required);
        
  
      
          identification = new FormControl("", Validators.required);
        
  
      
          name = new FormControl("", Validators.required);
        
  
      
          lastName = new FormControl("", Validators.required);
        
  
      
          country = new FormControl("", Validators.required);
        
  
      
          accounts = new FormControl("", Validators.required);
        
  


  constructor(private serviceDebtor:DebtorService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          daysRemains:this.daysRemains,
        
    
        
          mensualTax:this.mensualTax,
        
    
        
          minimumTax:this.minimumTax,
        
    
        
          userId:this.userId,
        
    
        
          identificationType:this.identificationType,
        
    
        
          identification:this.identification,
        
    
        
          name:this.name,
        
    
        
          lastName:this.lastName,
        
    
        
          country:this.country,
        
    
        
          accounts:this.accounts
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceDebtor.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "org.isthmus.invoice.Debtor",
      
        
          "daysRemains":this.daysRemains.value,
        
      
        
          "mensualTax":this.mensualTax.value,
        
      
        
          "minimumTax":this.minimumTax.value,
        
      
        
          "userId":this.userId.value,
        
      
        
          "identificationType":this.identificationType.value,
        
      
        
          "identification":this.identification.value,
        
      
        
          "name":this.name.value,
        
      
        
          "lastName":this.lastName.value,
        
      
        
          "country":this.country.value,
        
      
        
          "accounts":this.accounts.value
        
      
    };

    this.myForm.setValue({
      
        
          "daysRemains":null,
        
      
        
          "mensualTax":null,
        
      
        
          "minimumTax":null,
        
      
        
          "userId":null,
        
      
        
          "identificationType":null,
        
      
        
          "identification":null,
        
      
        
          "name":null,
        
      
        
          "lastName":null,
        
      
        
          "country":null,
        
      
        
          "accounts":null
        
      
    });

    return this.serviceDebtor.addParticipant(this.participant)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "daysRemains":null,
        
      
        
          "mensualTax":null,
        
      
        
          "minimumTax":null,
        
      
        
          "userId":null,
        
      
        
          "identificationType":null,
        
      
        
          "identification":null,
        
      
        
          "name":null,
        
      
        
          "lastName":null,
        
      
        
          "country":null,
        
      
        
          "accounts":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "org.isthmus.invoice.Debtor",
      
        
          
            "daysRemains":this.daysRemains.value,
          
        
    
        
          
            "mensualTax":this.mensualTax.value,
          
        
    
        
          
            "minimumTax":this.minimumTax.value,
          
        
    
        
          
        
    
        
          
            "identificationType":this.identificationType.value,
          
        
    
        
          
            "identification":this.identification.value,
          
        
    
        
          
            "name":this.name.value,
          
        
    
        
          
            "lastName":this.lastName.value,
          
        
    
        
          
            "country":this.country.value,
          
        
    
        
          
            "accounts":this.accounts.value
          
        
    
    };

    return this.serviceDebtor.updateParticipant(form.get("userId").value,this.participant)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceDebtor.deleteParticipant(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceDebtor.getparticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "daysRemains":null,
          
        
          
            "mensualTax":null,
          
        
          
            "minimumTax":null,
          
        
          
            "userId":null,
          
        
          
            "identificationType":null,
          
        
          
            "identification":null,
          
        
          
            "name":null,
          
        
          
            "lastName":null,
          
        
          
            "country":null,
          
        
          
            "accounts":null 
          
        
      };



      
        if(result.daysRemains){
          
            formObject.daysRemains = result.daysRemains;
          
        }else{
          formObject.daysRemains = null;
        }
      
        if(result.mensualTax){
          
            formObject.mensualTax = result.mensualTax;
          
        }else{
          formObject.mensualTax = null;
        }
      
        if(result.minimumTax){
          
            formObject.minimumTax = result.minimumTax;
          
        }else{
          formObject.minimumTax = null;
        }
      
        if(result.userId){
          
            formObject.userId = result.userId;
          
        }else{
          formObject.userId = null;
        }
      
        if(result.identificationType){
          
            formObject.identificationType = result.identificationType;
          
        }else{
          formObject.identificationType = null;
        }
      
        if(result.identification){
          
            formObject.identification = result.identification;
          
        }else{
          formObject.identification = null;
        }
      
        if(result.name){
          
            formObject.name = result.name;
          
        }else{
          formObject.name = null;
        }
      
        if(result.lastName){
          
            formObject.lastName = result.lastName;
          
        }else{
          formObject.lastName = null;
        }
      
        if(result.country){
          
            formObject.country = result.country;
          
        }else{
          formObject.country = null;
        }
      
        if(result.accounts){
          
            formObject.accounts = result.accounts;
          
        }else{
          formObject.accounts = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "daysRemains":null,
        
      
        
          "mensualTax":null,
        
      
        
          "minimumTax":null,
        
      
        
          "userId":null,
        
      
        
          "identificationType":null,
        
      
        
          "identification":null,
        
      
        
          "name":null,
        
      
        
          "lastName":null,
        
      
        
          "country":null,
        
      
        
          "accounts":null 
        
      
      });
  }

}
