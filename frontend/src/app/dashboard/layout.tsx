import { PropsWithChildren } from "react";

export interface DashboardLayoutProps extends PropsWithChildren {}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<>
			<div className="flex">
				<aside id="side-bar" className="h-screen w-64 p-6 bg-red-100">
					Sidebar
				</aside>
				<div className="h-screen flex flex-col flex-1">
					<div id="top-bar" className="flex bg-yellow-100 p-6">
						Topbar
					</div>
					<main className="flex-1 bg-green-100 p-6">
						Conteudo
						{children}
					</main>
				</div>
			</div>
		</>
	);
}
