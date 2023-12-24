"use client";
import { PropsWithChildren, useState } from "react";
import CreateSupplierButton from "@/components/CreateSupplierButton";
import { IoIosBusiness } from "react-icons/io";

interface SupplierCreateProps extends PropsWithChildren {}

export default function SupplierCreate({}: SupplierCreateProps) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [cnpj, setCNPJ] = useState("");
	const [phone, setPhone] = useState("");

	return (
		<>
			<div className="bg-gray-900 flex flex-col rounded-lg py-20 px-10 mx-auto items-center w-fit">
				<div className="flex gap-2 items-center mb-5">
					<IoIosBusiness className="min-w-[50px] min-h-[50px]"/>
					<h1 className="font-bold text-[2rem]">
						Criando um novo fornecedor
					</h1>
				</div>

				<div className="flex flex-col gap-5 items-center">
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
					<CreateSupplierButton className="w-fit text-white btn-primary mt-5" name={name} email={email} cnpj={cnpj} phone={phone}>
						Criar
					</CreateSupplierButton>
				</div>
			</div>
		</>
	);
}
