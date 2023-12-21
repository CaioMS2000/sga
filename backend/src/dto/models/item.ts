import { Field, ObjectType } from "type-graphql";
import { Item as PrismaItem } from "@prisma/client";

import { BaseModel } from "./baseModel";
import { Category, Delivery, Order, Storage } from ".";
import { Lot } from "./lot";

@ObjectType()
export class Item extends BaseModel implements PrismaItem {
	@Field()
	name: string;

	@Field({ defaultValue: "" })
	image: string;

	@Field({ defaultValue: "" })
	description: string;

	@Field()
	value: number;

	@Field(() => Order, { nullable: true })
	order: Order;

	@Field()
	orderId: number;

	@Field(() => Storage)
	storage: Storage;

	@Field()
	storageId: number;

	@Field(() => Delivery, { nullable: true })
	delivery: Delivery;

	@Field()
	deliveryId: number;

	@Field(() => [Category], { defaultValue: [] })
	categories: Category[];

	@Field(() => Lot)
	lot: Lot;

	@Field()
	lotId: number;

	@Field()
	amount: number;

	@Field()
	available: boolean;
}
