import { Role } from "@prisma/client";
import { InputType, Field } from "type-graphql";
import { IsString, IsOptional } from "class-validator";

@InputType()
export class SignInInput {

    @IsString()
    @Field()
    email: string;

    @IsString()
    @Field()
    password: string;
}
