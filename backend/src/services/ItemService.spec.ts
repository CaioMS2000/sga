/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { CreateCategoryInput, CreateItemInput } from "../dto/inputs";
import { prisma } from "../lib/prisma";
import { ItemService as _ItemService } from "./ItemService";
import { UserRepository as _UserRepository } from "../repositories/UserRepository";
import { User as PrismaUser, Item as PrismaItem } from "@prisma/client";

const ItemService = new _ItemService();
const UserRepository = new _UserRepository();
let createdUser: PrismaUser;
let createdItem: PrismaItem;

test("Get all items", async () => {
	const res = await ItemService.getAllItems({ prisma });

	expect(res).toBeDefined();
	expect(res).toEqual([]);
});

test("Create item", async () => {
	const userWillBeCreated = {
		name: "Caio",
		email: "email@mail.com",
		password: "123",
	};

	createdUser = await UserRepository.createUser(userWillBeCreated, {
		prisma,
	});

	const categories: CreateCategoryInput[] = [
		{
			name: "Some category",
			description: "random category",
			code: "NON_CODE",
		},
	];

	const item: CreateItemInput = {
		categories,
		description: "random item",
		image: "#",
		invoice: {
			supplier: {
				cnpj: "random cnpj",
				name: "random supplier",
			},
		},
		name: "some item",
		value: Math.random(),
		storage: {
			userId: createdUser.id,
		},
	};

	const res = await ItemService.createItem(
		{
			item,
			includeInvoice: true,
			includeSupplier: true,
		},
		{ prisma }
	);

	createdItem = res;

	expect(res).toBeDefined();
	expect(res.invoice.supplier.cnpj).toBe(item.invoice.supplier.cnpj);
});

test("Get item by id", async () => {
	const res = await ItemService.getItemById(createdItem.id, { prisma });

	expect(res?.id).toEqual(createdItem.id);
});

test("Update item", async () => {
	const res = await ItemService.updateItem(
		{
			id: createdItem.id,
			name: "updated random item",
		},
		{ prisma }
	);

	expect(res?.id).toEqual(createdItem.id);
	expect(res?.name).toEqual("updated random item");

	createdItem = res;
});

test("Init order for an item", async () => {
	const itemWithOrder = await ItemService.initItemOrder({
		order: {
			itemId: createdItem.id,
			requesterId: createdUser.id,
		},
		context: {
			prisma,
		},
		props: {
			includeOrder: true,
		},
	});

	expect(itemWithOrder.orderId).toBeDefined();
	expect(itemWithOrder.order).toBeDefined();
});

test("Set delivery for an item", async () => {
	const itemWithOrder = await ItemService.setItemDelivery({
		delivery: {
			itemId: createdItem.id,
			userId: createdUser.id,
		},
		props: {
			includeDelivery: true,
		},
		context: { prisma },
	});

	expect(itemWithOrder.deliveryId).toBeDefined();
	expect(itemWithOrder.delivery).toBeDefined();
});

test("Delete item", async () => {
	const res = await ItemService.deleteItem(createdItem.id, { prisma });

	expect(res.storageId).toEqual(createdItem.storageId);
});
