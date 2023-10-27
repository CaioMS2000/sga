import { GET_USERS } from "@/lib/query/user";
import { fetchGraphQL } from "@/utils";
import { PropsWithChildren } from "react";

interface AdminUsersProps extends PropsWithChildren {}

export default async function AdminUsers({}: AdminUsersProps) {
    const users = await fetchGraphQL(GET_USERS)
    console.log(users)

	return (
		<>
			<select
				aria-label="users-list-filter"
				className="select w-full max-w-xs"
			>
				<option disabled selected>
					Filtro
				</option>
				<option>Homer</option>
				<option>Marge</option>
				<option>Bart</option>
				<option>Lisa</option>
				<option>Maggie</option>
			</select>
			<div className="divider" />
		</>
	);
}

const filterOptions = [
    {name: 'all', filter: () => {}},
    {name: 'name', filter: () => {}},
    {name: 'email', filter: () => {}},
    {name: 'roles', filter: () => {}},
    {name: 'department', filter: () => {}}
];
