import { PropsWithChildren } from "react";

interface ItemCreateProps extends PropsWithChildren {}
// ITEM: name, description, categories, image
// LOT: supplier, itemAmount, price
export default async function ItemCreate({}: ItemCreateProps) {
	return (
		<>
			<div className="bg-darkGreen flex flex-col rounded-lg p-3 items-center">
				<h1 className="font-bold text-[2rem] bg-white w-fit text-darkGreen p-2 rounded-lg mb-5">
					Criando um novo item
				</h1>
			</div>
		</>
	);
}
