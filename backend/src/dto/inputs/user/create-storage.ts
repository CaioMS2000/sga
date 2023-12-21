import { IsNumber } from "class-validator";
import { InputType, Field } from "type-graphql";
import { CreateItemInput } from "../item/create";

@InputType()
export class CreateStorageInput{

    @IsNumber()
    @Field()
    userId: number
}