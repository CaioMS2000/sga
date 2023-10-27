import { gql } from "graphql-request";

export const CREATE_ITEM = gql`
	mutation ($data: CreateItemInput!) {
		createItem(data: $data) {
			name
			description
			value
			storedAt
		}
	}
`;

export const INIT_ORDER = gql`
	mutation ($data: CreateOrderInput!) {
		initItemOrder(data: $data) {
			id
			code
			createdAt
			updatedAt
			analysis{
				createdAt
				updatedAt
				isApproved
				analyst{
					id
					profileImagePath
					name
					email
					roles
				}
			}
			requester{
				id
				profileImagePath
				name
				email
				roles
			}
			item{
				id
				name
				imagePath
				description
				value
				amount
				categories{
					id
					code
					name
					description
				}
			}
		}
	}
`;
