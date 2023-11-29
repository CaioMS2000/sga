import { gql } from "graphql-request";

export const CREATE_DELIVERY_ = gql`
    mutation($data: CreateDeliveryInput!){
        setItemDelivery(data: $data){
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

export const CREATE_DELIVERY = gql`
    mutation($data: CreateDeliveryInput!){
        setItemDelivery(data: $data){
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

export const UPDATE_DELIVERY = gql`
	mutation UpdateDeliveriy($data: UpdateDeliveryInput!){
		updateDelivery(data: $data){
			id
			code
			status
			attender{
				name
				email
				password
				profileImagePath
				roles
				id
			}
			item{
				id
				name
				description
				value
				imagePath
			}
		}
	}
`