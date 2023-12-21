import { IsNumber } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class CreateDeliveryInput{

    @IsNumber()
    @Field()
    userId: number

    @IsNumber()
    @Field()
    itemId: number
}