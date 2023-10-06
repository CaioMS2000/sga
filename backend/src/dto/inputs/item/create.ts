import { Field, InputType } from "type-graphql";
import { IsString, IsNumber } from 'class-validator';
import { CreateCategoryInput, CreateInvoiceInput, CreateStorageInput } from "..";

@InputType()
export class CreateItemInput{

    @IsString()
    @Field()
    name: string
    
    @IsString()
    @Field({defaultValue: ''})
    imagePath: string
    
    @IsString()
    @Field({defaultValue: ''})
    description: string
    
    @IsNumber()
    @Field()
    value: number

    @Field(() => CreateStorageInput)
    storage: CreateStorageInput
    
    @Field(() => [CreateCategoryInput])
    categories: CreateCategoryInput[]
    
    @Field(() => CreateInvoiceInput)
    invoice: CreateInvoiceInput
}