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

export const UNLINK_USER_FROM_DEPARTMENT = gql`
    mutation($userId: Float!, $departmentCode: String!){
        unlinUserFromDepartment(userId: $userId, departmentCode: $departmentCode)
    }
`