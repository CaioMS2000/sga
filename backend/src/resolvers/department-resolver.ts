import { Arg, Ctx, FieldResolver, Mutation, ObjectType, Query, Resolver, Root } from "type-graphql";
import { Department } from "../dto/models";
import { DepartmentService as _DepartmentService } from "../services/DepartmentService";
import { ServerContextData } from "../server";
import { CreateDepartmentInput } from "../dto/inputs";
import { GraphQLError } from "graphql";

@Resolver(() => Department)
export class DepartmentResolver {
    DepartmentService;

    constructor() {
        this.DepartmentService = new _DepartmentService();
    }

    @Query(() => [Department])
    async departments(@Ctx() context: ServerContextData) {
        return await this.DepartmentService.getAllDepartments(context)
    }

    @Query(() => Department)
    async getDpartmentByCode(@Arg("code") code: string, @Ctx() context: ServerContextData) {
        return await this.DepartmentService.getDpartmentByCode(code, context)
    }

    @Mutation(() => Department)
    async createDepartment(@Arg("data") data: CreateDepartmentInput, @Ctx() context: ServerContextData) {
        return await this.DepartmentService.createDepartment(data.name, data.description, context)
    }

    @FieldResolver(() => Number)
    async employees(@Root() department: Department, @Ctx() context: ServerContextData) {
        try {
            const { prisma } = context

            const users = await prisma.user.findMany({
                include:{
                    department: true
                }
            })

            const amount = users.reduce((accumulator, currentValue) => {
                let count = 0;

                for(const dep of currentValue.department){
                    if(dep.code == department.code) count++;
                }

                return count + accumulator;
            }, 0)

            return amount

        } catch (error) {
            throw new GraphQLError(error as string)
        }
    }
}