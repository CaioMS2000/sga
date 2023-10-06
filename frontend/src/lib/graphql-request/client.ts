import { GraphQLClient } from 'graphql-request'

const url = process.env.API_URL
export const graphqlClient = new GraphQLClient(url || 'http://localhost:4000/graphql')