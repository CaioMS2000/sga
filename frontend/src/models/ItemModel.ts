import { CategoryModel } from "./categoryModel";
import { DeliveryModel } from "./deliveryModel";
import { InvoiceModel } from "./invoiceModel";
import { LotModel } from "./lotModel";
import { OrderModel } from "./orderModel";
import { StorageModel } from "./storageModel";

export type ItemModel = {
	name: string;
	description: string;
	id: number;
	image: string;
	categories?: CategoryModel[];
	order: OrderModel;
	orderId: number;
	storage: StorageModel;
	storageId: number;
	delivery: DeliveryModel;
	deliveryId: number;
	available: boolean;
	lot: LotModel;
};
