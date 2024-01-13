"use client";
import FileInput from "@/components/FileInput";
import Input from "@/components/InputSimple";
import { CustomSelector, CustomTuple } from "@/components/Selector2";
import { CREATE_ITEM, CREATE_ITEMS } from "@/lib/mutation/item";
import { GET_ALL_CATEGORIES } from "@/lib/query/category";
import { GET_ALL_SUPPLIERS } from "@/lib/query/supplier";
import { CategoryModel } from "@/models/categoryModel";
import { SupplierModel } from "@/models/supplierModel";
import { buildUser, fetchGraphQL, translate } from "@/utils";
import {
	ChangeEvent,
	PropsWithChildren,
	forwardRef,
	useEffect,
	useRef,
	useState,
} from "react";
import Categories from "../../categories/page";
import Toast from "@/components/Toast";
import { FaPlus } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

interface ItemFormData {
	name: string;
	description: string;
	amount: string;
	price: string;
	image: string;
	category: CategoryModel[];
	supplier: SupplierModel | null;
}

const emptyFormData: ItemFormData = {
	amount: "0",
	category: [],
	description: "",
	image: "",
	name: "",
	price: "0",
	supplier: null,
};

type ItemFormKeys = keyof ItemFormData;

interface ItemCreateProps extends PropsWithChildren {}

export default function ItemCreate({}: ItemCreateProps) {
	const [createItemFlag, setCreateItemFlag] = useState(false);
	const [hasError, setHasError] = useState({erro: false, message:''})
	const [availableCategories, setAvailableCategories] = useState<
		CategoryModel[]
	>([]);
	const [availableSuppliers, setAvailableSuppliers] = useState<
		SupplierModel[]
	>([]);
	const [forms, setForms] = useState<ItemFormData[]>([{ ...emptyFormData }]);

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

	function update(
		formIndex: number,
		key: ItemFormKeys,
		data: string | CategoryModel[] | SupplierModel
	) {
		setForms((prevState) =>
			prevState.map((form, index) => {
				if (index === formIndex) {
					if (Object.keys(form).includes(key)) {
						const newData = { [key]: data };
						const updatedForm = { ...form, ...newData };
						return updatedForm;
					}
				}

				return form;
			})
		);
	}

	function removeForm(index: number) {
		setForms((prevState) => prevState.filter((f, i) => i != index));
	}

	async function handleSend() {
		const user = await buildUser();

		if (!user) return;

		if (
			// forms.some((form, i) => {
			// 	if (!form.amount) return true;
			// 	if (!form.category) return true;
			// 	if (!form.name) return true;
			// 	if (!form.price) return true;
			// 	if (!form.supplier) return true;

			// 	return false;
			// })
			forms.some((form, i) => {
				let invalidField = ''
				if (!form.amount) invalidField='amount';
				else if (!form.category) invalidField='category';
				else if (!form.name) invalidField='name';
				else if (!form.price) invalidField='price';
				else if (!form.supplier) invalidField='supplier';

				if(invalidField.length){
					setHasError({erro: true, message: `No formulário ${i+1} está faltando o campo ${translate(invalidField)}`})
					return true
				}

				return false;
			})
		)
			return;

		const res = await fetchGraphQL<Boolean>(CREATE_ITEMS, {
			key: "createItems",
			variables: {
				data: forms.map((form) => {
					const data = {
						name: form.name,
						image: form.image,
						description: form.description,
						storage: {
							userId: user.id,
						},
						categories: form.category.map((cat) => cat.code),
						lot: {
							supplier: form.supplier?.cnpj,
							itemAmount: parseFloat(form.amount),
							price: parseFloat(form.price),
						},
					};

					return data;
				}),
			},
		});

		console.log(res);
		setForms([{ ...emptyFormData }]);
		setCreateItemFlag(res.valueOf());
		setTimeout(() => setCreateItemFlag(false), 2 * 1000);
	}

	useEffect(() => {
		fetchOptions();
	}, []);

	useEffect(() => {
		console.clear();
		forms.forEach((f) => console.log(f));
	}, [forms]);

	useEffect(() => {
		if(hasError.erro){
			setTimeout(() => {setHasError({erro: false, message:''})}, 2 * 1000)
		}
	}, [hasError]);

	return (
		<>
			<div className="bg-gray-800 flex flex-col rounded-lg p-3 items-center">
				<h1 className="font-bold text-[2rem] w-full text-white rounded-lg">
					Criando um novo item
				</h1>
				<span className="italic mb-5">
					Todos os itens que pertencem à mesma nota fiscal devem ser
					inseridos ao mesmo tempo
				</span>

				<div className="flex flex-col gap-10">
					{forms.map((form, index) => (
						<>
							<Content
								key={index}
								index={index}
								amount={form.amount}
								category={form.category}
								description={form.description}
								image={form.image}
								name={form.name}
								price={form.price}
								supplier={form.supplier}
								categoryOptions={availableCategories}
								supplierOptions={availableSuppliers}
								inputChange={update}
								removeForm={removeForm}
							/>
						</>
					))}
				</div>

				<div className="flex w-full pl-10 mt-5">
					<button
						className="btn"
						onClick={() =>
							setForms((prevState) => [
								...prevState,
								{ ...emptyFormData },
							])
						}
					>
						Mais
						<FaPlus className="text-green-500" />
					</button>
				</div>
				<div className="flex">
					<button
						className="py-3 px-5 rounded-lg font-bold text-2xl text-white bg-purple-900 hover:bg-purple-950"
						onClick={handleSend}
					>
						Criar
					</button>
				</div>
			</div>
			{createItemFlag && (
				<Toast className="alert-success">
					<span className="text-xl font-bold mx-auto">
						Item criado com sucesso
					</span>
				</Toast>
			)}
			{hasError.erro && (
				<Toast className="alert-error">
					<span className="text-xl font-bold mx-auto">
						{hasError.message}
					</span>
				</Toast>
			)}
		</>
	);
}

