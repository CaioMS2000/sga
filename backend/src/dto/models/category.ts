import { Field, ObjectType } from 'type-graphql';
import { Category as PrismaCategory } from '@prisma/client';

import { BaseModel } from './baseModel';
import { Item } from '.';

@ObjectType()
export class Category extends BaseModel implements PrismaCategory{

    @Field()
    code: string;
    
    @Field()
    name: string;
    
    @Field({defaultValue: ''})
    description: string;
    
    @Field(() => [Item])
    items: Item[];
}