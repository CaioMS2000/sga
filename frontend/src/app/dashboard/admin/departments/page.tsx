import { GET_DEPARTMENTS } from "@/lib/query/department";
import { DepartmentModel } from "@/models/departmentModel";
import { fetchGraphQL } from "@/utils";
import { PropsWithChildren } from "react";

interface DepartmentsProps extends PropsWithChildren {}

export default async function Departments({}: DepartmentsProps) {
	const departments = await fetchGraphQL<DepartmentModel[]>(GET_DEPARTMENTS, {
		key: "departments",
	});

	console.log(departments);

	return (
		<>
			<a
				className="font-bold underline underline-offset-8 text-white/20 hover:text-white/70"
				href="/dashboard/admin/departments/create"
			>
				Adicionar mais
			</a>
			<div className="grid grid-cols-3 gap-4 mt-10">
				{departments.map((dep) => (
					<>
						<a href={`/dashboard/admin/department/${dep.code}`}>
							<div className="flex justify-center">
								<div className="flex flex-col border-2 rounded-lg p-3 w-full">
									<div className="flex justify-between">
										<p className="font-bold">{dep.name}</p>
										<p className="italic">
											{dep.employees} funcionário
											{dep.employees == 1 ? "" : "s"}
										</p>
									</div>
									<div className="divider mt-1 before:bg-white after:bg-white" />
									<p className="font-semibold">
										{dep.description}
									</p>
								</div>
							</div>
						</a>
					</>
				))}
			</div>
		</>
	);
}
