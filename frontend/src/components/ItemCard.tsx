import { ItemModel } from "@/models/ItemModel";
import { PropsWithChildren } from "react";
import { RiQuestionFill } from "react-icons/ri";
import Button from "./RedirectButton";

interface ItemCardProps extends PropsWithChildren {
	item: ItemModel;
}

export default async function ItemCard({ item }: ItemCardProps) {
	const itemImageFlag = Boolean(item.image.length);

	return (
		<>
			<div className="card w-96 bg-gray-800 shadow-xl text-white">
				<figure className="px-10 pt-10">
					{itemImageFlag && (
						<img
							src={item.image}
							alt="Shoes"
							className="rounded-xl"
						/>
					)}
					{!itemImageFlag && <RiQuestionFill size={70} />}
				</figure>
				<div className="card-body items-center text-center">
					<h2 className="card-title">{item.name}</h2>
					<p>{item.description}</p>
					<div className="card-actions">
						<Button
							url={`/dashboard/item/${item.id}`}
							className="btn bg-purple-900 border-purple-900 text-white"
						>
							Pedir
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
