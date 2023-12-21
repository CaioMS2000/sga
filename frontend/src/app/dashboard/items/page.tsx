import ItemCard from "@/components/ItemCard";
import { GET_ITEMS } from "@/lib/query/item";
import { ItemModel } from "@/models/ItemModel";
import { fetchGraphQL } from "@/utils";
import { PropsWithChildren } from "react";

interface pageProps extends PropsWithChildren {}

export default async function page({}: pageProps) {
	let items: ItemModel[] = await fetchGraphQL(GET_ITEMS, {
        key: "items"
    });

	items = items.filter(item => {
		if(item.amount > 0 && item.available) return true;
		return false
	})

	return (
		<>
			<div className="grid sm:grid-cols-1 lg:grid-cols-2 justify-items-center gap-5">
				{items.map((item) => {
					return <ItemCard key={item.id} item={item} />;
				})}
			</div>
		</>
	);
}
