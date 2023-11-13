import { DepartmentRepository as _DepartmentRepository } from "../repositories/DepartmentRepository";
import { ServerContextData } from "../server";

export class DepartmentService{
    DepartmentRepository;

    constructor(){
        this.DepartmentRepository = new _DepartmentRepository();
    }

    async getAllDepartments(context: ServerContextData) {
		return await this.DepartmentRepository.getAllDepartments(context);
	}

	async getDpartmentByCode(code: string, context: ServerContextData) {
		return await this.DepartmentRepository.getDpartmentByCode(code, context);
	}

    async createDepartment(name: string, description: string,  context: ServerContextData){
        return await this.DepartmentRepository.createDepartment(name, description, context)
    }
}