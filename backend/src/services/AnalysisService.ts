import { AnalysisRepository as _AnalysisRepository, createAnalysisProps } from "../repositories/AnalysisRepository";
import { ServerContextData } from "../server";

export class AnalysisService{
    AnalysisRepository;

    constructor(){
        this.AnalysisRepository = new _AnalysisRepository()
    }

    async getAllAnalysiss(context: ServerContextData){
        return this.AnalysisRepository.getAllAnalysiss(context)
    }

    async createAnalysis(props: createAnalysisProps, context: ServerContextData){
        return this.AnalysisRepository.createAnalysis(props, context)
    }

    async getAnalysisById(id: number, context: ServerContextData){
        return this.AnalysisRepository.getAnalysisById(id, context)
    }

}