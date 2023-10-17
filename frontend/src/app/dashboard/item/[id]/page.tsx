import { GET_ITEM_BY_ID } from "@/lib/query/item";
import { ItemModel } from "@/models/ItemModel";
import { fetchGraphQL } from "@/utils";
import { PropsWithChildren } from "react";
import { RiQuestionFill } from "react-icons/ri";

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
    const itemImageFlag = Boolean(item.imagePath.length);

	console.log(item);

	return (
		<>
			<div className="grid grid-cols-2">
                <div className='bg-yellow-200'>
                {itemImageFlag && (<img alt={`Image for ${item.name}`} src={item.imagePath} />)}
                {!itemImageFlag && (<RiQuestionFill size={70} />)}
                </div>
                <div className='bg-red-200'>2</div>
            </div>
		</>
	);
}
