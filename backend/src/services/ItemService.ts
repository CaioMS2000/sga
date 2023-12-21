import { BasicChangeItemInput, CreateDeliveryInput, CreateItemInput, CreateOrderInput } from '../dto/inputs';
import { ItemRepository as _ItemRepository, createItemProps } from '../repositories/ItemRepository';
import { ServerContextData } from '../server';

export class ItemService {
    ItemRepository;

    constructor(){
        this.ItemRepository = new _ItemRepository()
    }

    async getAllItems(context: ServerContextData){
        
        return this.ItemRepository.getAllItems(context)
    }

    async createItem({item}: createItemProps, context: ServerContextData){
        return this.ItemRepository.createItem({
            item,
        }, context)
    }

    async getItemById(id: number, context: ServerContextData){
        return this.ItemRepository.getItemById(id, context)
    }

    async deleteItem(id: number, context: ServerContextData){
        return this.ItemRepository.deleteItem(id, context)
    }

    async updateItem(item: BasicChangeItemInput, context: ServerContextData){
        return this.ItemRepository.updateItem(item, context)
    }

    async initItemOrder({order, context}:{order: CreateOrderInput, context: ServerContextData}){
        return this.ItemRepository.initItemOrder({
            order,
            context,
        })
    }

    async setItemDelivery({delivery, context}:{delivery: CreateDeliveryInput, context: ServerContextData}){
        return this.ItemRepository.setItemDelivery({
            delivery,
            context,
        })
    }

}