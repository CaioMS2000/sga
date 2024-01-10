import { gql } from "graphql-request";

export const CREATE_DEPARTMENT = gql`
    mutation ($data: CreateDepartmentInput!){
        createDepartment(data: $data){
            code
            name
            description
            employees
            id
            createdAt
            updatedAt
        }
    }
`