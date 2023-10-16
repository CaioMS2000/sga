import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { userIsLoggedIn } from "../actions";

interface DashboardProps extends PropsWithChildren {}

export default async function Dashboard({}: DashboardProps) {
	const loginFlag = await userIsLoggedIn();

	if (!loginFlag) redirect('/');

	return (
		<>
			<h1>Dashboard Page</h1>
		</>
	);
}
