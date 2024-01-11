import { ServerContextData } from "../server";

export class DepartmentRepository {
	async getAllDepartments(context: ServerContextData) {
		const { prisma } = context;
		const res = await prisma.department.findMany({
            include: {
                users: true
            }
        });

		return res;
	}

	async getDpartmentByCode(code: string, context: ServerContextData) {
		const { prisma } = context;
		const res = await prisma.department.findFirst({
			where: {
				code,
			},
		});

		return res;
	}

	async createDepartment(name: string, description: string,  context: ServerContextData){
		const { prisma } = context;
		const res = await prisma.department.create({data: {
			name,
			description
		}})

		return res
	}
}
