import { Field, ObjectType } from 'type-graphql';
import { Item as PrismaItem } from '@prisma/client';

import { BaseModel } from './baseModel';
import { Category, Delivery, Invoice, Order, Storage } from '.';

@ObjectType()
export class Item extends BaseModel implements PrismaItem{


    @Field()
    name: string
    
    @Field({defaultValue: ''})
    imagePath: string
    
    @Field({defaultValue: ''})
    description: string
    
    @Field()
    value: number
    
    @Field(() => Order, {nullable: true})
    order: Order
    
    @Field()
    orderId: number
    
    @Field(() => Storage)
    storage: Storage
    
    @Field()
    storageId: number
    
    @Field(() => Delivery, {nullable: true})
    delivery: Delivery
    
    @Field()
    deliveryId: number
    
    @Field(() => [Category], {defaultValue: []})
    categories: Category[]
    
    @Field(() => Invoice)
    invoice: Invoice
    
    @Field()
    invoiceId: number
    
    @Field()
    amount: number
    
    @Field()
    available: boolean
}