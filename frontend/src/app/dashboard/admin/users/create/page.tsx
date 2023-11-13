"use client";
import { GET_DEPARTMENTS } from "@/lib/query/department";
import { DepartmentModel } from "@/models/departmentModel";
import { departmentFromCode, fetchGraphQL, stringToRole } from "@/utils";
import CreateUserButton from "@/components/CreateUserButton";
import {
	Admin,
	Analyst,
	Auditor,
	Manager,
	Requester,
	Role,
	StoreKeeper,
} from "@/models/enum";

import { ChangeEvent, PropsWithChildren, useEffect, useState } from "react";
import { DepartmentSelector } from "@/components/DepartmentSelector";
import { RolesSelector } from "@/components/RolesSelector";
import { CustomSelector } from "@/components/Selector";

type RoleOrNone = "none" | Role;

interface CreateUserProps extends PropsWithChildren {}

export default function CreateUser({}: CreateUserProps) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [departments, setDepartments] = useState([] as DepartmentModel[]);

	const [selectedRole, setSelectedRole] = useState<RoleOrNone[]>(["none"]);
	function handleRoleChange(event: ChangeEvent<HTMLSelectElement>) {
		const selectedValue: string = event.target.value;

		const fromEnum = stringToRole(selectedValue);
		if(fromEnum){
			setSelectedRole(prevState => {
				const newSet = new Set([...prevState, fromEnum])
				const asArray = Array.from(newSet)
				return asArray
			})
		}
		else{
			setSelectedRole(prevState => ["none"])
		}
	}

	const [selectedDepartment, setSelectedDepartment] = useState("none");
	function handleDepartmentChange(event: ChangeEvent<HTMLSelectElement>) {
		const selectedValue: string = event.target.value;

		setSelectedDepartment(selectedValue);
	}

	async function fetchDepartments() {
		const res = await fetchGraphQL(GET_DEPARTMENTS, {
			key: "departments",
		});
		setDepartments(res);
	}

	useEffect(() => {
		fetchDepartments();

		return () => {};
	}, []);

	useEffect(() => {
		console.log(selectedRole);

		return () => {};
	}, [selectedRole]);

	useEffect(() => {
		console.log(selectedDepartment);

		return () => {};
	}, [selectedDepartment]);

	return (
		<>
			<div className="bg-darkGreen flex flex-col rounded-lg py-3 items-center">
				<h1 className="font-bold text-[2rem] bg-white w-fit text-darkGreen p-2 rounded-lg mb-5">
					Criando um novo usuário
				</h1>
				<div className="grid grid-rows-3 grid-cols-1 gap-10">
					<div className="grid grid-cols-3 gap-2">
						<div className="flex justify-center">
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
						<div className="flex justify-center">
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
						<div className="flex justify-center">
							<input
								type="password"
								placeholder="Senha"
								className="input input-bordered border-4 w-full max-w-xs bg-opacity-0"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 grid-rows-1 gap-2 justify-center">
						<div className="flex justify-center">
							<CustomSelector
								className="bg-opacity-0 border-4 input-bordered min-w-[20rem]"
								handleChange={handleRoleChange}
								selectedValue={selectedRole.filter(r => r != 'none')}
								values={[[Admin, Admin], [Analyst, Analyst], [Auditor, Auditor], [Requester, Requester], [StoreKeeper, StoreKeeper], [Manager, Manager]]}
								optionLabel="Cargos"
								multipleValues={true}
							/>
						</div>
						<div className="flex justify-center">
							<CustomSelector
								className="bg-opacity-0 border-4 input-bordered min-w-[20rem]"
								values={departments.map(dep => [dep.code, dep.name])}
								optionLabel="Departamentos"
								selectedValue={selectedDepartment}
								value={selectedDepartment}
								handleChange={handleDepartmentChange}
							/>
						</div>
					</div>

					<div className="grid grid-cols-1">
						<div className="flex justify-center">
							<CreateUserButton
								className="w-fit text-white bg-emerald-800 border-emerald-800"
								userData={{
									department: [
										departmentFromCode(
											selectedDepartment,
											departments
										)!,
									],
									// @ts-expect-error
									roles: selectedRole.filter(r => r != 'none'),
									profileImagePath: "",
									email,
									password,
									name,
								}}
							>
								Criar
							</CreateUserButton>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
