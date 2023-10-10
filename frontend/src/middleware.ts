import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { print as gqlPrint } from "graphql";
import { Admin } from "./models/enum";
import { NextURL } from "next/dist/server/web/next-url";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import {
	fetchGraphQL,
	objectHasUndefinedValue,
	objectIsEmpty,
} from "./utils/indext";
import { RECOVER_USER_FROM_TOKEN } from "./lib/query/user";
import {
	AccesstokenKey,
	RefreshtokenKey,
	UserCookieKey,
} from "./utils/constants";

function isLogedIn(request: NextRequest) {
	const userFromCookies = request.cookies.get(UserCookieKey);
	let res = Boolean(userFromCookies);

	if (!res) return false;
	if (objectHasUndefinedValue(userFromCookies!)) return false;
	if (objectIsEmpty(userFromCookies!)) return false;

	return true;
}

function serverPrint(...args: string[]) {
	if (args.length === 1) {
		console.log(args[0]);
	} else {
		const coloredArgs = args
			.slice(0, -1)
			.map((arg, index) => `\x1b[3${(index % 6) + 1}m${arg}\x1b[0m`);
		const normalText = args[args.length - 1];
		console.log(coloredArgs.join(" "), normalText);
	}
}

export function redirectUnauthorizedUser(baseUrl: string, path: string = "/") {
	serverPrint("SERVER:", "redirecionando usuario nao autorizado");
	return NextResponse.redirect(new URL(path, baseUrl));
}

export function redirectAuthorizedUser(baseUrl: string) {
	serverPrint("SERVER:", "redirecionando usuario autorizado");
	return NextResponse.redirect(new URL("/dashboard", baseUrl));
}

export async function middleware(request: NextRequest) {
	try {
		const accesstoken = request.cookies.get(AccesstokenKey);
		// const refreshtoken = request.cookies.get(RefreshtokenKey);

		const flag = isLogedIn(request);
		const nextUrl = request.nextUrl;

		if (flag) {
			// usuario logado
			if (nextUrl.pathname == "/") {
				return redirectAuthorizedUser(nextUrl.origin);
			}

			if (
				nextUrl.pathname == "/dashboard/admin" ||
				nextUrl.pathname.includes("/dashboard/admin")
			) {
				return handleAdminPath(nextUrl, accesstoken, request);
			}
		} else {
			// usuario nao logado
			if (
				nextUrl.pathname == "/dashboard" ||
				nextUrl.pathname.includes("/dashboard")
			) {
				return redirectUnauthorizedUser(nextUrl.origin);
			}
		}
	} catch (error) {
		console.log(error);
	}
}

async function handleAdminPath(
	nextUrl: NextURL,
	accesstoken: RequestCookie | undefined,
	request: NextRequest
) {
	// console.log("usuario acessando area admin");
	let user: any = JSON.parse(
		request.cookies.get("crmvgo.sga.user")?.value || ""
	);

	if (!Boolean(user)) {
		console.log("necessário recuperar");

		const res = await fetchGraphQL(RECOVER_USER_FROM_TOKEN);

		const { data } = await res.json();
		user = data["getUserByAccessToken"];
	}

	if (!user.roles.includes(Admin)) {
		return redirectUnauthorizedUser(nextUrl.origin, "dashboard");
	}
}
