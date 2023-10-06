import { IsOptional, IsString } from "class-validator";
import { Field } from "type-graphql";

export class CreateDepartmentInput{

    @IsString()
    @Field()
    name: string
    
    @IsOptional()
    @IsString()
    @Field({defaultValue: ''})
    description: string
}