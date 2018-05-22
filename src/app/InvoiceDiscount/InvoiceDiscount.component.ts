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
import { InvoiceDiscountService } from './InvoiceDiscount.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-InvoiceDiscount',
	templateUrl: './InvoiceDiscount.component.html',
	styleUrls: ['./InvoiceDiscount.component.css'],
  providers: [InvoiceDiscountService]
})
export class InvoiceDiscountComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          invoiceDescountId = new FormControl("", Validators.required);
        
  
      
          descountDate = new FormControl("", Validators.required);
        
  
      
          amount = new FormControl("", Validators.required);
        
  
      
          percentage = new FormControl("", Validators.required);
        
  
      
          commissionTechnical = new FormControl("", Validators.required);
        
  
      
          commissionFinancial = new FormControl("", Validators.required);
        
  
      
          status = new FormControl("", Validators.required);
        
  
      
          financial = new FormControl("", Validators.required);
        
  


  constructor(private serviceInvoiceDiscount:InvoiceDiscountService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          invoiceDescountId:this.invoiceDescountId,
        
    
        
          descountDate:this.descountDate,
        
    
        
          amount:this.amount,
        
    
        
          percentage:this.percentage,
        
    
        
          commissionTechnical:this.commissionTechnical,
        
    
        
          commissionFinancial:this.commissionFinancial,
        
    
        
          status:this.status,
        
    
        
          financial:this.financial
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceInvoiceDiscount.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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
   * @param {String} name - the name of the asset field to update
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
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.isthmus.invoice.InvoiceDiscount",
      
        
          "invoiceDescountId":this.invoiceDescountId.value,
        
      
        
          "descountDate":this.descountDate.value,
        
      
        
          "amount":this.amount.value,
        
      
        
          "percentage":this.percentage.value,
        
      
        
          "commissionTechnical":this.commissionTechnical.value,
        
      
        
          "commissionFinancial":this.commissionFinancial.value,
        
      
        
          "status":this.status.value,
        
      
        
          "financial":this.financial.value
        
      
    };

    this.myForm.setValue({
      
        
          "invoiceDescountId":null,
        
      
        
          "descountDate":null,
        
      
        
          "amount":null,
        
      
        
          "percentage":null,
        
      
        
          "commissionTechnical":null,
        
      
        
          "commissionFinancial":null,
        
      
        
          "status":null,
        
      
        
          "financial":null
        
      
    });

    return this.serviceInvoiceDiscount.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "invoiceDescountId":null,
        
      
        
          "descountDate":null,
        
      
        
          "amount":null,
        
      
        
          "percentage":null,
        
      
        
          "commissionTechnical":null,
        
      
        
          "commissionFinancial":null,
        
      
        
          "status":null,
        
      
        
          "financial":null 
        
      
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


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.isthmus.invoice.InvoiceDiscount",
      
        
          
        
    
        
          
            "descountDate":this.descountDate.value,
          
        
    
        
          
            "amount":this.amount.value,
          
        
    
        
          
            "percentage":this.percentage.value,
          
        
    
        
          
            "commissionTechnical":this.commissionTechnical.value,
          
        
    
        
          
            "commissionFinancial":this.commissionFinancial.value,
          
        
    
        
          
            "status":this.status.value,
          
        
    
        
          
            "financial":this.financial.value
          
        
    
    };

    return this.serviceInvoiceDiscount.updateAsset(form.get("invoiceDescountId").value,this.asset)
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


  deleteAsset(): Promise<any> {

    return this.serviceInvoiceDiscount.deleteAsset(this.currentId)
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

    return this.serviceInvoiceDiscount.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "invoiceDescountId":null,
          
        
          
            "descountDate":null,
          
        
          
            "amount":null,
          
        
          
            "percentage":null,
          
        
          
            "commissionTechnical":null,
          
        
          
            "commissionFinancial":null,
          
        
          
            "status":null,
          
        
          
            "financial":null 
          
        
      };



      
        if(result.invoiceDescountId){
          
            formObject.invoiceDescountId = result.invoiceDescountId;
          
        }else{
          formObject.invoiceDescountId = null;
        }
      
        if(result.descountDate){
          
            formObject.descountDate = result.descountDate;
          
        }else{
          formObject.descountDate = null;
        }
      
        if(result.amount){
          
            formObject.amount = result.amount;
          
        }else{
          formObject.amount = null;
        }
      
        if(result.percentage){
          
            formObject.percentage = result.percentage;
          
        }else{
          formObject.percentage = null;
        }
      
        if(result.commissionTechnical){
          
            formObject.commissionTechnical = result.commissionTechnical;
          
        }else{
          formObject.commissionTechnical = null;
        }
      
        if(result.commissionFinancial){
          
            formObject.commissionFinancial = result.commissionFinancial;
          
        }else{
          formObject.commissionFinancial = null;
        }
      
        if(result.status){
          
            formObject.status = result.status;
          
        }else{
          formObject.status = null;
        }
      
        if(result.financial){
          
            formObject.financial = result.financial;
          
        }else{
          formObject.financial = null;
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
      
        
          "invoiceDescountId":null,
        
      
        
          "descountDate":null,
        
      
        
          "amount":null,
        
      
        
          "percentage":null,
        
      
        
          "commissionTechnical":null,
        
      
        
          "commissionFinancial":null,
        
      
        
          "status":null,
        
      
        
          "financial":null 
        
      
      });
  }

}
