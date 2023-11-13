import { IsOptional, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateDepartmentInput{

    @IsString()
    @Field()
    name: string
    
    @IsOptional()
    @IsString()
    @Field({defaultValue: ''})
    description: string
}