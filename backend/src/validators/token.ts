import { GraphQLError } from "graphql";
import { prisma } from "../lib/prisma";

interface validateTokenProps{
    accessToken: string
    refreshToken: string
}

async function validateToken({accessToken: _accessToken, refreshToken: _refreshToken}: validateTokenProps){

    try{
        const accessToken = await prisma.accessToken.findUniqueOrThrow({
            where: {
                token: _accessToken
            }
        })

        const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
            where: {
                token: _refreshToken
            }
        })

        const ATTime = new Date(accessToken.updatedAt).getTime() / 1000 // tempo em segundos
        const RTTime = new Date(refreshToken.updatedAt).getTime() / 1000 // tempo em segundos
        const now = new Date().getTime() / 1000 // tempo em segundos
    
        if(now - ATTime >= accessToken.expiresIn){
            return {isValid: false, invalidToken: 'accessToken'}
        }
    
        if(now - RTTime >= refreshToken.expiresIn){
            return {isValid: false, invalidToken: 'refreshToken'}
        }
    
        return {isValid: true, invalidToken: undefined}

    }catch(error){
        throw new GraphQLError(error as string)
    }

}

async function ValidateToken({accessToken, refreshToken}: validateTokenProps){
    
    try {
        const {isValid, invalidToken} = await validateToken({
            accessToken: accessToken,
            refreshToken: refreshToken
        })
        
        if(!isValid){
            // throw new GraphQLError(`${invalidToken} expired`)
            throw new Error(`${invalidToken} expired`)
        }
        
    } catch (error) {
        // throw new GraphQLError(error as string)
        throw new Error(error as string)
    }
}

export {ValidateToken, validateToken}