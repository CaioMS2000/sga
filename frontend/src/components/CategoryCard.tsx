import { FaFolder } from "react-icons/fa";
import { PropsWithChildren } from "react";
import { CategoryModel } from "@/models/categoryModel";
import DeleteCategoryIcon from "./DeleteCategoryIcon";
import EditCategoryIcon from "./EditCategoryIcon";

interface CategoryCardProps extends PropsWithChildren {
	category: CategoryModel;
}

export default async function CategoryCard({ category }: CategoryCardProps) {
	return (
		<>
			<div className="border-2 w-fit rounded-lg flex">
				<div className="flex gap-2 items-center text-xl p-3">
					<FaFolder />
					<p className="font-bold">{category.name}</p>
				</div>
				{category.description && (
					<p className="italic text-white/30">
						"{category.description}"
					</p>
				)}

				<div className="h-full border-l-2" />

				<div className="p-3 flex flex-col gap-2 items-center">
					{/* <DeleteCategoryIcon category={category} /> */}
					<EditCategoryIcon category={category} />
				</div>
			</div>
		</>
	);
}
