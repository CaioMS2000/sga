import { PropsWithChildren } from 'react';
import { BsPersonFillGear } from 'react-icons/bs';
import { BsDiagram3Fill } from "react-icons/bs";
import { MenuItemType } from '@/components/SideBar';

interface AdminProps extends PropsWithChildren{
}

export default async function Admin({}:AdminProps){

  return(
      <>
      <div className="grid grid-cols-3 gap-4">
				{menuItems.map((item, index) => (
					<a key={index} href={item.url}>
						<div className="flex items-center w-fit gap-6 justify-around p-4 border-2 rounded-lg bg-byzantineBlue">
							<item.icon className='text-white w-[16px] h-[16px] min-w-[16px] min-h-[16px]'/>
							<p className="text-white font-bold">{item.label}</p>
						</div>
					</a>
				))}
			</div>
      </>
  )
}

const menuItems: MenuItemType[] = [
	{
		icon: BsPersonFillGear,
		label: "Gerenciar usuários",
		url: "/dashboard/admin/users",
	},
	{
		icon: BsDiagram3Fill,
		label: "Gerenciar departamentos",
		url: "/dashboard/admin/departments",
	},
];