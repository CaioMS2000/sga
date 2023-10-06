import { IsOptional } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateSupplierInput{

    @Field()
    name: string
    
    @Field()
    cnpj: string
    
    @IsOptional()
    @Field({defaultValue: ''})
    email?: string
    
    @IsOptional()
    @Field({defaultValue: ''})
    phone?: string
}