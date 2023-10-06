import { gql } from "graphql-request";

export const GET_ITEMS = gql`
	query {
		items {
			id
			name
			description
			value
			imagePath
		}
	}
`;

export const GET_ITEM_BY_ID = gql`
	query ($id: Float!) {
		getItemById(id: $id) {
			id
			name
			description
			value
			imagePath
		}
	}
`;

export const GET_ITEMS_AMOUNT = gql`
	query {
		itemAmount
	}
`;
