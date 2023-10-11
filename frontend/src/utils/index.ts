import { graphqlClient } from "@/lib/graphql-request/client";
import { FetchGraphQLResponse, GraphQLRequestOptions, Request, Response } from "./_index";

export async function fetchGraphQL(query: string, key?: string, options: GraphQLRequestOptions = {}): Promise<any> {
  try {
    const { variables, headers } = options;
    const response: FetchGraphQLResponse = await graphqlClient.request(query, variables, headers);

    if (key && response.hasOwnProperty(key)) {
      return response[key];
    }

    return response;
  } catch (error) {
    throw new Error(`Erro na requisição GraphQL: ${error}`);
  }
}

export function objectIsEmpty(obj: object) {
	if (!obj) return true;

	return Object.keys(obj).length == 0;
}

export function objectHasUndefinedValue(obj: object) {
	const aux = Object.keys(obj);
	let flag = false;

	for (const o of aux) {
		// @ts-expect-error
		if (obj[o] == undefined) {
			flag = true;
			break;
		}
	}

	return flag;
}

export interface GraphQLResponse {
  response: Response;
  request: Request;
}
