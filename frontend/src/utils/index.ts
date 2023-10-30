import { graphqlClient } from "@/lib/graphql-request/client";
import {
	FetchGraphQLResponse,
	GraphQLRequestOptions,
	Request,
	Response,
} from "./_index";
import { getCookie } from "@/app/actions";
import { UserCookieKey } from "./constants";
import { UserModel } from "@/models/userModel";
import { Role } from "@/models/enum";

export type BasicObject<T = any> = Record<string, T>;

export async function fetchGraphQL(
	query: string,
	options: GraphQLRequestOptions = {}
): Promise<any> {
	const { variables, headers, key } = options;
	const response: FetchGraphQLResponse = await graphqlClient.request(
		query,
		variables,
		headers
	);

	if (key && response.hasOwnProperty(key)) {
		return response[key];
	}

	return response;
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

export async function buildUser(){
	const _user = await getCookie(UserCookieKey);
	const user = JSON.parse(_user!.value) as UserModel;

	return user
}

export function YearMonthDay(date: Date){
	const data = new Date(date);
	const day = data.getDate();
	const month = data.getMonth() + 1; // Os meses são indexados de 0 a 11
	const year = data.getFullYear();

	return {day, month, year}
}

export function stringToRole(value: string): Role | undefined {
	const roleStringMap: { [key: string]: Role } = {
		"Admin": Role.Admin,
  		"Analyst": Role.Analyst,
  		"Auditor": Role.Auditor,
  		"Requester": Role.Requester,
  		"StoreKeeper": Role.StoreKeeper,
  		"Manager": Role.Manager,
	};

    return roleStringMap[value];
}
  