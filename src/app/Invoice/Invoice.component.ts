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
import { InvoiceService } from './Invoice.service';
import { InvoiceDiscountService } from '../InvoiceDiscount/InvoiceDiscount.service';
import { DebtorService } from '../Debtor/Debtor.service';
import { IssuerService } from '../Issuer/Issuer.service';
import { FinancialService } from '../Financial/Financial.service';



import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Invoice',
	templateUrl: './Invoice.component.html',
	styleUrls: ['./Invoice.component.css'],
  providers: [InvoiceService,InvoiceDiscountService,DebtorService,IssuerService,FinancialService]
})
export class InvoiceComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          invoiceId = new FormControl("", Validators.required);
        
  
      
          invoiceNumber = new FormControl("", Validators.required);
        
  
      
          issueDate = new FormControl("", Validators.required);
        
  
      
          expirationDate = new FormControl("", Validators.required);
        
  
      
          currency = new FormControl("", Validators.required);
        
  
      
          amount = new FormControl("", Validators.required);
        
  
      
          status = new FormControl("", Validators.required);
        
  
      
          debtor = new FormControl("", Validators.required);
        
  
      
          issuer = new FormControl("", Validators.required);
        
  
      
          financial = new FormControl("", Validators.required);
        
  
      
          discounts = new FormControl("", Validators.required);
        
  


  constructor(private serviceInvoice:InvoiceService, fb: FormBuilder, private serviceInvoiceDiscount: InvoiceDiscountService, private serviceDebtor : DebtorService, private serviceIssuer : IssuerService, private serviceFinancial : FinancialService) {
    this.myForm = fb.group({
    
        
          invoiceId:this.invoiceId,
        
    
        
          invoiceNumber:this.invoiceNumber,
        
    
        
          issueDate:this.issueDate,
        
    
        
          expirationDate:this.expirationDate,
        
    
        
          currency:this.currency,
        
    
        
          amount:this.amount,
        
    
        
          status:this.status,
        
    
        
          debtor:this.debtor,
        
    
        
          issuer:this.issuer,
        
    
        
          financial:this.financial,
        
    
        
          discounts:this.discounts
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    let tempList = [];
    this.serviceInvoice.getAll()
    .toPromise()
    .then((result) => {
      console.log(result);
			this.errorMessage = null;
      result.forEach(asset => {
        console.log(asset.debtor);
        // Se carga el deudor
        this.serviceDebtor.getparticipant(asset.debtor.split("#")[1])
        .toPromise()
        .then((resultDebtor) => {
          asset.debtor = resultDebtor;
        });
        // Se carga el emisor
        this.serviceIssuer.getparticipant(asset.issuer.split("#")[1])
        .toPromise()
        .then((resultIssuer) => {
          asset.issuer = resultIssuer;
        });
        // Se carga la financiera
        if (asset.financial !== undefined) {
          this.serviceFinancial.getparticipant(asset.financial.split("#")[1])
           .toPromise()
           .then((resultFinancial) => {
              asset.financial = resultFinancial;
          });
        }
        // Se cargan los descuentos de facturas        
        let tempListDiscount = [];
        if (asset.discounts !== undefined) {
          asset.discounts.forEach(assetDiscount => {
            console.log(assetDiscount);
          this.serviceInvoiceDiscount.getAsset(assetDiscount.split("#")[1])
          .toPromise()
          .then((resultDiscount) => {
            this.serviceFinancial.getparticipant(resultDiscount.financial.split("#")[1])
             .toPromise()
             .then((resultFinancial1) => {
                resultDiscount.financial = resultFinancial1;
              });
             tempListDiscount.push(resultDiscount);
            })
          })
        }
       
        asset.discounts = tempListDiscount;
        tempList.push(asset);
      });
      this.allAssets = tempList;
      console.log(this.allAssets);
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
      $class: "org.isthmus.invoice.Invoice",
      
        
          "invoiceId":this.invoiceId.value,
        
      
        
          "invoiceNumber":this.invoiceNumber.value,
        
      
        
          "issueDate":this.issueDate.value,
        
      
        
          "expirationDate":this.expirationDate.value,
        
      
        
          "currency":this.currency.value,
        
      
        
          "amount":this.amount.value,
        
      
        
          "status":this.status.value,
        
      
        
          "debtor":this.debtor.value,
        
      
        
          "issuer":this.issuer.value,
        
      
        
          "financial":this.financial.value,
        
      
        
          "discounts":this.discounts.value
        
      
    };

    this.myForm.setValue({
      
        
          "invoiceId":null,
        
      
        
          "invoiceNumber":null,
        
      
        
          "issueDate":null,
        
      
        
          "expirationDate":null,
        
      
        
          "currency":null,
        
      
        
          "amount":null,
        
      
        
          "status":null,
        
      
        
          "debtor":null,
        
      
        
          "issuer":null,
        
      
        
          "financial":null,
        
      
        
          "discounts":null
        
      
    });

    return this.serviceInvoice.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "invoiceId":null,
        
      
        
          "invoiceNumber":null,
        
      
        
          "issueDate":null,
        
      
        
          "expirationDate":null,
        
      
        
          "currency":null,
        
      
        
          "amount":null,
        
      
        
          "status":null,
        
      
        
          "debtor":null,
        
      
        
          "issuer":null,
        
      
        
          "financial":null,
        
      
        
          "discounts":null 
        
      
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
      $class: "org.isthmus.invoice.Invoice",
      
        
          
        
    
        
          
            "invoiceNumber":this.invoiceNumber.value,
          
        
    
        
          
            "issueDate":this.issueDate.value,
          
        
    
        
          
            "expirationDate":this.expirationDate.value,
          
        
    
        
          
            "currency":this.currency.value,
          
        
    
        
          
            "amount":this.amount.value,
          
        
    
        
          
            "status":this.status.value,
          
        
    
        
          
            "debtor":this.debtor.value,
          
        
    
        
          
            "issuer":this.issuer.value,
          
        
    
        
          
            "financial":this.financial.value,
          
        
    
        
          
            "discounts":this.discounts.value
          
        
    
    };

    return this.serviceInvoice.updateAsset(form.get("invoiceId").value,this.asset)
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

    return this.serviceInvoice.deleteAsset(this.currentId)
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

    return this.serviceInvoice.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "invoiceId":null,
          
        
          
            "invoiceNumber":null,
          
        
          
            "issueDate":null,
          
        
          
            "expirationDate":null,
          
        
          
            "currency":null,
          
        
          
            "amount":null,
          
        
          
            "status":null,
          
        
          
            "debtor":null,
          
        
          
            "issuer":null,
          
        
          
            "financial":null,
          
        
          
            "discounts":null 
          
        
      };



      
        if(result.invoiceId){
          
            formObject.invoiceId = result.invoiceId;
          
        }else{
          formObject.invoiceId = null;
        }
      
        if(result.invoiceNumber){
          
            formObject.invoiceNumber = result.invoiceNumber;
          
        }else{
          formObject.invoiceNumber = null;
        }
      
        if(result.issueDate){
          
            formObject.issueDate = result.issueDate;
          
        }else{
          formObject.issueDate = null;
        }
      
        if(result.expirationDate){
          
            formObject.expirationDate = result.expirationDate;
          
        }else{
          formObject.expirationDate = null;
        }
      
        if(result.currency){
          
            formObject.currency = result.currency;
          
        }else{
          formObject.currency = null;
        }
      
        if(result.amount){
          
            formObject.amount = result.amount;
          
        }else{
          formObject.amount = null;
        }
      
        if(result.status){
          
            formObject.status = result.status;
          
        }else{
          formObject.status = null;
        }
      
        if(result.debtor){
          
            formObject.debtor = result.debtor;
          
        }else{
          formObject.debtor = null;
        }
      
        if(result.issuer){
          
            formObject.issuer = result.issuer;
          
        }else{
          formObject.issuer = null;
        }
      
        if(result.financial){
          
            formObject.financial = result.financial;
          
        }else{
          formObject.financial = null;
        }
      
        if(result.discounts){
          
            formObject.discounts = result.discounts;
          
        }else{
          formObject.discounts = null;
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
      
        
          "invoiceId":null,
        
      
        
          "invoiceNumber":null,
        
      
        
          "issueDate":null,
        
      
        
          "expirationDate":null,
        
      
        
          "currency":null,
        
      
        
          "amount":null,
        
      
        
          "status":null,
        
      
        
          "debtor":null,
        
      
        
          "issuer":null,
        
      
        
          "financial":null,
        
      
        
          "discounts":null 
        
      
      });
  }

}
