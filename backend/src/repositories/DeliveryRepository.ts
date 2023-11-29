import { UpdateDeliveryInput } from "../dto/inputs/delivery/update";
import { ServerContextData } from "../server";

export class DeliveryRepository{
    async getAllDeliveries(context: ServerContextData) {
		const { prisma } = context;
		const res = await prisma.delivery.findMany({
            include:{
                attender: true,
                item: true
            }
        });
		return res;
	}

    async updateDelivery(newDelivery: UpdateDeliveryInput, context: ServerContextData){
        const { prisma } = context;
        const content: Record<string, any> = {}

        if(newDelivery.attender) content['attender'] = newDelivery.attender;
        if(newDelivery.status) content['status'] = newDelivery.status;
        
        const res = await prisma.delivery.update({
            where:{
                code: newDelivery.code,
            },
            data:{
                ...content
            },
            include:{
                attender: true,
                item: true
            }
        })

        return res;
    }
}