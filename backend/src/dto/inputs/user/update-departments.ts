import { IsNumber, IsString } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateDepartmentsInput{

    @IsNumber()
    @Field()
    userId: number

    @IsString()
    @Field()
    departmetCode: string
}