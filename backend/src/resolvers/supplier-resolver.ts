import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { SupplierService as _SupplierService } from "../services/SupplierService";
import { Supplier } from "../dto/models";
import { ServerContextData } from "../server";
import { CreateSupplierInput } from "../dto/inputs";
import { Lot } from "../dto/models/lot";

@Resolver(() => Supplier)
export class SupplierResolver{
    SupplierService;

    constructor(){
        this.SupplierService = new _SupplierService()
    }

    @Query(() => [Supplier])
    async getAllSuppliers(@Ctx() context: ServerContextData){
        return this.SupplierService.getAllSuppliers(context)
    }
    
    @Query(() => Supplier)
    async getSupplierByCNPJ(@Arg('cnpj') cnpj: string, @Ctx() context: ServerContextData){
        return this.SupplierService.getSupplierByCNPJ(cnpj, context)
    }
    
    @Mutation(() => Supplier)
    async createSupplier(@Arg('supplier') supplier: CreateSupplierInput, @Ctx() context: ServerContextData){
        return this.SupplierService.createSupplier(supplier, context)
    }

    @FieldResolver(() => [Lot])
    async lots(@Root() supplier: Supplier, @Ctx() context: ServerContextData){
        const {prisma} = context
        const res = await prisma.lot.findMany({
            where:{
                supplierId: supplier.id
            }
        })

        return res
    }
    
}