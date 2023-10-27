"use client";
import { UserModel } from "@/models/userModel";
import { ChangeEvent, PropsWithChildren, useEffect, useState } from "react";

interface UsersListProps extends PropsWithChildren {
	AllUsers: any[];
}

export default function UsersList({ AllUsers }: UsersListProps) {
	const users: UserModel[] = AllUsers;
	const [selectValue, setSelectValue] = useState(filterOptions[0].value);
	const [selectLabel, setSelectLabel] = useState(filterOptions[0].label);
	const [filteredUsers, setFilteredUsers] = useState(users);
	const [filterValue, setFilterValue] = useState("");

	function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
		const selectedValue: string = event.target.value;
		console.log(selectedValue);
		const option = getOptionByValue(selectedValue);

		if (option) {
			setSelectValue(selectedValue);
			setSelectLabel(selectedValue);
		}
	}

    useEffect(() => {
        if(filterValue.length == 0){
            setFilteredUsers(users)
            return;
        }

        switch (selectValue) {

            case 'all':
                setFilteredUsers(users)
                break;

            case 'name':
                setFilteredUsers(users.filter(u => {
                    console.log(`procurando ${filterValue} em ${u.name}`)
                    u.name.includes(filterValue)
                }))
                break;

            case 'email':
                setFilteredUsers(users.filter(u => {
                    console.log(`procurando ${filterValue} em ${u.email}`)
                    u.email.includes(filterValue)
                }))
                break;
        
            default:
                setFilteredUsers([])
                break;
        }
    }, [selectValue, filterValue])

    useEffect(() => {
        console.log(filterValue)
    }, [filterValue])

	return (
		<>
			<select
				aria-label="users-list-filter"
				className="select w-full max-w-xs"
				value={selectValue}
				onChange={handleSelectChange}
			>
				{filterOptions.map((fOpt, index) => (
					<option key={index} value={fOpt.value}>
						{fOpt.label}
					</option>
				))}
			</select>
			{selectValue != "all" && (
				<>
					<input
						type="text"
						placeholder={`Filtrar por ${selectLabel}`}
						value={filterValue}
						onChange={(e) => {
                            setFilterValue(e.target.value)
                        }}
					/>
				</>
			)}
			<div className="divider" />
			{filteredUsers &&
				filteredUsers.map((user) => (
					<div key={user.id}>
						{user.name}
						<br />
						{user.email}
					</div>
				))}
		</>
	);
}

type FilterOption = {
	label: string;
	value: string;
};

const filterOptions: FilterOption[] = [
	{ label: "Tudo", value: "all" },
	{ label: "Nome", value: "name" },
	{ label: "Email", value: "email" },
	{ label: "Cargo", value: "roles" },
	{ label: "Departamento", value: "department" },
];

function getOptionByValue(value: string) {
	return filterOptions.find((option) => option.value === value);
}
