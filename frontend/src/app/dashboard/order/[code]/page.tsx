import OrderValidation from "@/components/OrderValidation";
import { GET_ORDER } from "@/lib/query/order";
import { Admin, Manager } from "@/models/enum";
import { OrderModel } from "@/models/orderModel";
import { YearMonthDay, buildUser, fetchGraphQL } from "@/utils";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

interface OrderProps extends PropsWithChildren {
	params: {
		code: string;
	};
}

export default async function Order({ params: { code } }: OrderProps) {
	const order: OrderModel = await fetchGraphQL(GET_ORDER, {
		variables: {
			code,
		},
		key: "getOrderByCode",
	});
	const Status = order.analysis ? (
		order.analysis.isApproved ? (
			<span className="font-bold text-green-600">Aprovado</span>
		) : (
			<span className="font-bold text-red-600">Rejeitado</span>
		)
	) : (
		<span className="font-bold text-orange-500">Pendente</span>
	);

	const orderDate = YearMonthDay(order.createdAt);
	const analysisDate = order.analysis
		? YearMonthDay(order.analysis.createdAt)
		: undefined;
	const requesterHasImage = Boolean(order.requester?.profileImagePath);
	const analystHasImage = Boolean(order.analysis?.analyst.profileImagePath);
	const user = await buildUser()
	if(user == undefined) redirect('/');
	const thisUserCanValidate = (() => {
		console.log(user, '\n\n\n', order.requester)
		if(user.roles.includes(Admin)) return true;

		if(user.roles.includes(Manager)){
			return user.department.some(thisDep => order.requester.department.some(reqDep => thisDep == reqDep))
		}

		return false
	})()

	return (
		<>
			<div className="grid justify-center gap-3 xl:grid-cols-2 xl:items-start ">
				<div className="flex w-fit">
					<div className="card w-96 bg-CRMVGO_darkGreen shadow-xl p-6">
						<div className="mx-auto italic badge bg-opacity-25 border-opacity-25 mb-1 h-fit text-[12px]">
							Código: {order.code}
						</div>
						{/* <figure className="px-10 pt-10"> */}
						<figure className="p-0">
							<img
								src={order.item?.imagePath}
								alt="Shoes"
								className="rounded-xl"
							/>
						</figure>
						<div className="badge mx-auto my-3 bg-teal-800 border-teal-800 text-white">
							<a href="#" target="_blank">
								Nota fiscal
							</a>
						</div>
						<div className="card-body p-0">
							<h2 className="card-title mx-auto">
								{order.item?.name}
							</h2>
							<p>
								<span className="font-bold">Descrição:</span>{" "}
								{order.item?.description}
							</p>
							<p>
								<span className="font-bold">Status:</span>{" "}
								{Status}
							</p>
							<p>
								<span className="font-bold">
									Custo por unidade:
								</span>{" "}
								R${order.item?.value}
							</p>
							<p>
								<span className="font-bold">
									Data do pedido:
								</span>{" "}
								{orderDate.day}/{orderDate.month}/
								{orderDate.year}
							</p>
							{analysisDate && (
								<>
									<p>
										Data da análise: {analysisDate.day}/
										{analysisDate.month}/{analysisDate.year}
									</p>
								</>
							)}
							{order.item?.categories?.length && (
								<>
									<div className="divider" />
									<p>Categorias</p>
									<div className="flex flex-wrap">
										{order.item?.categories?.map(
											(cat, index) => (
												<div
													className="badge"
													key={index}
												>
													{cat.name}
												</div>
											)
										)}
									</div>
								</>
							)}
						</div>
					</div>
				</div>

				<div className="flex w-fit mx-auto md:flex-row flex-col lg:flex-col ">
					<div className="rounded-lg p-4 grid grid-cols-2 mb-5 lg:mb-5 md:mb-0 md:mr-3 bg-gray-700">
						<div className="avatar">
							<div className="rounded-full">
								{requesterHasImage && (
									<img
										alt=""
										src={order.requester.profileImagePath}
									/>
								)}
								{!requesterHasImage && (
									<img
										alt=""
										src="/image/empty-profile-image.png"
										className="max-h-20"
									/>
								)}
							</div>
						</div>
						<div className="flex flex-col justify-between">
							<p>Requisitante</p>
							<p>{order.requester?.name}</p>
						</div>
					</div>
					{order.analysis && (
						<>
							<div className="rounded-lg p-4 grid grid-cols-2 bg-gray-700">
								<div className="avatar">
									<div className="rounded-full">
										{analystHasImage && (
											<img
												alt=""
												src={
													order.requester
														.profileImagePath
												}
											/>
										)}
										{!analystHasImage && (
											<img
												alt=""
												src="/image/empty-profile-image.png"
												className="max-h-20"
											/>
										)}
									</div>
								</div>
								<div className="flex flex-col justify-between">
									<p>Analista</p>
									<p>{order.requester?.name}</p>
								</div>
							</div>
						</>
					)}
          {
            (thisUserCanValidate && !order.analysis) && (
              <OrderValidation analystId={user.id} orderId={order.id}/>
            )
          }
				</div>
			</div>
		</>
	);
}
