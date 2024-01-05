import { Field, ObjectType } from 'type-graphql';
import { Department as PrismaDepartment } from '@prisma/client';

import { BaseModel } from './baseModel';
import { User } from '.';

@ObjectType()
export class Department extends BaseModel implements PrismaDepartment{
    @Field()
    code: string;

    @Field()
    name: string;

    @Field({defaultValue: ''})
    description: string;
}