"use client";
import Input from "@/components/InputSimple";
import Toast from "@/components/Toast";
import { CREATE_DEPARTMENT } from "@/lib/mutation/department";
import { DepartmentModel } from "@/models/departmentModel";
import { fetchGraphQL } from "@/utils";
import { PropsWithChildren, useState } from "react";

interface DepartmentCreateProps extends PropsWithChildren {}

export default function DepartmentCreate({}: DepartmentCreateProps) {
    const [createDepartmentFlag, setCreateDepartmentFlag] = useState(false)
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	function clearInputs() {
		setName("");
		setDescription("");
	}

	async function handleSend() {
        const department = await fetchGraphQL<DepartmentModel>(CREATE_DEPARTMENT, {
            key: 'createDepartment',
            variables: {
                data: {
                    name,
                    description
                }
            }
        })
        console.log(department)

        clearInputs()
        setCreateDepartmentFlag(true)
        // setTimeout(() => setCreateDepartmentFlag(false), 2 * 1000)
    }

	return (
		<>
			<div className="flex flex-col w-fit bg-gray-900 p-10 gap-4 mx-auto rounded-lg">
                <h3 className="font-bold text-2xl underline">Novo departamento</h3>
                <Input
                    placeholder="ex: DRH"
                    inputChange={setName}
                    label="Nome"
                    className=""
                    super-class="min-w-[350px]"
                    label-class="font-bold"
                />
                <Input
                    placeholder="ex: departamento de recursos humanos"
                    inputChange={setDescription}
                    label="Descrição"
                    className=""
                    super-class="min-w-[350px]"
                    label-class="font-bold"
                />
                <button className="btn bg-purple-900 hover:bg-purple-950" onClick={handleSend}>Criar</button>
            </div>
            {createDepartmentFlag && (
				<Toast className="alert-success">
					<span className="text-xl font-bold mx-auto">Departamento criado com sucesso</span>
				</Toast>
			)}
		</>
	);
}
