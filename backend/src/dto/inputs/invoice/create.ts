import { Field, InputType } from "type-graphql";
import { CreateSupplierInput } from "..";

@InputType()
export class CreateInvoiceInput{

    @Field(() => CreateSupplierInput)
    supplier: CreateSupplierInput
}