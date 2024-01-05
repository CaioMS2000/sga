import { gql } from "graphql-request";

export const CREATE_DELIVERY_ = gql`
	mutation ($data: CreateDeliveryInput!) {
		setItemDelivery(data: $data) {
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
		}
	}
`;

export const CREATE_DELIVERY = gql`
	mutation ($data: CreateDeliveryInput!) {
		setItemDelivery(data: $data) {
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
		}
	}
`;

export const UPDATE_DELIVERY = gql`
	mutation UpdateDeliveriy($data: UpdateDeliveryInput!) {
		updateDelivery(data: $data) {
			id
			code
			status
			attender {
				name
				email
				password
				profileImage
				roles
				id
			}
			item {
				id
				name
				description
				image
			}
		}
	}
`;
