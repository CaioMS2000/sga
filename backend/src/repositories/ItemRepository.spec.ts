/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { User as PrismaUser, Item as PrismaItem } from "@prisma/client";

import { CreateCategoryInput, CreateItemInput } from "../dto/inputs";
import { prisma } from "../lib/prisma";
import { ItemRepository as _ItemRepository } from "./ItemRepository";
import { UserRepository as __UserRepository } from "./UserRepository";

const UserRepository = new __UserRepository();
const ItemRepository = new _ItemRepository();
let createdUser: PrismaUser;
let createdItem: PrismaItem;

test("Get all items", async () => {
	const res = await ItemRepository.getAllItems({ prisma });

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

	const res = await ItemRepository.createItem(
		{
			item,
			includeCategories: true,
			includeInvoice: true,
			includeSupplier: true,
		},
		{ prisma }
	);

	const invoice = await prisma.invoice.findFirst({
		where: {
			id: res.invoice.id,
		},
	});

	const supplier = await prisma.supplier.findFirst({
		where: {
			id: invoice?.supplierId,
		},
	});

	expect(res.invoice.supplier.cnpj).toEqual(item.invoice.supplier.cnpj);

	expect(res.categories.length).toEqual(item.categories.length);
	expect(supplier?.cnpj).toEqual(item.invoice.supplier.cnpj);
	expect(res.name).toEqual(item.name);

	createdItem = res;
});

test("Get item by id", async () => {
	const res = await ItemRepository.getItemById(createdItem.id, { prisma });

	expect(res?.id).toEqual(createdItem.id);
});

test("Update item", async () => {
	const res = await ItemRepository.updateItem(
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
	const itemWithOrder = await ItemRepository.initItemOrder({
		order: {
			itemId: createdItem.id,
			requesterId: createdUser.id,
		},
		props: {
			includeOrder: true,
		},
		context: { prisma },
	});

	expect(itemWithOrder.orderId).toBeDefined();
	expect(itemWithOrder.order).toBeDefined();
});

test("Set delivery for an item", async () => {
	const itemWithOrder = await ItemRepository.setItemDelivery({
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
	const res = await ItemRepository.deleteItem(createdItem.id, { prisma });

	expect(res.storageId).toEqual(createdItem.storageId);
});

// test('', async () => {})
