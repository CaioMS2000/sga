import { PropsWithChildren } from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import ValidateOrderButton from "./ValidateOrderButton";

interface OrderValidationProps extends PropsWithChildren {
	analystId: number;
	orderId: number;
}

export default async function OrderValidation({
	analystId,
	orderId,
}: OrderValidationProps) {
	return (
		<>
			<div className="container">
				<p className="font-bold">Você aprova esse pedido?</p>
				<div className="flex justify-between px-5">
					<ValidateOrderButton
						className="btn rounded-md p-3 bg-red-600 hover:bg-red-800"
						analystId={analystId}
						orderId={orderId}
						isApproved={false}
					>
						<AiOutlineClose size={20} className="text-white" />
					</ValidateOrderButton>
					<ValidateOrderButton
						className="btn rounded-md p-3 bg-green-600 hover:bg-green-800"
						analystId={analystId}
						orderId={orderId}
						isApproved={true}
					>
						<AiOutlineCheck size={20} className="text-white" />
					</ValidateOrderButton>
				</div>
			</div>
		</>
	);
}
