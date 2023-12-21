import { DepartmentModel } from "@/models/departmentModel";
import { PropsWithChildren, SelectHTMLAttributes } from "react";

interface DepartmentSelectorProps
	extends PropsWithChildren,
		SelectHTMLAttributes<HTMLSelectElement> {
	departments: DepartmentModel[];
	handleChange: (arg: any) => void;
	selectedValue: any;
}

export function DepartmentSelector({
	departments,
	handleChange,
	selectedValue,
	...rest
}: DepartmentSelectorProps) {
	return (
		<>
			<select
				{...rest}
				aria-label="department-selector"
				className={"select " + rest.className}
				name="department-selector"
				id="department-selector"
				value={selectedValue}
				onChange={handleChange}
			>
				<option value="none">Departamentos</option>
				{departments.map((dep) => (
					<option key={dep.id} value={dep.code}>
						{dep.name}
					</option>
				))}
			</select>
		</>
	);
}
