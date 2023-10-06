import { Role } from "@prisma/client";
import { InputType, Field } from "type-graphql";
import { Requester } from "../../models/enum";
import { IsEnum, IsString, IsOptional } from "class-validator";

@InputType()
export class CreateUserInput {
  
  @IsOptional()
  @IsString()
  @Field({ defaultValue: "" })
  profileImagePath?: string;
  
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  departmentCode?: string;

  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  email: string;

  @IsString()
  @Field()
  password: string;

  @IsOptional()
  @IsEnum(Role, {each: true})
  @Field(() => [Role], { defaultValue: [Requester] })
  roles?: Role[];
}
