import { gql } from "graphql-request";

export const CREATE_CATEGORY = gql`
    mutation ($data: CreateCategoryInput!){
        createCategory(data: $data){
            name
            description
        }
    }
`

export const UPDATE_CATEGORY = gql`
    mutation ($data:UpdateCategoryInput!){
        editCategory(data: $data){
            id
            code
            name
            description
        }
    }
`