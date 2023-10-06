import { Arg, Ctx, ObjectType, Query, Resolver } from "type-graphql";
import { Department } from "../dto/models";
import { DepartmentService as _DepartmentService } from "../services/DepartmentService";
import { ServerContextData } from "../server";

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
}