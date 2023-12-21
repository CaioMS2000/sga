import { gql } from "graphql-request";

export const GET_ORDER = gql`
	query ($code: String!) {
		getOrderByCode(code: $code) {
			id
			code
			createdAt
			updatedAt
			requester {
				id
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
			item {
				name
				description
				value
				image
				id
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
			}
			analysis {
				id
				updatedAt
				createdAt
				isApproved
				analyst {
					id
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
			item {
				name
				description
				value
				image
				id
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
