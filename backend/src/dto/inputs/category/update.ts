import { IsOptional, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateCategoryInput{

    @IsString()
    @Field()
    code: string
    
    @IsOptional()
    @IsString()
    @Field()
    name?: string
    
    @IsOptional()
    @IsString()
    @Field()
    description?: string
}