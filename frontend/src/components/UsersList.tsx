"use client";
import { UserModel } from "@/models/userModel";
import {
	ChangeEvent,
	PropsWithChildren,
	useEffect,
	useRef,
	useState,
} from "react";
import {
	Admin,
	Analyst,
	Auditor,
	Manager,
	Requester,
	Role,
	StoreKeeper,
} from "@/models/enum";
import { fetchGraphQL, stringToRole } from "@/utils";
import { DepartmentModel } from "@/models/departmentModel";
import { GET_DEPARTMENTS } from "@/lib/query/department";
import RedirectButton from "@/components/RedirectButton";
import { RolesSelector } from "./RolesSelector";
import { DepartmentSelector } from "./DepartmentSelector";

interface UsersListProps extends PropsWithChildren {
	AllUsers: any[];
}

export default function UsersList({ AllUsers }: UsersListProps) {
	const users: UserModel[] = AllUsers;
	const [filterSelectValue, setFilterSelectValue] = useState(
		filterOptions[0].value
	);
	const [selectLabel, setSelectLabel] = useState(filterOptions[0].label);
	const [filteredUsers, setFilteredUsers] = useState(users);
	const [nameFilterValue, setNameFilterValue] = useState("");
	const [emailFilterValue, setEmailFilterValue] = useState("");
	const [availableDepartments, setAvailableDepartments] = useState(
		[] as DepartmentModel[]
	);

	async function fetchDepartments() {
		const res = await fetchGraphQL(GET_DEPARTMENTS, {
			key: "departments",
		});
		setAvailableDepartments(res);
	}

	function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
		const selectedValue: string = event.target.value;
		const option = getOptionByValue(selectedValue);

		if (option) {
			setFilterSelectValue(selectedValue);
			setSelectLabel(selectedValue);
		}
	}

	const [selectedRole, setSelectedRole] = useState<"none" | Role>("none");
	function handleRoleChange(event: ChangeEvent<HTMLSelectElement>) {
		const selectedValue: string = event.target.value;

		const fromEnum = stringToRole(selectedValue);
		setSelectedRole(fromEnum ?? "none");
	}

	const [selectedDepartment, setSelectedDepartment] = useState("none");
	function handleDepartmentChange(event: ChangeEvent<HTMLSelectElement>) {
		const selectedValue: string = event.target.value;

		setSelectedDepartment(selectedValue);
	}

	useEffect(() => {
		switch (filterSelectValue) {
			case "all":
				setFilteredUsers(users);
				break;

			case "name":
				setFilteredUsers(
					users.filter((u) => {
						const flag = u.name
							.toLowerCase()
							.includes(nameFilterValue.toLowerCase());
						return flag;
					})
				);
				break;

			case "email":
				setFilteredUsers(
					users.filter((u) => {
						const flag = u.email
							.toLowerCase()
							.includes(emailFilterValue.toLowerCase());
						return flag;
					})
				);
				break;

			case "roles":
				if (selectedRole != "none") {
					setFilteredUsers(
						users.filter((u) => {
							const flag = u.roles.includes(selectedRole);
							return flag;
						})
					);
				} else {
					setFilteredUsers(users);
				}
				break;

			case "department":
				if (selectedDepartment != "none") {
					setFilteredUsers(
						users.filter((u) => {
							const flag = u.department.some(
								(dep) => dep.code == selectedDepartment
							);
							return flag;
						})
					);
				} else {
					setFilteredUsers(users);
				}
				break;

			default:
				break;
		}
	}, [
		filterSelectValue,
		nameFilterValue,
		emailFilterValue,
		selectedRole,
		selectedDepartment,
	]);

	const [maxWidth, setMaxWidth] = useState(0);
	const elementRefs = filteredUsers.map(() => useRef<HTMLDivElement>(null));

	useEffect(() => {
		fetchDepartments();

		let max = 0;
		elementRefs.forEach((ref) => {
			if (ref.current) {
				max = Math.max(max, ref.current.offsetWidth);
			}
		});
		console.log(`max: ${max}`);
		setMaxWidth(max);
	}, []);

	return (
		<>
			<select
				aria-label="users-list-filter"
				className="select w-full max-w-xs mr-3 bg-slate-900"
				value={filterSelectValue}
				onChange={handleSelectChange}
			>
				{filterOptions.map((fOpt, index) => (
					<option key={index} value={fOpt.value}>
						{fOpt.label}
					</option>
				))}
			</select>
			{filterSelectValue.toLowerCase() == "name" && (
				<>
					<input
						type="text"
						placeholder={`Filtrar por ${selectLabel}`}
						value={nameFilterValue}
						className="bg-slate-900 p-2 rounded-lg"
						onChange={(e) => {
							setNameFilterValue(e.target.value);
						}}
					/>
				</>
			)}
			{filterSelectValue.toLowerCase() == "email" && (
				<>
					<input
						type="text"
						placeholder={`Filtrar por ${selectLabel}`}
						value={emailFilterValue}
						className="bg-slate-900 p-2 rounded-lg"
						onChange={(e) => {
							setEmailFilterValue(e.target.value);
						}}
					/>
				</>
			)}
			{filterSelectValue.toLowerCase() == "roles" && (
				<>
					<RolesSelector
						handleChange={handleRoleChange}
						selectedValue={selectedRole}
						className="w-full max-w-xs bg-slate-900"
						/>
				</>
			)}
			{filterSelectValue.toLowerCase() == "department" && (
				<>
					<DepartmentSelector
						departments={availableDepartments}
						selectedValue={selectedDepartment}
						handleChange={handleDepartmentChange}
						className="w-full max-w-xs bg-slate-900"
					/>
				</>
			)}
			<div className="divider" />
			<div className="flex justify-center">
				<RedirectButton
					className="border-teal-700 bg-teal-700 text-white mb-5"
					url="/dashboard/admin/users/create"
				>
					Criar novo usuário
				</RedirectButton>
			</div>
			{filteredUsers &&
				filteredUsers.map((user, index) => (
					<div
						key={user.id}
						ref={elementRefs[index]}
						// className={`grid grid-cols-2 w-${maxWidth?`[${maxWidth}px]`:'fit'} ${maxWidth?`max-w-[${maxWidth}px]`:''} rounded-lg border-2 border-gray-400 p-3`}
						// className={`grid grid-cols-2 ${maxWidth?`max-w-[${maxWidth}px]`:''} rounded-lg border-2 border-gray-400 p-3`}
						// className={`grid grid-cols-2 max-w-[50px] rounded-lg border-2 border-gray-400 p-3`}
						className={`grid grid-cols-2 rounded-lg border-2 border-gray-400 p-3 mb-5 last:mb-0`}
						style={{ width: maxWidth ? `${maxWidth}px` : "fit-content" }}
					>
						<div className="avatar w-fit ">
							<div className="w-24 rounded-full">
								<img
									alt="user profile image"
									src={
										user.profileImagePath ||
										"/image/empty-profile-image.png"
									}
								/>
							</div>
						</div>

						<div className=" flex flex-col justify-center">
							<p>{user.name}</p>
							<p>{user.email}</p>
						</div>
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
