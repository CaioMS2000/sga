"use client";
import { CREATE_SUPPLIER } from "@/lib/mutation/supplier";
import { UserModel } from "@/models/userModel";
import { fetchGraphQL } from "@/utils";
import { HTMLProps, PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren, HTMLProps<HTMLButtonElement> {
	name: string
	cnpj: string
	email: string
	phone: string
}

export default function Button({ children, name, cnpj, email, phone, ...rest }: ButtonProps) {
	async function handleCreateSupplier() {
		const supplier = await fetchGraphQL(CREATE_SUPPLIER, {
			key: "createSupplier",
			variables: {supplier:{name, cnpj, email, phone}},
		});

		console.log(supplier)

		location.reload();
	}

	return (
		<>
			<button
				{...rest}
				className={"btn " + ` ${rest.className}`}
				type="button"
				onClick={handleCreateSupplier}
			>
				{children}
			</button>
		</>
	);
}
