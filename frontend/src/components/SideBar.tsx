import { Admin, Role } from "@/models/enum";
import { buildUser } from "@/utils";
import { HTMLProps, PropsWithChildren } from "react";
import { IconType } from "react-icons";
import { AiFillHome } from 'react-icons/ai';
import { FaThList } from 'react-icons/fa';
import { BsPersonFillGear, BsFillShieldLockFill } from 'react-icons/bs';

interface SideBarProps extends PropsWithChildren, HTMLProps<HTMLDivElement> {}

export async function SideBar({...rest}: SideBarProps) {
    const user = await buildUser();
    const items = menuItems.filter(item => {
        if(item.permission == undefined) return true;

        return user.roles.includes(item.permission);
    });

	return (
		<>
			<ul className={"menu w-56" + ` ${rest.className}`}>
                {
                    items.map((item, index) => (<li key={index} className='mb-4 last:mb-0'><a>{<item.icon size={20}/>}<p className='font-bold'>{item.label}</p></a></li>))
                }
				{/* <li>
					<a>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
							/>
						</svg>
						Item 3
					</a>
				</li> */}
			</ul>
		</>
	);
}

type MenuItemType = {
    label: string;
    permission?: Role;
    icon: IconType
}
const menuItems: MenuItemType[] = [
    {
        icon: BsFillShieldLockFill,
        label: 'Admin',
        permission: Admin
    },
    {
        icon: AiFillHome,
        label: 'Página inicial',
    },
    {
        icon: FaThList,
        label: 'Pedidos',
    },
    {
        icon: BsPersonFillGear,
        label: 'Gerenciamento de usuários',
        permission: Admin
    },
]
