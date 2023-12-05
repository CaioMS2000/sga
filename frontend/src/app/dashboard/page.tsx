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
				<a href="/dashboard/items">
					{/* <div className="flex items-center justify-around p-4 border-2 rounded-lg bg-base-100"> */}
					{/* <div className="flex items-center justify-around p-4 border-2 rounded-lg bg-emerald-900"> */}
					<div className="flex items-center w-fit gap-6 justify-around p-4 border-2 rounded-lg bg-green-900">
						<BsFillBoxFill className='text-white w-[16px] h-[16px] min-w-[16px] min-h-[16px]'/>
						<p className='text-white font-bold'>Faça um pedido</p>
					</div>
				</a>
			</div>
		</>
	);
}
