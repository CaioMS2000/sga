import { Field, ObjectType } from 'type-graphql';
import { Lot as PrismaLot } from '@prisma/client';

import { BaseModel } from './baseModel';
import { Invoice } from './invoice';
import { Supplier } from './supplier';
import { Item } from './item';

@ObjectType()
export class Lot extends BaseModel implements PrismaLot{
    @Field(() => Item)
    item: Item

    @Field()
    itemAmount: number

    @Field()
    price: number
    
    @Field(() => Invoice)
    invoices: Invoice

    @Field()
    invoiceId: number

    @Field(() => Supplier)
    supplier: Supplier

    @Field()
    supplierId: number
}