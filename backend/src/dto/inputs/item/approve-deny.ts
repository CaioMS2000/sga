import { IsNumber } from "class-validator";
import { Field, InputType } from "type-graphql";
import { Analysis } from "../../models";

@InputType()
export class  ApproveOrDenyInput{

    @IsNumber()
    @Field()
    id: number

    @Field(() => Analysis)
    analysis: Analysis;
}