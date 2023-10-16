import { NavBar } from "@/components/NavBar";
import { SideBar } from "@/components/SideBar";
import { PropsWithChildren } from "react";

interface DashboardLayoutProps extends PropsWithChildren {}

export default function DashboardLayout({ children }: DashboardLayoutProps) {

	return (
		<>
			<div className="flex bg-darkGreen2">
				<aside id="side-bar" className="h-screen w-64 p-2 border-white border-2">
                        <SideBar className=""/>
				</aside>
				<div className="h-screen flex flex-col flex-1">
					<div id="top-bar" className="flex h-fit">
                        <NavBar className="border-white border-2 border-l-0"/>
					</div>
					<main className="flex-1 p-6">
						{children}
					</main>
				</div>
			</div>
		</>
	);
}
