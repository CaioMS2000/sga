import { InvoiceModel } from "./invoiceModel"
import { SupplierModel } from "./supplierModel";

export type LotModel = {
    Invoice: InvoiceModel;
    supplier: SupplierModel;
    itemAmount: number;
    price: number;
}