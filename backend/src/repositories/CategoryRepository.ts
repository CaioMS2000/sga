import { randomUUID } from "node:crypto";
import { CreateCategoryInput } from "../dto/inputs";
import { ServerContextData } from "../server";

export class CategoryRepository{
    async getAllCategories(context: ServerContextData) {
        const {prisma} = context;
        const res = await prisma.category.findMany();
    
        return res;
    }

    async createCategory(category: CreateCategoryInput, context: ServerContextData) {
        const {prisma} = context;
        let code: string;

        if(!category.code || category.code == 'NON_CODE'){
            code = randomUUID()
        }
        else{
            code = category.code
        }

        const res = await prisma.category.create({
            data: {
                name: category.name,
                code,
                description: category.description,
            }
        })

        return res
    }

    async getCategory(code: string, context: ServerContextData) {
        const {prisma} = context;

        const res = await prisma.category.findFirst({
            where: {
                code
            }
        })

        return res
    }
}