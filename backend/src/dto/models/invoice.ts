import { Field, ObjectType } from 'type-graphql';
import { Invoice as PrismaInvoice } from '@prisma/client';

import { BaseModel } from './baseModel';
import { Item, Supplier } from '.';
import { Lot } from './lot';

@ObjectType()
export class Invoice extends BaseModel implements PrismaInvoice{

    @Field()
    code: string
    
    @Field(() => [Lot])
    lots: Lot[]
}