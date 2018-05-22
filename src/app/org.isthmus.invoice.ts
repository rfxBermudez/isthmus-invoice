import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.isthmus.invoice{
   export enum Currency {
      CRC,
      USD,
   }
   export enum InvoiceStatus {
      READY,
      FINANCING,
      PROCESSED,
   }
   export enum InvoiceDiscountStatus {
      INSERTED,
      PROCESSED,
      CANCELED,
   }
   export enum IdentificationType {
      JURIDICAL,
      PHYSICAL,
   }
   export class Invoice extends Asset {
      invoiceId: string;
      invoiceNumber: string;
      issueDate: Date;
      expirationDate: Date;
      currency: Currency;
      amount: number;
      status: InvoiceStatus;
      debtor: any;
      issuer: any;
      financial: any;
      discounts: any[];
   }
   export class InvoiceDiscount extends Asset {
      invoiceDescountId: string;
      descountDate: Date;
      amount: number;
      percentage: number;
      commissionTechnical: number;
      commissionFinancial: number;
      status: InvoiceDiscountStatus;
      financial: any;
   }
   export class ClientAccount extends Participant {
      clientAccountId: string;
      currency: Currency;
      clientAccount: string;
   }
   export abstract class User extends Participant {
      userId: string;
      identificationType: IdentificationType;
      identification: string;
      name: string;
      lastName: string;
      country: string;
      accounts: ClientAccount[];
   }
   export class Technical extends User {
   }
   export class Financial extends User {
      percentageCommission: number;
   }
   export class Issuer extends User {
   }
   export class Debtor extends User {
      daysRemains: number;
      mensualTax: number;
      minimumTax: number;
   }
   export class AcceptDescountInvoice extends Transaction {
      invoice: Invoice;
      debtor: Debtor;
   }
   export class ApproveDescountInvoice extends Transaction {
      invoice: Invoice;
      invoiceDiscount: InvoiceDiscount;
      technical: Technical;
   }
   export class DescountInvoice extends Transaction {
      invoice: Invoice;
      financial: Financial;
   }
   export class CloseInvoice extends Transaction {
      technical: Technical;
      invoice: Invoice;
   }
// }
