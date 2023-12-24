import CategoryCard from "@/components/CategoryCard";
import { GET_ALL_CATEGORIES } from "@/lib/query/category";
import { CategoryModel } from "@/models/categoryModel";
import { fetchGraphQL } from "@/utils";
import { PropsWithChildren } from "react";

interface CategoriesProps extends PropsWithChildren {}

export default async function Categories({}: CategoriesProps) {
	const res = await fetchGraphQL<CategoryModel[]>(GET_ALL_CATEGORIES, {
		key: "categories",
	});
	console.log(res);

	return (
		<>
			<div>
				<div className="mb-5">
					<a
						className="font-bold underline underline-offset-8 text-white/20 hover:text-white/70"
						href="/dashboard/category/create"
					>
						Adicionar mais
					</a>
				</div>
				<div className="flex flex-wrap gap-5">
					{res.map((cat, index) => (
						<CategoryCard key={index} category={cat} />
					))}
				</div>
			</div>
		</>
	);
}
