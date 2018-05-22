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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { TransactionComponent } from './Transaction/Transaction.component'

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

@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    // TransactionComponent,
    InvoiceComponent,
    
    InvoiceDiscountComponent
    ,

    ClientAccountComponent,
      TechnicalComponent,
      FinancialComponent,
      IssuerComponent,
      
      DebtorComponent
      ,

    AcceptDescountInvoiceComponent,
        ApproveDescountInvoiceComponent,
        DescountInvoiceComponent,
        CloseInvoiceComponent
        
       
        
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
