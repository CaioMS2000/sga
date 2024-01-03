import { Field, InputType } from "type-graphql";
import { IsString, IsNumber } from "class-validator";
import { CreateSupplierInput } from "../supplier/create";

@InputType()
export class LotCreateInput{
    /**
     * Supplier's CNPJ
     */
    @Field(() => String)
    supplier: string

    @Field({defaultValue: 1})
    itemAmount: number

    @Field()
    price: number
}