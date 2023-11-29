import { UpdateDeliveryInput } from "../dto/inputs/delivery/update";
import { DeliveryRepository as _DeliveryRepository } from "../repositories/DeliveryRepository";
import { ServerContextData } from "../server";

export class DeliveryService{
    DeliveryRepository;

    constructor(){
        this.DeliveryRepository = new _DeliveryRepository()
    }

    async getAllDeliveries(context: ServerContextData){
        return this.DeliveryRepository.getAllDeliveries(context)
    }
    
    async updateDelivery(newDelivery: UpdateDeliveryInput, context: ServerContextData){
        return this.DeliveryRepository.updateDelivery(newDelivery, context)
    }
}