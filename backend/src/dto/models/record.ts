import { Field, ObjectType } from 'type-graphql';
import { Record as PrismaRecord } from '@prisma/client';

import { BaseModel } from './baseModel';
import { User } from '.';

@ObjectType()
export class Record extends BaseModel implements PrismaRecord{
    
    @Field()
    code: string
    
    @Field(() => User)
    auditor: User
    
    @Field()
    auditorId: number
}