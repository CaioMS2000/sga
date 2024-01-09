"use client";
import { GET_DEPARTMENTS } from "@/lib/query/department";
import { DepartmentModel } from "@/models/departmentModel";
import { departmentFromCode, fetchGraphQL, stringToRole } from "@/utils";
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
import { CREATE_USER } from "@/lib/mutation/user";
import Toast from "@/components/Toast";

type RoleOrNone = "none" | Role;

interface CreateUserProps extends PropsWithChildren {}

export default function CreateUser({}: CreateUserProps) {
	const [createUserFlag, setCreateUserFlag] = useState(false)
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [departments, setDepartments] = useState([] as DepartmentModel[]);

	const [selectedRole, setSelectedRole] = useState<RoleOrNone[]>(["none"]);
	function handleRoleChange(event: ChangeEvent<HTMLSelectElement>) {
		const selectedValue: string = event.target.value;

		const fromEnum = stringToRole(selectedValue);
		if (fromEnum) {
			setSelectedRole((prevState) => {
				const newSet = new Set([...prevState, fromEnum]);
				const asArray = Array.from(newSet);
				return asArray;
			});
		} else {
			setSelectedRole((prevState) => ["none"]);
		}
	}
	function roleDelete(role: Role) {
		setSelectedRole((prevState) => prevState.filter((r) => r != role));
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

	function clearInputs(){
		setName('')
		setEmail('')
		setPassword('')
		setSelectedRole(['none'])
		setSelectedDepartment('')
	}
	
	async function handleCreateUser() {

		const user = await fetchGraphQL(CREATE_USER, {
			key: "createUser",
			variables: {
				data: {
					profileImage: '',
					departmentCode: selectedDepartment,
					name: name,
					email: email,
					password: password,
					roles: selectedRole.filter(role => role != "none"),
				},
			},
		});

		clearInputs()
		setCreateUserFlag(true);
		setTimeout(() => setCreateUserFlag(false), 2 * 1000)
		// location.reload();
	}

	useEffect(() => {
		fetchDepartments();

		return () => {};
	}, []);

	return (
		<>
			<div className="bg-gray-900 flex flex-col rounded-lg p-3 py-10 items-center">
				<h1 className="font-bold text-[2rem] bg-white w-fit text-black p-2 rounded-lg mb-5">
					Criando um novo usuário
				</h1>

				<div className="flex flex-col gap-3 items-center">
					<div className="flex gap-3">
						<input
							type="text"
							placeholder="Nome"
							className="input input-bordered border-4 w-full max-w-xs bg-opacity-0 bg-red-100"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
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
					<div className="flex gap-3">
						<CustomSelector
							className="bg-opacity-0 border-4 input-bordered min-w-[20rem]"
							handleChange={handleRoleChange}
							selectedValue={selectedRole.filter(
								(r) => r != "none"
							)}
							values={[
								[Admin, Admin],
								[Analyst, Analyst],
								[Auditor, Auditor],
								[Requester, Requester],
								[StoreKeeper, StoreKeeper],
								[Manager, Manager],
							]}
							optionLabel="Cargos"
							multipleValues={true}
							deleteOption={roleDelete}
						/>
						<CustomSelector
							className="bg-opacity-0 border-4 input-bordered min-w-[20rem]"
							values={departments.map((dep) => [
								dep.code,
								dep.name,
							])}
							optionLabel="Departamentos"
							selectedValue={selectedDepartment}
							value={selectedDepartment}
							handleChange={handleDepartmentChange}
						/>
					</div>
					<button className="btn w-fit text-white bg-purple-800 hover:bg-purple-900 border-purple-800 hover:border-purple-900" onClick={handleCreateUser}>
						Criar
					</button>
				</div>
			</div>
			{createUserFlag && (
				<Toast className="alert-success">
					<span className="text-xl font-bold">Usuário criado com sucesso</span>
				</Toast>
			)}
		</>
	);
}
