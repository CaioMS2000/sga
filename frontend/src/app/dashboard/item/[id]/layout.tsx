import { PropsWithChildren } from "react";

interface ItemLayoutProps extends PropsWithChildren {}

export default function ItemLayout({ children }: ItemLayoutProps) {

	return (
		<>
        { children }
		</>
	);
}
