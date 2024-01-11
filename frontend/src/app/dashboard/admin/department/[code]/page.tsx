import { GET_DEPARTMENT_BY_CODE } from "@/lib/query/department";
import { DepartmentModel } from "@/models/departmentModel";
import { fetchGraphQL } from "@/utils";
import { PropsWithChildren } from "react";
import { IoIosClose } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import UnlinkUserFromDepartmentButton from "@/components/UnlinkUserFromDepartmentButton";

interface DepartmentProps extends PropsWithChildren {
	params: {
		code: string;
	};
}

export default async function Department({
	params: { code },
}: DepartmentProps) {
	const department = await fetchGraphQL<DepartmentModel>(
		GET_DEPARTMENT_BY_CODE,
		{
			key: "getDpartmentByCode",
			variables: {
				code,
			},
		}
	);
	const users = department.users;
	const flag = Boolean(users.length);

	console.log(department);

	return (
		<>
			<div className="flex w-full justify-center">
				<div className="flex flex-col rounded-lg border-2 text-center p-3">
					<p className="font-bold">{department.name}</p>
					<div className="divider my-0 after:bg-white before:bg-white" />
					<p className="italic mb-4">
						{department.description ? department.description : "--"}
					</p>
					<p className="font-bold mb-5">Membros</p>
					{flag && (
						<>
							<div className="overflow-x-auto">
								<table className="table table-xs">
									<thead>
										<tr>
											<th></th>
											<th>Nome</th>
											<th>Email</th>
											<th>-</th>
										</tr>
									</thead>
									<tbody>
										{users.map((u, i) => (
											<tr>
												<th>{i+1}</th>
												<td>{u.name}</td>
												<td>{u.email}</td>
												<td>
												{/* <IoIosClose/>
												<AiOutlineClose/> */}
												<UnlinkUserFromDepartmentButton departmentCode={department.code} user={u}>
													<ImCross className="hover:cursor-pointer text-red-500"/>
												</UnlinkUserFromDepartmentButton>
												</td>
											</tr>
										))}
									</tbody>
									<tfoot>
										<tr>
											<th></th>
											<th>Nome</th>
											<th>Email</th>
											<th>-</th>
										</tr>
									</tfoot>
								</table>
							</div>
						</>
					)}
					{!flag && <>{"-----"}</>}
				</div>
			</div>
		</>
	);
}
