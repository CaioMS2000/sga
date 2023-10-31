"use client";
import { GET_DEPARTMENTS } from "@/lib/query/department";
import { DepartmentModel } from "@/models/departmentModel";
import { fetchGraphQL } from "@/utils";
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

import { PropsWithChildren, useEffect, useState } from "react";

interface CreateUserProps extends PropsWithChildren {}

export default function CreateUser({}: CreateUserProps) {
	const [departments, setDepartments] = useState([] as DepartmentModel[]);

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

	return (
		<>
			<div className="bg-darkGreen flex flex-col rounded-lg py-3 items-center">
				<h1 className="font-bold text-[2rem] bg-white w-fit text-darkGreen p-2 rounded-lg mb-5">
					Criando um novo usuário
				</h1>
				<div className="grid grid-rows-3 grid-cols-1 gap-2">
					<div className="grid grid-cols-3 gap-2">
                        <input
                            type="text"
                            placeholder="Nome"
                            className="input input-bordered border-4 w-full max-w-xs bg-opacity-0"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered border-4 w-full max-w-xs bg-opacity-0"
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            className="input input-bordered border-4 w-full max-w-xs bg-opacity-0"
                        />
                    </div>

					<div className="grid grid-cols-2 grid-rows-1 gap-2">
                        <select
                            aria-label="department-selector"
                            name="department-selector"
                            id="department-selector"
                            className=""
                        ></select>
                        <select
                            aria-label="role-selector"
                            name="role-selector"
                            id="role-selector"
                            className=""
                        ></select>
                    </div>

					<div className="grid grid-cols-1">
                        <div className="flex justify-center">
                            <CreateUserButton className="w-fit">Criar</CreateUserButton>
                        </div>
                    </div>
				</div>
			</div>
		</>
	);
}
