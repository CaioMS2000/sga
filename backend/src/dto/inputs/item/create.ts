import { Field, InputType } from "type-graphql";
import { IsString, IsNumber } from "class-validator";
import {
	CreateCategoryInput,
	CreateStorageInput,
} from "..";
import { LotCreateInput } from "../lot/create";

@InputType()
export class CreateItemInput {
	@IsString()
	@Field()
	name: string;

	@IsString()
	@Field({ defaultValue: "" })
	image: string;

	@IsString()
	@Field({ defaultValue: "" })
	description: string;

	@Field(() => CreateStorageInput)
	storage: CreateStorageInput;

	/**
	 * Code of category: String[]
	 */
	@Field(() => [String])
	categories: string[];

	@Field(() => LotCreateInput)
	lot: LotCreateInput;
}
