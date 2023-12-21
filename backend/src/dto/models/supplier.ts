import { Field, ObjectType } from 'type-graphql';
import { Supplier as PrismaSupplier } from '@prisma/client';

import { BaseModel } from './baseModel';
import { Invoice } from '.';
import { Lot } from './lot';

@ObjectType()
export class Supplier extends BaseModel implements PrismaSupplier{

    @Field()
    name: string
    
    @Field()
    cnpj: string
    
    @Field({defaultValue: ''})
    email: string
    
    @Field({defaultValue: ''})
    phone: string

    @Field(() => [Lot])
    lots: Lot[]

}