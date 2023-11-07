"use client";
import { PropsWithChildren, SelectHTMLAttributes, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

type CustomTuple = [any, any];

interface CustomSelectorProps
	extends PropsWithChildren,
		SelectHTMLAttributes<HTMLSelectElement> {
	values: CustomTuple[];
	handleChange: (arg: any) => void;
	selectedValue: any;
	optionLabel: string;
	multipleValues?: boolean;
}

export function CustomSelector({
	values,
	handleChange,
	selectedValue,
	optionLabel,
	multipleValues = false,
	...rest
}: CustomSelectorProps) {
	const [randomId, setRandomId] = useState('')

	useEffect(() => {
		setRandomId(uuidv4())
	}, [])

	return (
		<>
			<div className="flex flex-col">
				<select
					{...rest}
					aria-label={`${randomId}-selector`}
					className={"select " + rest.className}
					name={`${randomId}-selector`}
					id={`${randomId}-selector`}
					value={"none"}
					onChange={handleChange}
				>
					<option value="none">{optionLabel}</option>
					{values.map((value, index) => (
						<option key={index} value={value[0]}>
							{value[1]}
						</option>
					))}
				</select>
				{
					(multipleValues && selectedValue) && (
						<div className="flex flex-col">{(selectedValue as any[]).map((value, index) => (
							<div key={index} className="font-bold rounded-lg border-gray-400 border-2 mb-3 last:mb-0 first:mt-2">{value}</div>
						))}</div>
					)
				}
			</div>
		</>
	);
}
