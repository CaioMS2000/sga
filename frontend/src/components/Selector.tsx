"use client";
import { PropsWithChildren, SelectHTMLAttributes, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import SelectorValue from "./SelectorValues";

type CustomTuple = [any, any];

interface CustomSelectorProps
	extends PropsWithChildren,
		SelectHTMLAttributes<HTMLSelectElement> {
	values: CustomTuple[];
	handleChange: (arg: any) => void;
	deleteOption?: (arg: any) => void;
	selectedValue: any;
	optionLabel: string;
	multipleValues?: boolean;
	value?: any;
}

export function CustomSelector({
	values,
	handleChange,
	selectedValue,
	optionLabel,
	deleteOption,
	multipleValues = false,
	value = 'none',
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
					value={value}
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
					(multipleValues && selectedValue && deleteOption) && (
						<div className="mt-2 flex flex-col">{(selectedValue as any[]).map((value, index) => (
							<SelectorValue key={index} className="font-bold text-sm rounded-lg border-gray-400 border-2 mb-3 w-fit p-2 last:mb-0 first:mt-2" deleteFunction={deleteOption} referenceValue={value}>{value}</SelectorValue>
						))}
						</div>
					)
				}
			</div>
		</>
	);
}
