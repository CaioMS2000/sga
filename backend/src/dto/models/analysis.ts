import { Field, ObjectType } from "type-graphql";
import { Analysis as PrismaAnalysis } from '@prisma/client';

import { BaseModel } from "./baseModel";
import { User, Order } from ".";

@ObjectType()
export class Analysis extends BaseModel implements PrismaAnalysis{
    
    @Field()
    isApproved: boolean;

    @Field(() => User)
    analyst: User;

    @Field()
    analystId: number;

    @Field(() => Order)
    order: Order;

    @Field()
    orderId: number;

}