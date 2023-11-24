import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export abstract class BaseModel{
    @Field()
    id: number;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}