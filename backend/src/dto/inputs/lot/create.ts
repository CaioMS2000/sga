import { Field, InputType } from "type-graphql";
import { IsString, IsNumber } from "class-validator";
import { CreateSupplierInput } from "../supplier/create";

@InputType()
export class LotCreateInput{
    @Field(() => CreateSupplierInput)
    supplier: CreateSupplierInput

    @Field({defaultValue: 1})
    itemAmount: number

    @Field()
    price: number
}