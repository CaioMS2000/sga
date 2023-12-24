"use client";
import { FaFolder } from "react-icons/fa";
import { PropsWithChildren, useRef, useState } from "react";
import { CategoryModel } from "@/models/categoryModel";
import DeleteCategoryIcon from "./DeleteCategoryIcon";
import EditCategoryIcon from "./EditCategoryIcon";
import Modal from "./Modal";
import Input from "./InputSimple";
import { fetchGraphQL } from "@/utils";
import { UPDATE_CATEGORY } from "@/lib/mutation/category";

interface CategoryCardProps extends PropsWithChildren {
	category: CategoryModel;
}

export default function CategoryCard({ category }: CategoryCardProps) {
	const modalRef = useRef<HTMLDialogElement | null>(null);

	return (
		<>
			<div className="border-2 w-fit rounded-lg flex">
				<div className="flex flex-col p-3">
					<div className="flex gap-2 items-center text-xl">
						<FaFolder />
						<p className="font-bold">{category.name}</p>
					</div>
					{category.description && (
						<p className="italic text-white/30">
							"{category.description}"
						</p>
					)}
				</div>

				<div className="h-full border-l-2" />

				<div className="p-3 flex items-center">
					{/* <DeleteCategoryIcon category={category} /> */}
					<EditCategoryIcon
						category={category}
						onClick={() => {
							if (modalRef.current) {
								modalRef.current.showModal();
							}
						}}
					/>
				</div>
			</div>
			<Modal ref={modalRef}>
				<Editing category={category} />
			</Modal>
		</>
	);
}

interface EditingProps {
	category: CategoryModel;
}
function Editing({ category }: EditingProps) {
	const [name, setName] = useState(category.name);
	const [description, setDescription] = useState(category.description);

	async function handleSend(){
		const res = await fetchGraphQL(UPDATE_CATEGORY, {
			key: 'editCategory',
			variables:{
				data: {
					name: name,
					description: description,
					code: category.code
				}
			}
		})

		console.log(res)

		location.reload()
	}

	return (
		<>
			<Input
				// value={name}
				placeholder={name}
				inputChange={setName}
				label="Nome"
				className="placeholder:italic placeholder:text-white/20"
				label-class="font-bold"
			/>
			<Input
				// value={description}
				placeholder={description}
				inputChange={setDescription}
				label="Descrição"
				className="placeholder:italic placeholder:text-white/20"
				label-class="font-bold"
			/>

			<button className="btn btn-primary w-40 mt-10" onClick={() => handleSend()}>Editar</button>
		</>
	);
}
