import { IsOptional, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCategoryInput{

    @IsOptional()
    @IsString()
    @Field({defaultValue: 'NON_CODE'})
    code?: string

    @IsString()
    @Field()
    name: string

    @IsString()
    @Field()
    description: string
}