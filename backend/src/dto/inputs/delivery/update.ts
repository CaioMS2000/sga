import { Status } from "@prisma/client"
import { Field, InputType } from "type-graphql"
import { User } from "../../models"
import { IsOptional, IsString } from "class-validator"
import { CreateUserInput } from "../user/create"

@InputType()
export class UpdateDeliveryInput{
    @IsOptional()
    @Field(() => Status)
    status?: Status

    @IsString()
    @Field()
    code: string

    @IsOptional()
    @Field(() => CreateUserInput, {nullable: true})
    attender?: CreateUserInput
}