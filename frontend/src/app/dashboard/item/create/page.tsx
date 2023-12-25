"use client";
import { CustomSelector, CustomTuple } from "@/components/Selector2";
import { GET_ALL_CATEGORIES } from "@/lib/query/category";
import { GET_ALL_SUPPLIERS } from "@/lib/query/supplier";
import { CategoryModel } from "@/models/categoryModel";
import { SupplierModel } from "@/models/supplierModel";
import { fetchGraphQL } from "@/utils";
import { ChangeEvent, PropsWithChildren, useEffect, useState } from "react";

interface ItemCreateProps extends PropsWithChildren {}
// ITEM: name, description, categories, image
// LOT: supplier, itemAmount, price
// must fetch: categories, supplier
export default function ItemCreate({}: ItemCreateProps) {
	const [availableCategories, setAvailableCategories] = useState<CategoryModel[]>([])
	const [availableSuppliers, setAvailableSuppliers] = useState<SupplierModel[]>([])

	const [categoryOptions, setCategoryOptions] = useState<CustomTuple<string, string>[]>([])
	const [supplierOptions, setSupplierOptions] = useState<CustomTuple<string, string>[]>([])

	const [selectedCategory, setSelectedCategory] = useState<CategoryModel[]>([])
	function handleChangeCategory(event: ChangeEvent<HTMLSelectElement>){
		const selectedValue: string = event.target.value;
		console.log(selectedValue)

		setSelectedCategory(prevstate => [...prevstate, availableCategories.find(cat => cat.code == selectedValue)!])
	}
	function categoryDelete(code: string){
		setSelectedCategory(prevState => prevState.filter(cat => cat.code != code))
	}

	const [selectedSupplier, setSelectedSupplier] = useState<SupplierModel|null>(null)
	function handleChangeSupplier(event: ChangeEvent<HTMLSelectElement>){
		const selectedValue: string = event.target.value;
		console.log(selectedValue)

		setSelectedSupplier(availableSuppliers.find(sup => sup.cnpj == selectedValue)!)
	}
	function supplierDelete(){
		setSelectedSupplier(null)
	}
	
	async function fetchOptions(){
		const categories = await fetchGraphQL<CategoryModel[]>(GET_ALL_CATEGORIES, {
			key: 'categories'
		})
		
		const suppliers = await fetchGraphQL<SupplierModel[]>(GET_ALL_SUPPLIERS, {
			key: 'getAllSuppliers'
		})

		setAvailableCategories(categories)
		setAvailableSuppliers(suppliers)

	}

	useEffect(() => {
		fetchOptions()
	}, [])

	useEffect(() => {
		setCategoryOptions(availableCategories.map(el => [el.code, el.name]))
	}, [availableCategories])

	useEffect(() => {
		setSupplierOptions(availableSuppliers.map(el => [el.cnpj, el.name]))
	}, [availableSuppliers])

	useEffect(() => {if(selectedCategory && selectedCategory.length) console.log(selectedCategory);}, [selectedCategory])
	useEffect(() => {if(selectedSupplier) console.log(selectedSupplier);}, [selectedSupplier])

	return (
		<>
			<div className="bg-gray-800 flex flex-col rounded-lg p-3 items-center">
				<h1 className="font-bold text-[2rem] w-full text-white rounded-lg">
					Criando um novo item
				</h1>

				<CustomSelector multipleValues={true} values={categoryOptions} handleChange={handleChangeCategory} deleteValue={categoryDelete} selectedValue={selectedCategory.map(cat => [cat.code, cat.name])} label="Categorias" />
				
				<CustomSelector values={supplierOptions} handleChange={handleChangeSupplier} deleteValue={supplierDelete} selectedValue={selectedSupplier?.cnpj} label="Fornecedores" />
			</div>
		</>
	);
}
