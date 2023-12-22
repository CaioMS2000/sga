import { NavBar } from "@/components/NavBar";
import { SideBar } from "@/components/SideBar";
import { PropsWithChildren } from "react";

interface DashboardLayoutProps extends PropsWithChildren {}

export default function DashboardLayout({ children }: DashboardLayoutProps) {

	return (
		<>
			<div className="flex bg-darkGreen2">
				<aside id="side-bar" className="flex-grow max-w-[16rem] min-h-screen p-2  bg-zinc-800">
                        <SideBar />
				</aside>
				<div className="min-h-screen flex flex-col flex-1">
					<div id="top-bar" className="flex h-fit  bg-zinc-800">
                        <NavBar />
					</div>
					<main className="flex-1 p-6 bg-zinc-900 rounded-tl-lg">
						{children}
					</main>
				</div>
			</div>
		</>
	);
}
