import { IsNumber } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class CreateRecordInput{

    @IsNumber()
    @Field()
    userId: number
}