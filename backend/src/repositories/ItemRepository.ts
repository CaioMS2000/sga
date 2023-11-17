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
	includeCategories?: boolean;
	includeInvoice?: boolean;
	includeStorage?: boolean;
	includeSupplier?: boolean;
}

export interface getItemProps {
	includeOrder?: boolean;
	includeDelivery?: boolean;
}

export class ItemRepository {
	async getAllItems(context: ServerContextData) {
		const { prisma } = context;
		const res = await prisma.item.findMany();
		return res;
	}

	async createItem(
		{
			item,
			includeCategories = false,
			includeInvoice = false,
			includeStorage = false,
			includeSupplier = false,
		}: createItemProps,
		context: ServerContextData
	) {
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

		const res = await prisma.item.create({
			data: {
				name: item.name,
				description: item.description,
				imagePath: item.imagePath,
				value: item.value,

				storage: {
					connect: {
						id: storage.id,
					},
				},

				categories: {
					connectOrCreate: item.categories.map(
						({ name, code, description }) => ({
							where: { code },
							create: {
								name,
								description,
								code: randomUUID(),
							},
						})
					),
				},

				invoice: {
					create: {
						code: randomUUID(),

						supplier: {
							connectOrCreate: {
								where: {
									cnpj: item.invoice.supplier.cnpj,
								},
								create: {
									name: item.invoice.supplier.name,
									email: item.invoice.supplier.email,
									phone: item.invoice.supplier.phone,
									cnpj: item.invoice.supplier.cnpj,
								},
							},
						},
					},
				},
			},
			include: {
				invoice: {
					include: {
						supplier: includeSupplier,
					},
				},
				categories: includeCategories,
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
					include:{
						attender: true
					}
				},
				invoice: {
					include:{
						supplier: true
					}
				},
				order: {
					include: {
						requester: true
					}
				},
				storage: true,
			},
		});

		console.log('#getItemById')
		console.log(res)

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

	// async initItemOrder(order: CreateOrderInput, {includeOrder= false}: getItemProps, context: ServerContextData){
	async initItemOrder({
		order,
		props,
		context,
	}: {
		order: CreateOrderInput;
		props?: getItemProps;
		context: ServerContextData;
	}) {
		const { prisma } = context;
		const { includeOrder = false } = props || { includeOrder: false };
		// const res = await prisma.item.update({
		// 	where: {
		// 		id: order.itemId,
		// 	},
		// 	data: {
		// 		available: false,
		// 		order: {
		// 			create: {
		// 				code: randomUUID(),
		// 				requester: {
		// 					connect: {
		// 						id: order.requesterId,
		// 					},
		// 				},
		// 			},
		// 		},
		// 	},
		// 	include: {
		// 		order: includeOrder,
		// 	},
		// });

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
						id: order.itemId
					}
				}
			},
			include: {
				requester: true,
				item: true,
			}
		})
		return res;
	}

	async setItemDelivery({
		delivery,
		context,
		props,
	}: {
		delivery: CreateDeliveryInput;
		context: ServerContextData;
		props?: getItemProps;
	}) {
		const { prisma } = context;
		const { includeDelivery = false, includeOrder = false } = props || { includeDelivery: false };
		console.log(delivery, includeDelivery, includeOrder)

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
				delivery: includeDelivery? {
					include: {
						attender: true
					}
				}:includeDelivery,
				order: includeOrder?{
					include: {
						requester: true,
						analysis: true,
					}
				}: includeOrder,
				categories: true,
				invoice: {
					include:{
						supplier: true
					}
				},
				storage: {
					include:{
						storekeeper: true
					}
				},
			},
		});

		return res;
	}
}
