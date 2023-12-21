import { gql } from "graphql-request";

export const GET_USERS = gql`
	query {
		users {
			name
			email
			password
			profileImage
			roles
			id
			department {
				name
				description
				code
				id
				createdAt
				updatedAt
			}
		}
	}
`;

export const GET_USERS_AMOUNT = gql`
	query {
		userAmount
	}
`;

export const RECOVER_USER_FROM_TOKEN = gql`
	query ($token: String!) {
		getUserByAccessToken(token: $token) {
			name
			email
			password
			profileImage
			roles
			id
			department {
				name
				description
				code
				id
				createdAt
				updatedAt
			}
		}
	}
`;

export const GET_USER_BY_ID = gql`
	query ($id: Float!) {
		getUserById(id: $id) {
			name
			email
			password
			profileImage
			roles
			id
			department {
				name
				description
				code
				id
				createdAt
				updatedAt
			}
		}
	}
`;
