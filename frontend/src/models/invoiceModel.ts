import { ItemModel } from "./ItemModel";
import { SupplierModel } from "./supplierModel";

export type InvoiceModel = {
    code: string;
    item: ItemModel;
    supplier: SupplierModel;
    supplierId: number;
}