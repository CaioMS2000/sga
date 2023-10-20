import { PropsWithChildren } from "react";

interface OrdersLayoutProps extends PropsWithChildren {}

export default function OrdersLayout({ children }: OrdersLayoutProps) {

	return (
		<>
        { children }
		</>
	);
}