interface ContentProps extends ItemFormData {
	categoryOptions: CategoryModel[];
	supplierOptions: SupplierModel[];
	index: number;
	inputChange: (
		formIndex: number,
		key: ItemFormKeys,
		data: string | CategoryModel[] | SupplierModel
	) => void;
	removeForm: (index: number) => void;
}

const Content = forwardRef<HTMLInputElement, ContentProps>(function (
	{
		name,
		description,
		amount,
		price,
		image,
		index,
		inputChange,
		removeForm,
		category,
		supplier,
		categoryOptions,
		supplierOptions,
	}: ContentProps,
	ref
) {
	return (
		<>
			{index > 0 && (
				<div className="flex">
					<IoIosClose
						className="min-w-[40px] min-h-[40px] hover:cursor-pointer text-red-500 border-2"
						onClick={() => removeForm(index)}
					/>
				</div>
			)}
			<div className="flex flex-col gap-10">
				<div className="flex gap-3">
					<Input
						value={name}
						label="Nome"
						label-class="font-bold"
						inputChange={(name: string) => {
							inputChange(index, "name", name);
						}}
					/>
					<Input
						value={description}
						label="Descrição"
						label-class="font-bold"
						inputChange={(description: string) => {
							inputChange(index, "description", description);
						}}
					/>
				</div>

				<div className="flex gap-3">
					<Input
						value={amount}
						label="Quantidade"
						label-class="font-bold"
						inputChange={(amount: string) => {
							inputChange(index, "amount", amount);
						}}
					/>
					<Input
						value={price}
						label="Preço (unitário)"
						label-class="font-bold"
						inputChange={(price: string) => {
							inputChange(index, "price", price);
						}}
					/>
				</div>

				<div className="flex justify-between">
					<CustomSelector
						values={categoryOptions.map((cat) => [
							cat.code,
							cat.name,
						])}
						handleChange={(
							event: ChangeEvent<HTMLSelectElement>
						) => {
							const selectedValue: string = event.target.value;
							const selectedCategory = categoryOptions.find(
								(cat) => cat.code == selectedValue
							);

							inputChange(index, "category", [
								...category,
								selectedCategory!,
							]);
						}}
						deleteValue={() => {}}
						selectedValue={category.map((cat) => [
							cat.code,
							cat.name,
						])}
						label="Categorias"
					/>
					<CustomSelector
						values={supplierOptions.map((sup) => [
							sup.cnpj,
							sup.name,
						])}
						handleChange={(
							event: ChangeEvent<HTMLSelectElement>
						) => {
							const selectedValue: string = event.target.value;
							const selectedSupplier = supplierOptions.find(
								(sup) => sup.cnpj == selectedValue
							);

							inputChange(index, "supplier", selectedSupplier!);
						}}
						deleteValue={() => {}}
						selectedValue={
							supplier == null
								? []
								: [[supplier.cnpj, supplier.name]]
						}
						label="Fornecedores"
					/>
				</div>

				<div className="flex flex-col">
					<p className="font-bold">
						Foto{" "}
						<span className="font-normal italic">(opcional)</span>
					</p>
					<FileInput
						className=""
						label-class="bg-slate-900 font-bold"
						ref={ref}
						inputChange={(image: string) => {
							inputChange(index, "image", image);
						}}
					/>
				</div>
			</div>
		</>
	);
});
