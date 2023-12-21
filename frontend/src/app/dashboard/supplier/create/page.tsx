"use client";
import { PropsWithChildren, useState } from "react";
import CreateSupplierButton from "@/components/CreateSupplierButton";

interface SupplierCreateProps extends PropsWithChildren {}

export default function SupplierCreate({}: SupplierCreateProps) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [cnpj, setCNPJ] = useState("");
	const [phone, setPhone] = useState("");

	return (
		<>
			<div className="bg-darkGreen flex flex-col rounded-lg p-5 mx-auto items-center w-fit">
				<h1 className="font-bold text-[2rem] bg-white w-fit text-darkGreen p-2 rounded-lg mb-5">
					Criando um novo fornecedor
				</h1>

				<div className="flex flex-col gap-3 items-center">
					<div className="flex gap-3">
						<input
							type="text"
							placeholder="CNPJ"
							className="input input-bordered border-4 w-full max-w-xs bg-opacity-0"
							value={cnpj}
							onChange={(e) => {
								setCNPJ(e.target.value);
							}}
						/>
						<input
							type="text"
							placeholder="Nome"
							className="input input-bordered border-4 w-full max-w-xs bg-opacity-0 bg-red-100"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
					</div>
					<div className="flex gap-3">
						<input
							type="tel"
							placeholder="Telefone"
							className="input input-bordered border-4 w-full max-w-xs bg-opacity-0"
							value={phone}
							onChange={(e) => {
								setPhone(e.target.value);
							}}
						/>
						<input
							type="email"
							placeholder="Email"
							className="input input-bordered border-4 w-full max-w-xs bg-opacity-0"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					</div>
					<CreateSupplierButton className="w-fit text-white bg-emerald-800 border-emerald-800" name={name} email={email} cnpj={cnpj} phone={phone}>
						Criar
					</CreateSupplierButton>
				</div>
			</div>
		</>
	);
}
