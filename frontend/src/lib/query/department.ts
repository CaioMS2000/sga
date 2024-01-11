import { gql } from "graphql-request";

export const GET_DEPARTMENTS = gql`
	query GetAllDepartments {
		departments {
			code
			name
			description
			id
			createdAt
			updatedAt
			employees
			users{
				name
				email
			}
		}
	}
`;

export const GET_DEPARTMENT_BY_CODE = gql`
	query ($code: String!){
		getDpartmentByCode(code: $code) {
			code
			name
			description
			id
			createdAt
			updatedAt
			employees
			users{
				name
				email
			}
		}
	}
`;
