import { PropsWithChildren } from "react";
import { userIsLoggedIn } from "@/utils/indext";
import { redirect } from "next/navigation";

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
