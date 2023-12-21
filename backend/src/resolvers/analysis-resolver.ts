import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { createAnalysisProps } from "../repositories/AnalysisRepository";
import { ServerContextData } from "../server";
import { AnalysisService as _AnalysisService } from "../services/AnalysisService";
import { Analysis, Order, User } from "../dto/models";
import { CreateAnalysisInput } from "../dto/inputs/analysis/create";
import { GraphQLError } from "graphql";

@Resolver(() => Analysis)
export class AnalysisResolver{
    AnalysisService;

    constructor(){
        this.AnalysisService = new _AnalysisService()
    }

    @Query(() => [Analysis])
    async analysis(@Ctx() context: ServerContextData){
        return this.AnalysisService.getAllAnalysiss(context)
    }

    @Query(() => Analysis)
    async getAnalysisById(@Arg("id") id: number, @Ctx() context: ServerContextData){
        return this.AnalysisService.getAnalysisById(id, context)
    }

    @Mutation(() => Analysis)
    async createAnalysis(@Arg("data") data: CreateAnalysisInput, @Ctx() context: ServerContextData){
        return this.AnalysisService.createAnalysis({analysis: data}, context)
    }

    @FieldResolver(() => User)
    async analyst(@Root() analysis: Analysis, @Ctx() context: ServerContextData){
        try {
            const {prisma} = context;

            const user = await prisma.user.findFirst({
                where: {
                    id: analysis.analystId
                }
            })

            if(!user){
                throw new Error(`Analyst with id ${analysis.analystId}`);
            }

            return user;
        } catch (error) {
            throw new GraphQLError(error as string)
        }
    }

    @FieldResolver(() => Order)
    async order(@Root() analysis: Analysis, @Ctx() context: ServerContextData){
        try {
            const {prisma} = context;

            const _order = await prisma.order.findFirst({
                where: {
                    id: analysis.orderId
                },
                include: {
                    requester: true,
                    item: true
                }
            })

            return _order
        } catch (error) {
            throw new GraphQLError(error as string)
        }
    }
}
