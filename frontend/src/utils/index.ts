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
import { Role, Status } from "@/models/enum";
import { DepartmentModel } from "@/models/departmentModel";
import { redirect } from "next/navigation";

export type BasicObject<T = any> = Record<string, T>;

export async function fetchGraphQL<T extends Record<string, any> = any>(
	query: string,
	options: GraphQLRequestOptions = {}
): Promise<T> {
	const { variables, headers, key } = options;
	const response: T= await graphqlClient.request(
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
	let flag = false
	// @ts-expect-error
	const keys = Object.keys(_user)
	keys.forEach(k => {
		// @ts-expect-error
		if(_user[k] == undefined){
			flag = true
		}
	})

	if(flag) return undefined;
	if(!_user || _user == undefined || _user == null) return undefined;
	else{
		const user = JSON.parse(_user.value) as UserModel;
	
		return user
	}
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

export function departmentFromCode(code: string, departments: DepartmentModel[]){
	return departments.filter(dep => dep.code == code).pop()
}

export function usersInSameDepartment(userA: UserModel, userB: UserModel){
	return userA.department.some(depA => userB.department.some(depB => depA.code == depB.code))
}


export const statusToText = (status: Status): string => {
	const statusTranslations = {
		[Status.Waiting]: "Aguardando",
		[Status.Separation]: "Em Separação",
		[Status.InProgress]: "Em Progresso",
		[Status.Concluded]: "Concluído",
	};

	return statusTranslations[status] || status;
};

export const getEnumFromString = <T>(enumObj: T, value: string): T[keyof T] | undefined => {
	// @ts-expect-error
	const enumValues = Object.values(enumObj) as string[];
	const matchingValue = enumValues.find((enumValue) => enumValue === value);
  
	return matchingValue as T[keyof T] | undefined;
  };
  