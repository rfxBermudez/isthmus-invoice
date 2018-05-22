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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { InvoiceComponent } from './Invoice/Invoice.component';
import { InvoiceDiscountComponent } from './InvoiceDiscount/InvoiceDiscount.component';


  import { ClientAccountComponent } from './ClientAccount/ClientAccount.component';
  import { TechnicalComponent } from './Technical/Technical.component';
  import { FinancialComponent } from './Financial/Financial.component';
  import { IssuerComponent } from './Issuer/Issuer.component';
  import { DebtorComponent } from './Debtor/Debtor.component';


  import { AcceptDescountInvoiceComponent } from './AcceptDescountInvoice/AcceptDescountInvoice.component';
  import { ApproveDescountInvoiceComponent } from './ApproveDescountInvoice/ApproveDescountInvoice.component';
  import { DescountInvoiceComponent } from './DescountInvoice/DescountInvoice.component';
  import { CloseInvoiceComponent } from './CloseInvoice/CloseInvoice.component';  




const routes: Routes = [
     //{ path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'Invoice', component: InvoiceComponent},
    
		{ path: 'InvoiceDiscount', component: InvoiceDiscountComponent},
    
    
      { path: 'ClientAccount', component: ClientAccountComponent},
      
      { path: 'Technical', component: TechnicalComponent},
      
      { path: 'Financial', component: FinancialComponent},
      
      { path: 'Issuer', component: IssuerComponent},
      
      { path: 'Debtor', component: DebtorComponent},
      
      
        { path: 'AcceptDescountInvoice', component: AcceptDescountInvoiceComponent},
        
        { path: 'ApproveDescountInvoice', component: ApproveDescountInvoiceComponent},
        
        { path: 'DescountInvoice', component: DescountInvoiceComponent},
        
        { path: 'CloseInvoice', component: CloseInvoiceComponent},
        
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
