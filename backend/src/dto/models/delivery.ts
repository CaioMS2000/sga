import { Field, ObjectType } from 'type-graphql';
import { Delivery as PrismaDelivery } from '@prisma/client';

import { BaseModel } from './baseModel';
import { Status } from '@prisma/client';
import { Waiting } from './enum';
import { Item, User } from '.';

@ObjectType()
export class Delivery extends BaseModel implements PrismaDelivery{

    @Field()
    code: string

    @Field(() => Status, {defaultValue: Waiting})
    status: Status

    @Field(() => User)
    attender: User

    @Field()
    attenderId: number
    
    @Field(() => Item, {nullable: true})
    item: Item
}