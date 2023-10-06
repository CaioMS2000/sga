import { hashSync } from 'bcryptjs';
import { randomUUID } from "node:crypto";

import { CreateUserInput } from "../dto/inputs";
import { UpdateUserInput } from "../dto/inputs/user/update-user";
import { ServerContextData } from "../server";
import { User } from "../dto/models";
import { User as PrismaUser, Prisma} from "@prisma/client";

export interface GetUserProps{
  includeAccessToken?: boolean
  includeRefreshToken?: boolean
  id?: number
  email?: string
  accessToken?: string
}

Prisma.Prisma__UserClient

interface IUsersRepository {
  getAllUsers(context: ServerContextData): Promise<PrismaUser[]>;
  createUser(user: CreateUserInput, context: ServerContextData): Promise<PrismaUser>;
  getUserById(props: GetUserProps, context: ServerContextData): Promise<PrismaUser | null>;
  updateUser(user: Partial<User>, context: ServerContextData): Promise<PrismaUser>;
  deleteUser(id: number, context: ServerContextData): Promise<PrismaUser>;
}

export class UserRepository implements IUsersRepository {

  async getAllUsers(context: ServerContextData) {
    const {prisma} = context;
    const res = await prisma.user.findMany();

    return res;
  }

  async createUser(user: CreateUserInput, context: ServerContextData) {
    const {prisma} = context;

    const createOptoins = {
      data: {
        ...user,
        password: hashSync(user.password),
        department: user.departmentCode? {
          connect:{
            code: user.departmentCode
          }
        }: undefined,
      },
      include: {
        accessToken: true,
        refreshToken: true
      }
    }

    if(!user.departmentCode){
      delete createOptoins.data.department
    }

    const res = await prisma.user.create({...createOptoins});

    return res;
  }

  async getUserById({id, includeAccessToken= false, includeRefreshToken= false}: GetUserProps, context: ServerContextData) {
    const {prisma} = context;
    const res = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        accessToken: true,
        refreshToken: true
      }
    });

    return res;
  }

  async getUserByEmail({email, includeAccessToken= false, includeRefreshToken= false}: GetUserProps, context: ServerContextData) {
    const {prisma} = context;
    const res = await prisma.user.findUnique({
      where: {
        email,
      },
      include:{
        department: true
      }
    });

    return res;
  }

  async updateUser(user: UpdateUserInput, context: ServerContextData) {
    const {prisma} = context;
    const res = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...user,
      },
    });

    return res;
  }

  async deleteUser(id: number, context: ServerContextData) {
    const {prisma} = context;
    const res = await prisma.user.delete({
      where: {
        id,
      },
    });

    return res;
  }

  async deactivateUser(id: number, context: ServerContextData) {
    const {prisma} = context;
    const res = await prisma.user.update({
      where: {
        id,
      },
      data: {
        isActive: false
      }
    });

    return res;
  }

  async createAccessToken(id: number, context: ServerContextData){
    const {prisma} = context;

    const token = await prisma.accessToken.findFirst({
      where: {
        userId: id
      }
    })
    
    if(token){
      const aux = await prisma.accessToken.delete({
        where: {
          userId: id,
        }
      })
    }

    const res = await prisma.accessToken.create({
      data:{
        user: {
          connect: {
            id
          }
        },
        token: randomUUID(),
      }
    })

    return res
  }

  async createRefreshToken(id: number, context: ServerContextData){
    const {prisma} = context;

    const token = await prisma.refreshToken.findFirst({
      where: {
        userId: id
      }
    })
    
    if(token){
      const aux = await prisma.refreshToken.delete({
        where: {
          userId: id,
        }
      })
    }

    const res = await prisma.refreshToken.create({
      data:{
        user: {
          connect: {
            id
          }
        },
        token: randomUUID(),
      }
    })

    return res
  }
}
