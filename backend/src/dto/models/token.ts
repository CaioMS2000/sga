import { Field, ObjectType } from 'type-graphql';
import { AccessToken, RefreshToken } from '@prisma/client';

import { User } from '.';
import { BaseModel } from './baseModel';
import { IsNumber, IsString } from 'class-validator';

@ObjectType()
export class Token extends BaseModel implements AccessToken{

    @Field()
    userId: number

    @IsString()
    @Field()
    token: string;

    @IsNumber()
    @Field()
    expiresIn: number;

}