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
		}
	}
`;
