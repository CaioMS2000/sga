import { IsNumber } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateOrderInput{

    @IsNumber()
    @Field()
    requesterId: number
    
    @IsNumber()
    @Field()
    itemId: number
}