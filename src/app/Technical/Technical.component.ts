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
import { TechnicalService } from './Technical.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Technical',
	templateUrl: './Technical.component.html',
	styleUrls: ['./Technical.component.css'],
  providers: [TechnicalService]
})
export class TechnicalComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
	private errorMessage;

  
      
          userId = new FormControl("", Validators.required);
        
  
      
          identificationType = new FormControl("", Validators.required);
        
  
      
          identification = new FormControl("", Validators.required);
        
  
      
          name = new FormControl("", Validators.required);
        
  
      
          lastName = new FormControl("", Validators.required);
        
  
      
          country = new FormControl("", Validators.required);
        
  
      
          accounts = new FormControl("", Validators.required);
        
  


  constructor(private serviceTechnical:TechnicalService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
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
    return this.serviceTechnical.getAll()
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
      $class: "org.isthmus.invoice.Technical",
      
        
          "userId":this.userId.value,
        
      
        
          "identificationType":this.identificationType.value,
        
      
        
          "identification":this.identification.value,
        
      
        
          "name":this.name.value,
        
      
        
          "lastName":this.lastName.value,
        
      
        
          "country":this.country.value,
        
      
        
          "accounts":this.accounts.value
        
      
    };

    this.myForm.setValue({
      
        
          "userId":null,
        
      
        
          "identificationType":null,
        
      
        
          "identification":null,
        
      
        
          "name":null,
        
      
        
          "lastName":null,
        
      
        
          "country":null,
        
      
        
          "accounts":null
        
      
    });

    return this.serviceTechnical.addParticipant(this.participant)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
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
      $class: "org.isthmus.invoice.Technical",
      
        
          
        
    
        
          
            "identificationType":this.identificationType.value,
          
        
    
        
          
            "identification":this.identification.value,
          
        
    
        
          
            "name":this.name.value,
          
        
    
        
          
            "lastName":this.lastName.value,
          
        
    
        
          
            "country":this.country.value,
          
        
    
        
          
            "accounts":this.accounts.value
          
        
    
    };

    return this.serviceTechnical.updateParticipant(form.get("userId").value,this.participant)
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

    return this.serviceTechnical.deleteParticipant(this.currentId)
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

    return this.serviceTechnical.getparticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "userId":null,
          
        
          
            "identificationType":null,
          
        
          
            "identification":null,
          
        
          
            "name":null,
          
        
          
            "lastName":null,
          
        
          
            "country":null,
          
        
          
            "accounts":null 
          
        
      };



      
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
