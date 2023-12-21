import { Admin, Role, StoreKeeper } from "@/models/enum";
import { buildUser } from "@/utils";
import { HTMLProps, PropsWithChildren } from "react";
import { IconType } from "react-icons";
import { AiFillHome } from 'react-icons/ai';
import { FaThList } from 'react-icons/fa';
import { IoIosBusiness } from "react-icons/io";
import { BsPersonFillGear, BsFillShieldLockFill } from 'react-icons/bs';
import { redirect } from "next/navigation";

interface SideBarProps extends PropsWithChildren, HTMLProps<HTMLDivElement> {}

export async function SideBar({...rest}: SideBarProps) {
    const user = await buildUser();
    if(user == undefined) redirect('/');
    const items = menuItems.filter(item => {
        if(item.permission == undefined) return true;
        if(user.roles.includes(Admin)) return true;

        return user.roles.includes(item.permission);
    });

	return (
		<>
			<ul className={"menu w-56" + ` ${rest.className}`}>
                {
                    items.map((item, index) => (<li key={index} className='mb-4 last:mb-0'><a href={item.url}>{<item.icon size={20}/>}<p className='font-bold'>{item.label}</p></a></li>))
                }
			</ul>
		</>
	);
}

export type MenuItemType = {
    label: string;
    url: string;
    permission?: Role;
    icon: IconType
}
const menuItems: MenuItemType[] = [
    {
        icon: BsFillShieldLockFill,
        label: 'Admin',
        permission: Admin,
        url: '/dashboard/admin',
    },
    {
        icon: AiFillHome,
        label: 'Página inicial',
        url: '/dashboard',
    },
    {
        icon: FaThList,
        label: 'Pedidos',
        url: '/dashboard/orders',
    },
    {
        icon: BsPersonFillGear,
        label: 'Gerenciamento de usuários',
        permission: Admin,
        url: '/dashboard/admin/users',
    },
    {
		icon: IoIosBusiness ,
		label: "Gerenciar fornecedores",
		url: "/dashboard/suppliers",
		permission: StoreKeeper,
	},
]