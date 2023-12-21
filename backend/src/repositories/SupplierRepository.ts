import { CreateSupplierInput } from "../dto/inputs";
import { ServerContextData } from "../server";

export class SupplierRepository{
    async getAllSuppliers(context: ServerContextData) {
		const { prisma } = context;
		const res = await prisma.supplier.findMany();
		return res;
	}

    async createSupplier(supplier: CreateSupplierInput, context: ServerContextData){
        const { prisma } = context;
        const res = await prisma.supplier.create({
            data: {...supplier}
        })

        return res
    }

    async getSupplierByCNPJ(cnpj: string, context: ServerContextData){
        const { prisma } = context;
        const res = await prisma.supplier.findFirst({
            where:{cnpj}
        })

        return res
    }
}