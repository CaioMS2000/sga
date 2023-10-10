import { getCookie } from "@/app/actions";
import { graphqlClient } from "@/lib/graphql-request/client";
import { UserCookieKey } from "./constants";

type GraphQLResponse = { [key: string]: any };

export async function fetchGraphQL(query: string, key?: string): Promise<any> {
  try {
    const response: GraphQLResponse = await graphqlClient.request(query);

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

export async function userIsLoggedIn(){
  const userFromCookies = await getCookie(UserCookieKey)
  let res = Boolean(userFromCookies)

  if(!res) return false;
  if(objectHasUndefinedValue(userFromCookies!)) return false;
  if(objectIsEmpty(userFromCookies!)) return false;
  
  return true
}