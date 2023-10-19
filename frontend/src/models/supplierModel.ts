import { InvoiceModel } from "./invoiceModel";

export type SupplierModel = {
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    invoices: InvoiceModel[];
}