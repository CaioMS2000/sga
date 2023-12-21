import { Field, InputType } from "type-graphql";
import { IsString, IsNumber, IsOptional } from "class-validator";

@InputType()
export class BasicChangeItemInput {
	@IsNumber()
	@Field()
	id: number;

	@IsOptional()
	@IsString()
	@Field()
	name?: string;

	@IsOptional()
	@IsString()
	@Field({ defaultValue: "" })
	image?: string;

	@IsOptional()
	@IsString()
	@Field({ defaultValue: "" })
	description?: string;

	@IsOptional()
	@IsNumber()
	@Field()
	value?: number;
}
