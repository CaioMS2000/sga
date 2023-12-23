import { gql } from "graphql-request";

export const CREATE_CATEGORY = gql`
    mutation ($data: CreateCategoryInput!){
        createCategory(data: $data){
            name
            description
        }
    }
`