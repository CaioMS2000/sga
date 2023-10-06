import { Field, ObjectType } from 'type-graphql';
import { Storage as PrismaStorage } from '@prisma/client';

import { BaseModel } from './baseModel';
import { Item, User } from '.';

@ObjectType()
export class Storage extends BaseModel implements PrismaStorage{

    @Field()
    code: string
    
    @Field(() => User)
    storekeeper: User
    
    @Field()
    storekeeperId: number
    
    @Field(() => Item)
    item: Item
}