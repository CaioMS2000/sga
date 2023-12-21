import { gql } from "graphql-request";

export const CREATE_SUPPLIER = gql`
    mutation($supplier: CreateSupplierInput!){
        createSupplier(supplier: $supplier){
            name
            cnpj
            email
            phone
        }
    }
`