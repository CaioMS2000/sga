import UsersList from "@/components/UsersList";
import { GET_USERS } from "@/lib/query/user";
import { fetchGraphQL } from "@/utils";
import { PropsWithChildren } from "react";

interface AdminUsersProps extends PropsWithChildren {}

export default async function AdminUsers({}: AdminUsersProps) {
    const users = await fetchGraphQL(GET_USERS, {
		key: 'users'
	})

	return (
		<>
		<UsersList AllUsers={users}/>
		</>
	);
}
