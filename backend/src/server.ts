import 'reflect-metadata'
import { createYoga } from 'graphql-yoga'
import express from 'express';
// import cors from 'cors';
import { buildSchema, registerEnumType } from 'type-graphql';
import path from 'node:path';
import { PrismaClient, Role , Status } from '@prisma/client';

import { UserResolver } from './resolvers/users-resolver';
import { ItemResolver } from './resolvers/items-resolver';
import { OrderResolver } from './resolvers/order-resolver';
import { prisma } from './lib/prisma';
import { print } from './utils';
import { AnalysisResolver } from './resolvers/analysis-resolver';
import { DepartmentResolver } from './resolvers/department-resolver';
import { CategoryResolver } from './resolvers/categories-resolver';
import { DeliveryResolver } from './resolvers/delivery-resolver';

export type ServerContextData = {
    prisma: PrismaClient,
    accessToken?: string,
    refreshToken?: string,
}

async function main() {
    registerEnumType(Role, {
        name: 'Role'
    })
    registerEnumType(Status, {
        name: 'Status'
    })

    const schema = await buildSchema({
        resolvers: [
            ItemResolver,
            UserResolver,
            OrderResolver,
            AnalysisResolver,
            DepartmentResolver,
            CategoryResolver,
            DeliveryResolver,
        ],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql')
    })

    const yoga = createYoga({
        schema,
        context: async ({ request }) => {
            const accessToken = request.headers.get('authorization')
            const refreshToken = request.headers.get('refreshtoken')

            const data: ServerContextData = {
                prisma,
            }

            if(accessToken){
                data['accessToken'] = accessToken.split(' ')[1]
            }
            
            if(refreshToken){
                data['refreshToken'] = refreshToken.split(' ')[1]
            }

            return data
        },
    })

    const server = express()

    // server.use(cors())
    server.use(express.json())
    // server.use('/graphql', yoga)
    server.use(yoga)

    server.listen(4000)
    print('Server is running on http://localhost:4000')
    print('Playground on http://localhost:4000/graphql')
    
    // server.listen(4000, '0.0.0.0', () => {
    //     print('Server is running on http://0.0.0.0:4000')
    //     print('Playground on http://0.0.0.0:4000/graphql')
    // })
}

main()

// query GetAllDeliveries{
//     deliveries{
//       id
//       code
//       status
//       attender{
//           name
//           email
//           password
//           profileImagePath
//           roles
//           id
//       }
//       item{
//           id
//           name
//           description
//           value
//           imagePath
//       }
//     }
//   }