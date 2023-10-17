import ItemCard from "@/components/ItemCard";
import { GET_ITEMS } from "@/lib/query/item";
import { ItemModel } from "@/models/ItemModel";
import { fetchGraphQL } from "@/utils";
import { PropsWithChildren } from "react";

interface pageProps extends PropsWithChildren {}

export default async function page({}: pageProps) {
	const items: ItemModel[] = await fetchGraphQL(GET_ITEMS, {
        key: "items"
    });

	return (
		<>
			<h1>Items</h1>
			<div className="grid grid-cols-2 gap-5">
				{items.map((item) => {
					return <ItemCard key={item.id} item={item} />;
				})}
			</div>
		</>
	);
}
