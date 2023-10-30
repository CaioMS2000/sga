"use client";
import { UserModel } from "@/models/userModel";
import { ChangeEvent, PropsWithChildren, useEffect, useState } from "react";
import { Admin, Analyst, Auditor, Manager, Requester, Role, StoreKeeper } from "@/models/enum";
import { fetchGraphQL, stringToRole } from "@/utils";
import { DepartmentModel } from "@/models/departmentModel";
import { GET_DEPARTMENTS } from "@/lib/query/department";

interface UsersListProps extends PropsWithChildren {
	AllUsers: any[];
}

export default function UsersList({ AllUsers }: UsersListProps) {
	const users: UserModel[] = AllUsers;
	const [selectValue, setSelectValue] = useState(filterOptions[0].value);
	const [selectLabel, setSelectLabel] = useState(filterOptions[0].label);
	const [filteredUsers, setFilteredUsers] = useState(users);
	const [filterValue, setFilterValue] = useState("");
	const [availableDepartments, setAvailableDepartments] = useState([] as DepartmentModel[])

	async function fetchDepartments(){
		const res = await fetchGraphQL(GET_DEPARTMENTS, {
			key: 'departments'
		})
		setAvailableDepartments(res)
	}

	function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
		const selectedValue: string = event.target.value;
		const option = getOptionByValue(selectedValue);

		if (option) {
			setSelectValue(selectedValue);
			setSelectLabel(selectedValue);
		}
	}

	const [selectedRole, setSelectedRole] = useState<'none'|Role>('none')

    function handleRoleChange(event: ChangeEvent<HTMLSelectElement>){
        const selectedValue: string = event.target.value;

        const fromEnum = stringToRole(selectedValue)
        setSelectedRole(fromEnum ?? 'none')
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
                    console.log(`nome: procurando ${filterValue} em ${u.name}`)
                    const flag = u.name.toLowerCase().includes(filterValue.toLowerCase())
					console.log(`${flag?'tem':'nao tem'}`)
					return flag
                }))
                break;

            case 'email':
                setFilteredUsers(users.filter(u => {
                    console.log(`email: procurando ${filterValue} em ${u.email}`)
                    const flag = u.email.toLowerCase().includes(filterValue.toLowerCase())
					console.log(`${flag?'tem':'nao tem'}`)
					return flag
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

    useEffect(() => {
        console.log(availableDepartments)
    }, [availableDepartments])

    useEffect(() => {
        fetchDepartments()
    }, [])

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
			{(selectValue.toLowerCase() == "name" || selectValue.toLowerCase() == "email") && (
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
			{(selectValue.toLowerCase() == "roles") && (
				<>
					<RolesSelector handleChange={handleRoleChange} selectedValue={selectedRole}/>
				</>
			)}
			{(selectValue.toLowerCase() == "department") && (
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


interface RolesSelectorProps extends PropsWithChildren{
    handleChange: (arg: any) => void;
    selectedValue: any;
}

function RolesSelector({handleChange, selectedValue}:RolesSelectorProps){

  return(
      <>
      <select aria-label="role-selector" name="role-selector" id="role-selector" value={selectedValue} onChange={handleChange}>
        <option value='none'>Cargos</option>
        <option value={Admin}>Admin</option>
        <option value={Analyst}>Analyst</option>
        <option value={Auditor}>Auditor</option>
        <option value={Requester}>Requester</option>
        <option value={StoreKeeper}>StoreKeeper</option>
        <option value={Manager}>Manager</option>
      </select>
      </>
  )
}


interface DepartmentSelectorProps extends PropsWithChildren{
}

export function DepartmentSelector({}:DepartmentSelectorProps){

  return(
      <>
      </>
  )
}