import {
  Query,
  Resolver,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  Ctx,
  ObjectType,
  Field,
} from "type-graphql";

import { Analysis, Delivery, Department as _Department, Order, Record, Storage, Token, User } from "../dto/models";
import { UserInSession as _UserInSession, UserService as _UserService, SessionData as _SessionData} from "../services/UserService";
import { CreateUserInput } from "../dto/inputs";
import { UpdateUserInput } from "../dto/inputs/user/update-user";
import { NonEmptyInput } from "../validators/NonEmptyInput";
import { ServerContextData } from "../server";
import { AccessToken as _AccessToken, PrismaClient, RefreshToken as _RefreshToken, Role, Department as PrismaDepartment } from "@prisma/client";
import { SignInInput } from "../dto/inputs/user/sign-in";
import { GraphQLError } from "graphql";
import { print } from "../utils";

@ObjectType()
class AccessToken implements _AccessToken{
  @Field()
  createdAt: Date;
  
  @Field()
  expiresIn: number;
  
  @Field()
  id: number;
  
  @Field()
  token: string;
  
  @Field()
  updatedAt: Date;
  
  @Field()
  userId: number;
  
}

@ObjectType()
class RefreshToken implements _RefreshToken{
  @Field()
  createdAt: Date;
  
  @Field()
  expiresIn: number;
  
  @Field()
  id: number;
  
  @Field()
  token: string;
  
  @Field()
  updatedAt: Date;
  
  @Field()
  userId: number;
  
}

@ObjectType()
class UserInSession implements _UserInSession{
  
  @Field()
  id: number;
  
  @Field()
  name: string;
  
  @Field()
  email: string;
  
  @Field()
  password: string;

  @Field()
  profileImagePath: string;
  
  @Field(() => [Role])
  roles: Role[]
  
  @Field(() => [_Department])
  department: _Department[]
}

@ObjectType()
class SessionData implements _SessionData{
  
  @Field(() => AccessToken)
  accessToken: AccessToken;
  
  @Field(() => RefreshToken)
  refreshToken: RefreshToken;
  
  @Field(() => UserInSession)
  user: UserInSession;
}

@Resolver(() => User)
export class UserResolver {
  UserService;

  constructor(){
    this.UserService = new _UserService();
  }
  
  @Query(() => [User])
  async users(@Ctx() context: ServerContextData) {
    const res = await this.UserService.getAllUsers(context);

    return res;
  }
  
  @Query(() => User)
  async getUserById(@Arg("id") id: number, @Ctx() context: ServerContextData) {
    const res = await this.UserService.getUserById({id}, context);

    return res;
  }
  
  @Query(() => User)
  async getUserByAccessToken(@Arg("token") token: string, @Ctx() context: ServerContextData) {
    print(`recovering from token ${token}`)
    const res = await this.UserService.getUserByAccessToken({accessToken: token}, context);

    return res;
  }

  @Query(() => Number)
  async userAmount(@Ctx() context: ServerContextData){
    const {prisma} = context
    const amount = await prisma.user.count()

    return amount
  }
  
  @Mutation(() => SessionData)
  async login(@Arg("data") data: SignInInput, @Ctx() context: ServerContextData) {
    try {
      const res = await this.UserService.login(data, context);

      return res;

    } catch (error) {
      throw error
    }
  }

  @Mutation(() => User)
  async createUser(@Arg("data") data: CreateUserInput, @Ctx() context: ServerContextData) {
    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
      roles: data.roles,
      profileImagePath: data.profileImagePath,
      departmentCode: data.departmentCode
    };

    const res = await this.UserService.createUser(user, context);

    return res;
  }
  
  @Mutation(() => User)
  async updateUser(@Arg("data") data: UpdateUserInput, @Ctx() context: ServerContextData){

    NonEmptyInput<UpdateUserInput>(data)
    const res = await this.UserService.updateUser(data, context);

    return res;
  }

  @Mutation(() => User)
  async deleteUser(@Arg("id") id: number, @Ctx() context: ServerContextData) {
    const res = await this.UserService.deleteUser(id, context);

    return res;
  }
  
  @FieldResolver(() => [Order])
  async requestedOrder(@Root() user: User, @Ctx() context: ServerContextData) {
    const {prisma} = context
    const requestedOrder = await prisma.order.findMany({
      where: {
        requesterId: user.id
      }
    });

    if (!requestedOrder) {
      throw new Error(`Requests requested by user not found`);
    }
    
    return requestedOrder;
  }

  @FieldResolver(() => [Analysis])
  async analysis(@Root() user: User, @Ctx() context: ServerContextData) {
    const {prisma} = context
    const analysis = await prisma.analysis.findMany({
      where: {
        analystId: user.id
      }
    });
    
    if (!analysis) {
      throw new Error(`Analysis made by user not found`);
    }
    
    return analysis;
  }

  @FieldResolver(() => [Storage])
  async storage(@Root() user: User, @Ctx() context: ServerContextData) {
    const {prisma} = context
    const storage = await prisma.storage.findMany({
      where: {
        storekeeperId: user.id
      }
    });

    if (!storage) {
      throw new Error(`Storages made by user not found`);
    }

    return storage;
  }

  @FieldResolver(() => [Delivery])
  async delivery(@Root() user: User, @Ctx() context: ServerContextData) {
    const {prisma} = context
    const delivery = await prisma.delivery.findMany({
      where: {
        attenderId: user.id
      }
    });

    if (!delivery) {
      throw new Error(`Deliveries made by user not found`);
    }

    return delivery;
  }

  @FieldResolver(() => [_Department])
  async department(@Root() user: User, @Ctx() context: ServerContextData) {
    const {prisma} = context
    const department = await prisma.department.findMany({
      where: {
        users: {
          some: {
            id: user.id
          }
        }
      }
    });

    if (!department) {
      throw new Error(`User's departments not found`);
    }

    return department;
  }

  @FieldResolver(() => [Record])
  async record(@Root() user: User, @Ctx() context: ServerContextData) {
    const {prisma} = context
    const record = await prisma.record.findMany({
      where: {
        auditorId: user.id
      }
    });

    if (!record) {
      throw new Error(`User's records not found`);
    }

    return record;
  }

  @FieldResolver(() => Token)
  async accessToken(@Root() user: User, @Ctx() context: ServerContextData){
    const {prisma} = context
    const accessToken = await prisma.accessToken.findFirst({
      where: {
        user: {
          id: user.id
        }
      }
    })

    if(!accessToken){
      throw new Error('accessToken not found')
    }

    return accessToken
  }

  @FieldResolver(() => Token)
  async refreshToken(@Root() user: User, @Ctx() context: ServerContextData){
    const {prisma} = context
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        user: {
          id: user.id
        }
      }
    })

    if(!refreshToken){
      throw new Error('refreshToken not found')
    }

    return refreshToken
  }
}