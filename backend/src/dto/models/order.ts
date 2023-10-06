import { Field, ObjectType } from 'type-graphql';
import { Order as PrismaOrder } from '@prisma/client';

import { BaseModel } from './baseModel';
import { User, Analysis, Item } from '.';

@ObjectType()
export class Order extends BaseModel implements PrismaOrder{

    @Field()
    code: string;

    @Field(() => User)
    requester: User;

    @Field()
    requesterId: number;

    @Field(() => Analysis, {nullable: true})
    analysis: Analysis;

    @Field(() => Item, {nullable: true})
    item: Item;
}