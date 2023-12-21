import { Field, ObjectType } from 'type-graphql';
import { Invoice as PrismaInvoice } from '@prisma/client';

import { BaseModel } from './baseModel';
import { Item, Supplier } from '.';

@ObjectType()
export class Invoice extends BaseModel implements PrismaInvoice{

    @Field()
    code: string
    
    @Field(() => Item)
    item: Item
    
    @Field(() => Supplier)
    supplier: Supplier
    
    @Field()
    supplierId: number
}