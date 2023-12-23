import { GET_ALL_CATEGORIES } from "@/lib/query/category";
import { fetchGraphQL } from "@/utils";
import { PropsWithChildren } from "react";

interface ItemCreateProps extends PropsWithChildren {}
// ITEM: name, description, categories, image
// LOT: supplier, itemAmount, price
export default async function ItemCreate({}: ItemCreateProps) {
	const res = await fetchGraphQL(GET_ALL_CATEGORIES, {
		key: 'categories'
	})
	console.log(res)

	return (
		<>
			<div className="bg-gray-800 flex flex-col rounded-lg p-3 items-center">
				<h1 className="font-bold text-[2rem] w-full text-white rounded-lg">
					Criando um novo item
				</h1>
			</div>
		</>
	);
}
