import { gql } from "graphql-request";

export const GET_ITEMS = gql`
	query {
		items {
			id
			name
			description
			value
			imagePath
			amount
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
			value
			imagePath
			amount
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
			}
			invoice {
				code
				supplier {
					name
					cnpj
					email
					phone
				}
			}
			order {
				code
				requester {
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
				analysis {
					isApproved
					analyst {
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
				}
			}
			storage {
				code
				storekeeper {
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
			}
		}
	}
`;

export const GET_ITEMS_AMOUNT = gql`
	query {
		itemAmount
	}
`;
