import { PropsWithChildren } from "react";

interface AdminLayoutProps extends PropsWithChildren {}

export default function AdminLayout({ children }: AdminLayoutProps) {

	return (
		<>
        { children }
		</>
	);
}
