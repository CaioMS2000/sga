import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class BaseModel{
    @Field()
    id: number;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}