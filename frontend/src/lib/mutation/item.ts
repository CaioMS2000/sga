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
			name
			description
			value
			id
			imagePath
			value
			order {
				code
				createdAt
				analysis {
					id
				}
			}
		}
	}
`;
