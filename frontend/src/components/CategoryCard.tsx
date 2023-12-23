import { FaFolder } from "react-icons/fa";
import { PropsWithChildren } from "react";
import { CategoryModel } from "@/models/categoryModel";

interface CategoryCardProps extends PropsWithChildren {
	category: CategoryModel;
}

export default async function CategoryCard({ category }: CategoryCardProps) {
	return (
		<>
			<div className="border-2 w-fit p-3 rounded-lg">
        <div className="flex gap-2 items-center text-xl">
          <FaFolder />
          <p className='font-bold'>{category.name}</p>
        </div>
        {category.description && <p className='italic text-white/30'>"{category.description}"</p>}
      </div>
		</>
	);
}
