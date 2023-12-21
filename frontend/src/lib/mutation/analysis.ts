import { gql } from "graphql-request";

export const CREATE_ANALYSIS = gql`
	mutation ($data: CreateAnalysisInput!) {
		createAnalysis(data: $data) {
			id
			createdAt
			isApproved
			analyst {
				id
				name
				email
				roles
				department {
					code
					name
				}
			}
			order {
				code
				requester {
					id
					name
					email
					roles
					department {
						code
						name
					}
				}
				item {
					name
					description
					value
					categories {
						code
						name
					}
				}
			}
		}
	}
`;
