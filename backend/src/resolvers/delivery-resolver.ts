import {
	Arg,
	Ctx,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root,
} from "type-graphql";
import { Delivery, Item, User } from "../dto/models";
import { DeliveryService as _DeliveryService } from "../services/DeliveryService";
import { ServerContextData } from "../server";
import { UpdateDeliveryInput } from "../dto/inputs/delivery/update";

@Resolver(() => Delivery)
export class DeliveryResolver {
	DeliveryService;

	constructor() {
		this.DeliveryService = new _DeliveryService();
	}

	@Query(() => [Delivery])
	async deliveries(@Ctx() context: ServerContextData) {
		return this.DeliveryService.getAllDeliveries(context);
	}

	@Mutation(() => Delivery)
	async updateDelivery(
		@Arg("data") newDelivery: UpdateDeliveryInput,
		@Ctx() context: ServerContextData
	) {
		return this.DeliveryService.updateDelivery(newDelivery, context);
	}

	@FieldResolver(() => User)
	async attender(
		@Root() delivery: Delivery,
		@Ctx() context: ServerContextData
	) {
		const { prisma } = context;

		const res = await prisma.user.findFirst({
			where: { id: delivery.attenderId ?? delivery.attender.id },
		});

		return res;
	}

	@FieldResolver(() => Item)
	async item(@Root() delivery: Delivery, @Ctx() context: ServerContextData) {
		const { prisma } = context;

		return delivery.item;
	}
}
