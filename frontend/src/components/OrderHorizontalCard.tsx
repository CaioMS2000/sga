import { OrderModel } from "@/models/orderModel";
import { PropsWithChildren } from "react";
import { Status as _Status } from "@/models/enum";
import { getEnumFromString, statusToText } from "@/utils";

interface OrderHorizontalCardProps extends PropsWithChildren {
	order: OrderModel;
	storeKeeperView?: boolean;
}

export default async function OrderHorizontalCard({
	order: { code, item, analysis, requester, createdAt },
	storeKeeperView = false,
}: OrderHorizontalCardProps) {
	const Status = analysis ? (
		analysis.isApproved ? (
			<span className="text-green-600">Aprovado</span>
		) : (
			<span className="text-red-600">Rejeitado</span>
		)
	) : (
		<span className="text-orange-500">Pendente</span>
	);
	// const deliveryStatus = getEnumFromString(Status, item.delivery.status)
	const deliveryStatus = item.delivery?.status ?? _Status.Waiting;
	const DeliveryStatus = (
		<span
			className={`text-${
				deliveryStatus == _Status.Waiting
					? "orange-500"
					: deliveryStatus == _Status.Separation
					? "yellow-500"
					: deliveryStatus == _Status.InProgress
					? "blue-500"
					: "green-500"
			}`}
		>
			{statusToText(deliveryStatus)}
		</span>
	);
	const data = new Date(createdAt);
	const day = data.getDate();
	const month = data.getMonth() + 1; // Os meses são indexados de 0 a 11
	const year = data.getFullYear();

	return (
		<>
			<a href={`/dashboard/order/${code}`}>
				<div className="container flex flex-row bg-teal-800 w-fit p-4 rounded-lg items-center">
					<div className="border-neutral-400 border-2 p-3 h-fit rounded-lg">
						<img
							src={item.image}
							alt={`Item do pedido ${code}`}
							className="max-h-40 rounded-lg"
						/>
					</div>
					<div className="divider divider-horizontal" />
					{/* <div className="flex flex-col"></div> */}
					<div className="join join-vertical gap-3">
						{storeKeeperView && (
							<>
								<div className="flex gap-3 border-neutral-400 border-2 p-3">
									<span className="badge bg-neutral-400 border-neutral-400 bg-opacity-40 p-3">
										Status de entrega
									</span>
									{DeliveryStatus}
								</div>
							</>
						)}

						<div className="flex gap-3 border-neutral-400 border-2 p-3">
							<span className="badge bg-neutral-400 border-neutral-400 bg-opacity-40 p-3">
								Status
							</span>
							{Status}
						</div>
						<div className="flex gap-3 border-neutral-400 border-2 p-3">
							<span className="badge bg-neutral-400 border-neutral-400 bg-opacity-40 p-3">
								Pedido por
							</span>
							<p className="font-bold">{requester.name}</p>
						</div>
						<div className="flex gap-3 border-neutral-400 border-2 p-3">
							<span className="badge bg-neutral-400 border-neutral-400 bg-opacity-40 p-3">
								Data do pedido
							</span>
							<p className="font-bold">
								{day}/{month}/{year}
							</p>
						</div>
					</div>
				</div>
			</a>
		</>
	);
}
