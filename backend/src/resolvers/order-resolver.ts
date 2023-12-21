import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";

import { Item, Order } from "../dto/models";
import { OrderService as _OrderService } from "../services/OrderService";
import { ServerContextData } from "../server";
import { GraphQLError } from "graphql";

@Resolver(() => Order)
export class OrderResolver {
  OrderService;

  constructor() {
    this.OrderService = new _OrderService();
  }

  @Query(() => Order)
  async getOrderByCode(@Arg("code") code: string, @Ctx() context: ServerContextData) {
    const res = await this.OrderService.getOrderByCode(code, context);

    return res;
  }

  @Query(() => [Order])
  async orders(@Ctx() context: ServerContextData) {
    const res = await this.OrderService.getAllOrders(context);

    return res;
  }

  @FieldResolver(() => Item)
  async item(@Root() order: Order, @Ctx() context: ServerContextData){
    try{
      const {prisma} = context
      const item = await prisma.item.findUnique({
        where: { id: order.item.id },
        include:{
          delivery:{
            include:{
              attender: true,
            }
          }
        }
      });

      if (!item) {
        throw new Error(`Item with id ${order.item.id} not found`);
      }
  
      return item;

    }catch(error){
      throw new GraphQLError(error as string)
    }
  }
}
