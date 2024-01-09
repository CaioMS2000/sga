import SupplierCard from "@/components/SupplierCard";
import { GET_ALL_SUPPLIERS } from "@/lib/query/supplier";
import { SupplierModel } from "@/models/supplierModel";
import { fetchGraphQL } from "@/utils";
import { PropsWithChildren } from "react";

interface SuppliersProps extends PropsWithChildren {}

export default async function Suppliers({}: SuppliersProps) {
	const res = await fetchGraphQL<SupplierModel[]>(GET_ALL_SUPPLIERS, {
		key: "getAllSuppliers",
	});

	return (
		<div className="w-full flex flex-col">
			<a
				className="font-bold underline underline-offset-8 text-white/20 hover:text-white/70"
				href="/dashboard/supplier/create"
			>
				Adicionar mais
			</a>
			<h2 className="mx-auto font-bold text-xl">Fornecedores</h2>
			{res.map((sup) => (
				<SupplierCard className="mt-5" supplier={sup} />
			))}
		</div>
	);
}
