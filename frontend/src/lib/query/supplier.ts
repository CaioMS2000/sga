import { gql } from "graphql-request";

export const GET_ALL_SUPPLIERS = gql`
    query{
        getAllSuppliers{
            name
            cnpj
            email
            phone
            lots{
                itemAmount
                price
            }
        }
    }
`