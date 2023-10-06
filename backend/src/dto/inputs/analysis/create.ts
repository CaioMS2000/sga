import { Field, InputType } from "type-graphql";
import { Order, User } from "../../models";
import { IsBoolean } from "class-validator";

@InputType()
export class CreateAnalysisInput {

	@IsBoolean()
    @Field()
	isApproved: boolean;

	@Field()
	analystId: number;

	@Field()
	orderId: number;
}
