import { InputType, Field } from "type-graphql";
import { IsNumber, ArrayNotEmpty } from "class-validator";
import { CreateOrderInput } from "..";

@InputType()
export class UpdateUserOrderInput {
  
  @IsNumber()
  @Field()
  userId: number;

  @ArrayNotEmpty()
  @Field(() => [CreateOrderInput])
  orders: CreateOrderInput[]
}