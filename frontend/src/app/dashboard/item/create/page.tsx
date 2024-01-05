"use client";
import FileInput from "@/components/FileInput";
import Input from "@/components/InputSimple";
import { CustomSelector, CustomTuple } from "@/components/Selector2";
import { CREATE_ITEM } from "@/lib/mutation/item";
import { GET_ALL_CATEGORIES } from "@/lib/query/category";
import { GET_ALL_SUPPLIERS } from "@/lib/query/supplier";
import { CategoryModel } from "@/models/categoryModel";
import { SupplierModel } from "@/models/supplierModel";
import { buildUser, fetchGraphQL } from "@/utils";
import {
	ChangeEvent,
	PropsWithChildren,
	useEffect,
	useRef,
	useState,
} from "react";
import Categories from "../../categories/page";

interface ItemCreateProps extends PropsWithChildren {}
// ITEM: name, description, categories, image
// LOT: supplier, itemAmount, price
// must fetch: categories, supplier
export default function ItemCreate({}: ItemCreateProps) {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const [itemAmount, _setItemAmount] = useState(0.0);
	function setItemAmount(data: string) {
		const value = parseFloat(data);
		_setItemAmount(value);
	}

	const [price, _setPrice] = useState(0.0);
	function setPrice(data: string) {
		const value = parseFloat(data);
		_setPrice(value);
	}

	const [image, setImage] = useState("");

	const [availableCategories, setAvailableCategories] = useState<
		CategoryModel[]
	>([]);
	const [availableSuppliers, setAvailableSuppliers] = useState<
		SupplierModel[]
	>([]);

	const [categoryOptions, setCategoryOptions] = useState<
		CustomTuple<string, string>[]
	>([]);
	const [supplierOptions, setSupplierOptions] = useState<
		CustomTuple<string, string>[]
	>([]);

	const [selectedCategory, setSelectedCategory] = useState<CategoryModel[]>(
		[]
	);
	function handleChangeCategory(event: ChangeEvent<HTMLSelectElement>) {
		const selectedValue: string = event.target.value;
		console.log(selectedValue);

		setSelectedCategory((prevstate) => [
			...prevstate,
			availableCategories.find((cat) => cat.code == selectedValue)!,
		]);
	}
	function categoryDelete(code: string) {
		setSelectedCategory((prevState) =>
			prevState.filter((cat) => cat.code != code)
		);
	}

	const [selectedSupplier, setSelectedSupplier] = useState<SupplierModel[]>(
		[]
	);
	function handleChangeSupplier(event: ChangeEvent<HTMLSelectElement>) {
		const selectedValue: string = event.target.value;
		console.log(`quero mudar para: ${selectedValue}`);

		const newSupplier = availableSuppliers.find(
			(sup) => sup.cnpj == selectedValue
		);
		console.log(newSupplier);

		setSelectedSupplier((prevState) => [...prevState, newSupplier!]);
	}
	function supplierDelete(cnpj: string) {
		setSelectedSupplier((prevState) =>
			prevState.filter((sup) => sup.cnpj != cnpj)
		);
	}

	async function fetchOptions() {
		const categories = await fetchGraphQL<CategoryModel[]>(
			GET_ALL_CATEGORIES,
			{
				key: "categories",
			}
		);

		const suppliers = await fetchGraphQL<SupplierModel[]>(
			GET_ALL_SUPPLIERS,
			{
				key: "getAllSuppliers",
			}
		);

		setAvailableCategories(categories);
		setAvailableSuppliers(suppliers);
	}

	async function handleSend() {
		const user = await buildUser();

		if (user) {
			const newItem = await fetchGraphQL(CREATE_ITEM, {
				key: "createItem",
				variables: {
					data: {
						name,
						image,
						description,
						storage: {
							userId: user.id,
						},
						categories: selectedCategory.map((cat) => cat.code),
						lot: {
							price,
							itemAmount,
							supplier: selectedSupplier[0].cnpj,
						},
					},
				},
			});
		}
	}

	useEffect(() => {
		fetchOptions();
	}, []);

	useEffect(() => {
		setCategoryOptions(availableCategories.map((el) => [el.code, el.name]));
	}, [availableCategories]);

	useEffect(() => {
		setSupplierOptions(availableSuppliers.map((el) => [el.cnpj, el.name]));
	}, [availableSuppliers]);

	// ITEM: name, description, categories, image
	// LOT: supplier, itemAmount, price
	// must fetch: categories, supplier

	return (
		<>
			<div className="bg-gray-800 flex flex-col rounded-lg p-3 items-center">
				<h1 className="font-bold text-[2rem] w-full text-white rounded-lg mb-5">
					Criando um novo item
				</h1>

				<div className="flex flex-col gap-10">
					<div className="flex gap-3">
						<Input
							inputChange={setName}
							value={name}
							label="Nome"
							label-class="font-bold"
						/>
						<Input
							inputChange={setDescription}
							value={description}
							label="Descrição"
							label-class="font-bold"
						/>
					</div>
					<div className="flex gap-3">
						<Input
							inputChange={setItemAmount}
							value={itemAmount}
							label="Quantidade"
							label-class="font-bold"
						/>
						<Input
							inputChange={setPrice}
							value={price}
							label="Preço (unitário)"
							label-class="font-bold"
						/>
					</div>
					<div className="flex justify-between">
						<CustomSelector
							values={categoryOptions}
							handleChange={handleChangeCategory}
							deleteValue={categoryDelete}
							selectedValue={selectedCategory.map((cat) => [
								cat.code,
								cat.name,
							])}
							label="Categorias"
						/>
						<CustomSelector
							values={supplierOptions}
							handleChange={handleChangeSupplier}
							deleteValue={supplierDelete}
							selectedValue={selectedSupplier.map((sup) => [
								sup.cnpj,
								sup.name,
							])}
							label="Fornecedores"
						/>
					</div>

					<div className="flex flex-col">
						<p className="font-bold">
							Foto{" "}
							<span className="font-normal italic">
								(opcional)
							</span>
						</p>
						<FileInput
							className=""
							label-class="bg-slate-900 font-bold"
							ref={fileInputRef}
							inputChange={setImage}
						/>
					</div>

					<button className="btn" onClick={handleSend}>
						Criar
					</button>
				</div>
			</div>
		</>
	);
}
