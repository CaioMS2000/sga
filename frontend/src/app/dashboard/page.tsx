import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { userIsLoggedIn } from "../actions";
import { BsFillBoxFill } from "react-icons/bs";

interface DashboardProps extends PropsWithChildren {}

export default async function Dashboard({}: DashboardProps) {
	const loginFlag = await userIsLoggedIn();

	if (!loginFlag) redirect("/");

	return (
		<>
			<div className="grid grid-cols-3 gap-4">
				<div className="flex items-center justify-around p-4 border-2 rounded-lg bg-base-100">
					<BsFillBoxFill />
					<p>Faça um pedido</p>
				</div>
			</div>
		</>
	);
}
