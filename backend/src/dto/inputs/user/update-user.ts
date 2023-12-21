import { Role } from "@prisma/client";
import { InputType, Field } from "type-graphql";
import { Requester } from "../../models/enum";
import { IsEnum, IsString, IsOptional, IsNotEmpty } from "class-validator";

@InputType()
export class UpdateUserInput {
	@Field()
	id: number;

	@IsOptional()
	@Field({ nullable: true })
	profileImage: string;

	@IsOptional()
	@IsString()
	@Field({ nullable: true })
	name?: string;

	@IsOptional()
	@IsString()
	@Field({ nullable: true })
	email?: string;

	@IsOptional()
	@IsString()
	@Field({ nullable: true })
	password?: string;

	@IsOptional()
	@IsEnum(Role, { each: true })
	@Field(() => [Role], { nullable: true })
	roles?: Role[];
}
