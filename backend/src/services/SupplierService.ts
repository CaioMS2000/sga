import { CreateSupplierInput } from "../dto/inputs";
import { SupplierRepository as _SupplierRepository} from "../repositories/SupplierRepository";
import { ServerContextData } from "../server";

export class SupplierService{
    SupplierRepository;

    constructor(){
        this.SupplierRepository = new _SupplierRepository()
    }

    async getAllSuppliers(context: ServerContextData){
        return await this.SupplierRepository.getAllSuppliers(context)
    }
    
    async createSupplier(supplier: CreateSupplierInput, context: ServerContextData){
        return await this.SupplierRepository.createSupplier(supplier, context)
    }
    
    async getSupplierByCNPJ(cnpj: string, context: ServerContextData){
        return await this.SupplierRepository.getSupplierByCNPJ(cnpj, context)
    }
}