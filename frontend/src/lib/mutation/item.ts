import { gql } from "graphql-request";

export const CREATE_ITEM = gql`
	mutation ($data: CreateItemInput!) {
		createItem(data: $data) {
			name
			description
		}
	}
`;

export const CREATE_ITEMS = gql`
	mutation ($data: [CreateItemInput!]!) {
		createItems(data: $data)
	}
`;

export const INIT_ORDER = gql`
	mutation ($data: CreateOrderInput!) {
		initItemOrder(data: $data) {
			id
			code
			createdAt
			updatedAt
			analysis {
				createdAt
				updatedAt
				isApproved
				analyst {
					id
					profileImage
					name
					email
					roles
				}
			}
			requester {
				id
				profileImage
				name
				email
				roles
			}
			item {
				id
				name
				image
				description
				categories {
					id
					code
					name
					description
				}
			}
		}
	}
`;
