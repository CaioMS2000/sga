import { ServerContextData } from "../server";

export class OrderRepository{
    async getAllOrders(context: ServerContextData){
        const {prisma} = context
        const res = await prisma.order.findMany({
            include:{
                item: true,
                analysis: true,
                requester: true,
            }
        })
    
        return res;
    }

    async getOrderByCode(code: string, context: ServerContextData){
        const {prisma} = context
        const res = await prisma.order.findFirst({
            where: {
                code
            },
            include:{
                item: {
                    include:{
                        delivery: {
                            include:{
                                attender: true
                            }
                        },
                    }
                },
                analysis: true,
                requester: true,
            }
        })

        return res;
    }
}