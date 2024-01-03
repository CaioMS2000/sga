import { randomUUID } from "node:crypto";

// import { prisma } from '../lib/prisma';
import {
	BasicChangeItemInput,
	CreateDeliveryInput,
	CreateItemInput,
	CreateOrderInput,
} from "../dto/inputs";
import { Waiting } from "../dto/models/enum";
import { ServerContextData } from "../server";

export interface createItemProps {
	item: CreateItemInput;
}

export class ItemRepository {
	async getAllItems(context: ServerContextData) {
		const { prisma } = context;
		const res = await prisma.item.findMany();
		return res;
	}

	async createItem({ item }: createItemProps, context: ServerContextData) {
		const { prisma } = context;
		const storage = await prisma.storage.create({
			data: {
				code: randomUUID(),
				storekeeper: {
					connect: {
						id: item.storage.userId,
					},
				},
			},
		});

		const lot = await prisma.lot.create({
			data: {
				supplier: {
					connect: {
						cnpj: item.lot.supplier,
					},
				},
				itemAmount: item.lot.itemAmount,
				price: item.lot.price,
				Invoice: { create: {} },
			},
		});

		const res = await prisma.item.create({
			data: {
				name: item.name,
				description: item.description,
				image: item.image,

				storage: {
					connect: {
						id: storage.id,
					},
				},

				categories: {
					connect: item.categories.map( cat => ({code: cat}))
				},

				lot: {
					connect: {
						id: lot.id
					},
				},
			},
			include: {
				lot: {
					include: {
						supplier: true,
					},
				},
				categories: true,
			},
		});

		return res;
	}

	async getItemById(id: number, context: ServerContextData) {
		const { prisma } = context;
		const res = await prisma.item.findFirst({
			where: { id: id },
			include: {
				categories: true,
				delivery: {
					include: {
						attender: true,
					},
				},
				lot: {
					include: {
						supplier: true,
						Invoice: true,
					},
				},
				order: {
					include: {
						requester: true,
					},
				},
				storage: true,
			},
		});

		// console.log(res)

		return res;
	}

	async deleteItem(id: number, context: ServerContextData) {
		const { prisma } = context;
		const res = await prisma.item.delete({ where: { id: id } });

		return res;
	}

	async updateItem(item: BasicChangeItemInput, context: ServerContextData) {
		const { prisma } = context;
		const res = await prisma.item.update({
			where: {
				id: item.id,
			},
			data: { ...item },
		});

		return res;
	}

	async initItemOrder({
		order,
		context,
	}: {
		order: CreateOrderInput;
		context: ServerContextData;
	}) {
		const { prisma } = context;

		const res = await prisma.order.create({
			data: {
				code: randomUUID(),
				requester: {
					connect: {
						id: order.requesterId,
					},
				},
				item: {
					connect: {
						id: order.itemId,
					},
				},
			},
			include: {
				requester: true,
				item: true,
			},
		});
		return res;
	}

	async setItemDelivery({
		delivery,
		context,
	}: {
		delivery: CreateDeliveryInput;
		context: ServerContextData;
	}) {
		const { prisma } = context;

		const res = await prisma.item.update({
			where: {
				id: delivery.itemId,
			},
			data: {
				delivery: {
					create: {
						code: randomUUID(),
						attender: {
							connect: {
								id: delivery.userId,
							},
						},
					},
				},
			},
			include: {
				delivery: {
					include: {
						attender: true,
					},
				},
				order: {
					include: {
						requester: true,
						analysis: true,
					},
				},
				categories: true,
				lot: {
					include: {
						supplier: true,
					},
				},
				storage: {
					include: {
						storekeeper: true,
					},
				},
			},
		});

		return res;
	}
}
