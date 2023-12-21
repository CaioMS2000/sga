import { PropsWithChildren } from "react";

interface OrderLayoutProps extends PropsWithChildren {}

export default function OrderLayout({ children }: OrderLayoutProps) {

	return (
		<>
        { children }
		</>
	);
}
