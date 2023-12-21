import Image from "next/image";
import OrderButton from "@/components/OrderButton";
import { INIT_ORDER } from "@/lib/mutation/item";
import { GET_ITEM_BY_ID } from "@/lib/query/item";
import { ItemModel } from "@/models/ItemModel";
import { buildUser, fetchGraphQL } from "@/utils";
import { PropsWithChildren } from "react";
import { RiQuestionFill } from "react-icons/ri";
import { redirect } from "next/navigation";

interface ItemProps extends PropsWithChildren {
	params: {
		id: string;
	};
}

export default async function Item({ params: { id } }: ItemProps) {
	const item: ItemModel = await fetchGraphQL(GET_ITEM_BY_ID, {
		key: "getItemById",
		variables: {
			id: parseInt(id),
		},
	});
	const itemImageFlag = Boolean(item.image.length);
	const categories = item.categories;
	const currentUser = await buildUser();
	if (currentUser == undefined) redirect("/");

	return (
		<>
			<div className="grid grid-cols-2 gap-5">
				<div className="flex flex-col">
					{categories && categories.length > 0 && (
						<div className="flex gap-3 flex-wrap justify-start">
							{categories.map((cat) => (
								<div
									key={cat.id}
									className="badge bg-teal-700 text-white font-bold last:mb-3"
								>
									<p>{cat.name}</p>
								</div>
							))}
						</div>
					)}

					{itemImageFlag && (
						<img alt={`Image for ${item.name}`} src={item.image} />
					)}
					{!itemImageFlag && <RiQuestionFill size={70} />}
				</div>

				<div className="flex flex-col justify-between">
					<div className="bg-teal-700 text-white font-bold w-fit p-3 rounded-lg mb-5">
						Nota Fiscal
					</div>
					<div className="flex flex-col gap-3">
						<p className="font-bold">{item.name}</p>
						<p className="font-bold text-xs">{item.description}</p>
						<p className="font-bold">
							Valor de aquisição: R$ {item.value}
						</p>
					</div>
					<OrderButton
						className="bg-green-600 text-white"
						itemId={item.id}
						requesterId={currentUser.id}
					>
						Pedir
					</OrderButton>
				</div>
			</div>
		</>
	);
}
