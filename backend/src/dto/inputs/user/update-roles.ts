import { Role } from "@prisma/client";
import { InputType, Field } from "type-graphql";
import { Requester } from "../../models/enum";
import { IsEnum, IsNumber } from "class-validator";

@InputType()
export class UpdateUserRoleInput {
  
  @IsNumber()
  @Field()
  id: number;

  @IsEnum(Role, {each: true})
  @Field(() => [Role], { defaultValue: [Requester] })
  roles: Role[];
}
