import { Field, ObjectType } from "type-graphql";
import { Role, User as PrismaUser } from "@prisma/client";

import { Analysis, Delivery, Department, Order, Record, Storage } from ".";
import { BaseModel } from "./baseModel";
import { Requester } from "./enum";

@ObjectType()
export class User extends BaseModel implements PrismaUser {
	@Field({ defaultValue: true })
	isActive: boolean;

	@Field({ defaultValue: false })
	isDeleted: boolean;

	@Field({ defaultValue: "" })
	profileImage: string;

	@Field()
	name: string;

	@Field()
	email: string;

	@Field()
	password: string;

	@Field(() => [Role], { defaultValue: [Requester] })
	roles: Role[];

	@Field(() => [Order], { nullable: true })
	orders: Order[];

	@Field(() => [Analysis], { nullable: true })
	analysis: Analysis[];

	@Field(() => [Storage], { nullable: true })
	storage: Storage[];

	@Field(() => [Delivery], { nullable: true })
	delivery: Delivery[];

	@Field(() => [Department], { nullable: true })
	department: Department[];

	@Field(() => [Record], { nullable: true })
	records: Record[];
}
