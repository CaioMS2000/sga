import { ServerContextData } from "../server";

export class DepartmentRepository {
	async getAllDepartments(context: ServerContextData) {
		const { prisma } = context;
		const res = await prisma.department.findMany();

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
}
