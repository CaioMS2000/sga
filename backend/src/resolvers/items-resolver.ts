import {
  Query,
  Resolver,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  Ctx,
} from "type-graphql";
import { Analysis as PrismaAnalysis, Order as PrismaOrder } from '@prisma/client';

import {
  Item,
  User,
  Storage,
  Category,
  Invoice,
  Order,
  Delivery,
} from "../dto/models";
import { prisma } from "../lib/prisma";
import { BasicChangeItemInput, CreateDeliveryInput, CreateItemInput, CreateOrderInput } from "../dto/inputs";
import { ItemService as _ItemService } from '../services/ItemService';
import { ServerContextData } from "../server";
import { GraphQLError } from "graphql";

@Resolver(() => Item)
export class ItemResolver {

  ItemService;
  
  constructor(){
    this.ItemService = new _ItemService()
  }

  @Query(() => [Item])
  async items(@Ctx() context: ServerContextData) {
    const res = await this.ItemService.getAllItems(context);

    return res;
  }
  
  @Query(() => Item)
  async getItemById(@Arg("id") id: number, @Ctx() context: ServerContextData) {
    const res = await this.ItemService.getItemById(id, context);

    return res;
  }

  @Query(() => Number)
  async itemAmount(@Ctx() context: ServerContextData) {
    const res = await context.prisma.item.count()
    return res
  }

  @Mutation(() => Item)
  async createItem(@Arg("data") data: CreateItemInput, @Ctx() context: ServerContextData) {
    const res = await this.ItemService.createItem({item: data}, context);
    return res;
  }

  @Mutation(() => Item)
  async deleteItem(@Arg("id") id: number, @Ctx() context: ServerContextData) {
    const res = await this.ItemService.deleteItem(id, context);
    
    return res;
  }

  @Mutation(() => Item)
  async updateItem(@Arg("data") data: BasicChangeItemInput, @Ctx() context: ServerContextData) {
    const res = await this.ItemService.updateItem(data, context);
    
    return res;
  }

  @Mutation(() => Order)
  async initItemOrder(@Arg("data") data: CreateOrderInput, @Ctx() context: ServerContextData) {
    try {
      const {prisma} = context
      const res = await this.ItemService.initItemOrder({order: data, context, props: {includeOrder: true}});

      // const order: PrismaOrder|null = await prisma.order.findFirst({
      //   where: {
      //     item: {
      //       id: res.id
      //     }
      //   }
      // })

      // const analysis: PrismaAnalysis|null = await prisma.analysis.findFirst({
      //   where: {
      //     orderId: order?.id
      //   }
      // })
      
      return res;
    } catch (error) {
      console.log(error)
    }
  }

  @Mutation(() => Item)
  async setItemDelivery(@Arg("data") data: CreateDeliveryInput, @Ctx() context: ServerContextData) {
    const res = await this.ItemService.setItemDelivery({delivery: data, context});
    
    return res;
  }

  @FieldResolver(() => Order)
  async order(@Root() item: Item, @Ctx() context: ServerContextData) {
    if(!item.order) return null;
    try{
      const {prisma} = context
      const order = await prisma.order.findUnique({
        where: { id: item.order.id },
        include: {
          requester: true,
        }
      });
  
      if (!order) {
        throw new Error(`Order with id ${item.order.id} not found`);
      }
  
      return order;

    }catch(error){
      throw new GraphQLError(error as string)
    }
  }

  @FieldResolver(() => Storage)
  async storage(@Root() item: Item, @Ctx() context: ServerContextData) {
    try{
      const {prisma} = context
      const storage = await prisma.storage.findUnique({
        where: { id: item.storage.id },
        include: {
          storekeeper: true
        }
      });
  
      if (!storage) {
        throw new Error(`Storage with id ${item.storage.id} not found`);
      }
  
      return storage;

    }catch(error){
      throw new GraphQLError(error as string)
    }
  }

  @FieldResolver(() => Delivery)
  async delivery(@Root() item: Item, @Ctx() context: ServerContextData) {
    if(!item.delivery) return null;
    try {
      const {prisma} = context
      const delivery = await prisma.delivery.findUnique({
        where: { id: item.delivery.id },
      });
      console.log(delivery)
  
      if (!delivery) {
        throw new Error(`Delivery with id ${item.delivery.id} not found`);
      }
  
      return delivery;
      
    } catch (error) {
      throw new GraphQLError(error as string)
    }
  }

  @FieldResolver(() => Category)
  async category(@Root() item: Item, @Ctx() context: ServerContextData) {
    try{
      const {prisma} = context
      const category = await prisma.item
        .findUnique({ where: { id: item.id } })
        .categories();
  
      return category;

    }catch(error){
      throw new GraphQLError(error as string)
    }
  }

  @FieldResolver(() => Invoice)
  async invoice(@Root() item: Item, @Ctx() context: ServerContextData) {
    try{
      const {prisma} = context
      const invoice = await prisma.invoice.findUnique({
        where: { id: item.invoice.id },
        include: {
          supplier: true
        }
      });
  
      if (!invoice) {
        throw new Error(`Invoice with id ${item.invoice.id} not found`);
      }
  
      return invoice;

    }catch(error){
      throw new GraphQLError(error as string)
    }
  }
}