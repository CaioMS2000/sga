import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { userIsLoggedIn } from "../actions";
import { MenuItemType } from "@/components/SideBar";
import { Admin, StoreKeeper } from "@/models/enum";
import { buildUser } from "@/utils";
import { UserModel } from "@/models/userModel";
import { BsFillBoxFill } from "react-icons/bs";
import { RiInboxArchiveFill } from "react-icons/ri";
import { IoIosBusiness } from "react-icons/io";

interface DashboardProps extends PropsWithChildren {}

export default async function Dashboard({}: DashboardProps) {
	const loginFlag = await userIsLoggedIn();
	const currentUser = await buildUser()

	if (!loginFlag) redirect("/");

	return (
		<>
			<div className="grid grid-cols-3 gap-4">
				{menuItems.filter(item => thisUserShuldSeeThisOption(item, currentUser!)).map((item, index) => (
					<a key={index} href={item.url}>
						<div className="flex items-center w-fit gap-6 justify-around p-4 border-2 rounded-lg bg-byzantineBlue">
							<item.icon className='text-white w-[16px] h-[16px] min-w-[16px] min-h-[16px]'/>
							<p className="text-white font-bold">{item.label}</p>
						</div>
					</a>
				))}
			</div>
		</>
	);
}

const menuItems: MenuItemType[] = [
	{
		icon: BsFillBoxFill,
		label: "Faça um pedido",
		url: "/dashboard/items",
	},
	{
		icon: RiInboxArchiveFill ,
		label: "Inserir item",
		url: "/dashboard/item/create",
		permission: StoreKeeper,
	},
	{
		icon: IoIosBusiness ,
		label: "Inserir fornecedor",
		url: "/dashboard/supplier/create",
		permission: StoreKeeper,
	},
];

function thisUserShuldSeeThisOption(menuItem: MenuItemType, user: UserModel){
	if(user.roles.includes(Admin)) return true;
	if(!menuItem.permission) return true;

	return user.roles.includes(menuItem.permission)
}