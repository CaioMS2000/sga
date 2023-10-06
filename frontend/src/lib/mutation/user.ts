import { gql } from "graphql-request";

export const LOGIN = gql`
	mutation ($data: SignInInput!) {
		login(data: $data) {
			user {
				name
				email
				password
				profileImagePath
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
			accessToken {
				token
				expiresIn
			}
			refreshToken {
				token
				expiresIn
			}
		}
	}
`;

export const CREATE_USER = gql`
	mutation ($data: CreateUserInput!) {
		createUser(data: $data) {
			id
			name
			email
			password
			roles
		}
	}
`;
