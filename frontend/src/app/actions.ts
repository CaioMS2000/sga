"use server";
import { objectHasUndefinedValue, objectIsEmpty } from "@/utils";
import { UserCookieKey } from "@/utils/constants";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function saveCookie(key: string, data: string, maxAge?: any) {
	maxAge = maxAge || new Date();
	return cookies().set(key, data, { maxAge });
}

export async function getCookie(key: string) {
	return cookies().get(key);
}

export async function getAllCookies() {
	return cookies().getAll();
}

export async function deleteCookie(key: string) {
	cookies().set(key, '', { maxAge: 0 });
	return cookies().delete(key);
}

// export type serverSideCookieType = typeof cookies;//{name, value, path}
// export type serverSideCookieType = RequestCookie & {path?:string};
export type serverSideCookieType = RequestCookie;

export async function userIsLoggedIn(){
	const userFromCookies = await getCookie(UserCookieKey)
	let res = Boolean(userFromCookies)
  
	if(!res) return false;
	if(objectHasUndefinedValue(userFromCookies!)) return false;
	if(objectIsEmpty(userFromCookies!)) return false;
	
	return true
  }