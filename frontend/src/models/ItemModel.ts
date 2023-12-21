import { CategoryModel } from "./categoryModel";
import { DeliveryModel } from "./deliveryModel";
import { InvoiceModel } from "./invoiceModel";
import { OrderModel } from "./orderModel";
import { StorageModel } from "./storageModel";

export type ItemModel = {
	name: string;
	description: string;
	value: number;
	id: number;
	image: string;
	categories?: CategoryModel[];
	order: OrderModel;
	orderId: number;
	storage: StorageModel;
	storageId: number;
	delivery: DeliveryModel;
	deliveryId: number;
	invoice: InvoiceModel;
	invoiceId: number;
	amount: number;
	available: boolean;
};
