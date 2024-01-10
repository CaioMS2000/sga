import { PropsWithChildren } from "react";

interface ToastProps extends PropsWithChildren {
    className?: string;
}

export default function Toast({children, className}: ToastProps) {
	return (
		<>
			<div className="toast toast-center">
				<div className={"alert " + className}>
					{children}
				</div>
			</div>
		</>
	);
}
