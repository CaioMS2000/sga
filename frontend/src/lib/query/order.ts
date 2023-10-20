import { gql } from "graphql-request";

export const GET_ORDER = gql`
	query ($code: String!) {
		getOrderByCode(code: $code) {
			id
			code
			createdAt
			updatedAt
			requesterId
			item {
				name
				description
				value
				imagePath
				id
			}
			analysis {
				id
				updatedAt
				createdAt
				isApproved
				analystId
			}
		}
	}
`;

export const GET_ALL_ORDERS = gql`
	query {
		orders {
			id
			code
			createdAt
			updatedAt
			requester {
				id
				profileImagePath
				name
				email
				roles
				department {
					code
					name
					description
				}
			}
			item {
				name
				description
				value
				imagePath
				id
			}
			analysis {
				id
				updatedAt
				createdAt
				isApproved
				analystId
			}
		}
	}
`;
