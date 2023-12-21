import { PropsWithChildren } from "react";

interface ItemsLayoutProps extends PropsWithChildren {}

export default function ItemsLayout({ children }: ItemsLayoutProps) {

	return (
		<>
        { children }
		</>
	);
}
