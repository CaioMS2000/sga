import { gql } from "graphql-request";

export const GET_ITEMS = gql`
	query {
		items {
			id
			name
			description
			image
			available
			categories {
				id
				code
				name
				description
			}
		}
	}
`;

export const GET_ITEM_BY_ID = gql`
	query ($id: Float!) {
		getItemById(id: $id) {
			id
			name
			description
			image
			available
			categories {
				id
				code
				name
				description
			}
			delivery {
				code
				status
				attenderId
				attender {
					profileImage
					name
					email
					roles
					department {
						code
						name
						description
					}
				}
			}
			order {
				code
				requester {
					profileImage
					name
					email
					roles
					department {
						code
						name
						description
					}
				}
				analysis {
					isApproved
					analyst {
						profileImage
						name
						email
						roles
						department {
							code
							name
							description
						}
					}
				}
			}
			storage {
				code
				storekeeper {
					profileImage
					name
					email
					roles
					department {
						code
						name
						description
					}
				}
			}
			lot{
				id
				itemAmount
				price
				supplier{
					name
				}
			}
		}
	}
`;

export const GET_ITEMS_AMOUNT = gql`
	query {
		itemAmount
	}
`;
