import { PropsWithChildren, SelectHTMLAttributes } from "react";
import {
	Admin,
	Analyst,
	Auditor,
	Manager,
	Requester,
	Role,
	StoreKeeper,
} from "@/models/enum";

interface RolesSelectorProps
	extends PropsWithChildren,
		SelectHTMLAttributes<HTMLSelectElement> {
	handleChange: (arg: any) => void;
	selectedValue: any[];
}

export function RolesSelector({
	handleChange,
	selectedValue,
	...rest
}: RolesSelectorProps) {
	return (
		<>
			<select
				{...rest}
				aria-label="role-selector"
				className={"select " + rest.className}
				name="role-selector"
				id="role-selector"
				value={"none"}
				onChange={handleChange}
			>
				<option value="none">Cargos</option>
				<option value={Admin}>Admin</option>
				<option value={Analyst}>Analyst</option>
				<option value={Auditor}>Auditor</option>
				<option value={Requester}>Requester</option>
				<option value={StoreKeeper}>StoreKeeper</option>
				<option value={Manager}>Manager</option>
			</select>
			<div className="divider w-full"></div>
			{selectedValue && (
				<>
					<div className="flex flex-col p-0">
						{selectedValue.map((value, index) => (
							<div key={index} className="font-bold rounded-lg">
								{value}
							</div>
						))}
					</div>
				</>
			)}
		</>
	);
}
