import { CreateAnalysisInput } from "../dto/inputs/analysis/create";
import { ServerContextData } from "../server";

export interface createAnalysisProps{
    analysis: CreateAnalysisInput,
}

export interface getAnalysisProps{
}

export class AnalysisRepository{
    async getAllAnalysiss(context: ServerContextData){
        const {prisma} = context;
        const res = await prisma.analysis.findMany()

        return res;
    }

    async createAnalysis({analysis}: createAnalysisProps, context: ServerContextData){
        const {prisma} = context;

        const newAnalysis = await prisma.analysis.create({
            data: {
                isApproved: analysis.isApproved,
                analyst: {
                    connect: {
                        id: analysis.analystId
                    }
                },
                order: {
                    connect: {
                        id: analysis.orderId
                    }
                }
            },
            include: {
                analyst: true,
                // order: true
                order: {
                    include: {
                        requester: true,
                        item: true
                    }
                }
            }
        })

        return newAnalysis;
    }

    async getAnalysisById(id: number, context: ServerContextData){
        const {prisma} = context;
        const res = prisma.analysis.findFirst({
            where: {
                id
            }
        })

        return res
    }

}