import { Arg, Ctx, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { Department } from "../dto/models";
import { DepartmentService as _DepartmentService } from "../services/DepartmentService";
import { ServerContextData } from "../server";
import { CreateDepartmentInput } from "../dto/inputs";

@Resolver(() => Department)
export class DepartmentResolver{
    DepartmentService;

    constructor(){
        this.DepartmentService = new _DepartmentService();
    }

    @Query(() => [Department])
    async departments(@Ctx() context: ServerContextData){
        return await this.DepartmentService.getAllDepartments(context)
    }
    
    @Query(() => Department)
    async getDpartmentByCode(@Arg("code") code: string, @Ctx() context: ServerContextData){
        return await this.DepartmentService.getDpartmentByCode(code, context)
    }
    
    @Mutation(() => Department)
    async createDepartment(@Arg("data") data: CreateDepartmentInput, @Ctx() context: ServerContextData){
        return await this.DepartmentService.createDepartment(data.name, data.description, context)
    }
}