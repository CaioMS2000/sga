import { BasicChangeItemInput, CreateDeliveryInput, CreateItemInput, CreateOrderInput } from '../dto/inputs';
import { ItemRepository as _ItemRepository, createItemProps, getItemProps } from '../repositories/ItemRepository';
import { ServerContextData } from '../server';

export class ItemService {
    ItemRepository;

    constructor(){
        this.ItemRepository = new _ItemRepository()
    }

    async getAllItems(context: ServerContextData){
        return this.ItemRepository.getAllItems(context)
    }

    async createItem({item, includeCategories = false, includeInvoice = false, includeStorage = false, includeSupplier = false}: createItemProps, context: ServerContextData){
        return this.ItemRepository.createItem({
            item,
            includeCategories,
            includeInvoice,
            includeStorage,
            includeSupplier,
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

    async initItemOrder({order, props, context}:{order: CreateOrderInput, props?: getItemProps, context: ServerContextData}){
        return this.ItemRepository.initItemOrder({
            order,
            context,
            props
        })
    }

    async setItemDelivery({delivery, context, props}:{delivery: CreateDeliveryInput, context: ServerContextData, props?: getItemProps}){
        return this.ItemRepository.setItemDelivery({
            delivery,
            context,
            props
        })
    }

}