"use client";
import {
	PropsWithChildren,
	SelectHTMLAttributes,
	useEffect,
	useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

export type CustomTuple<T1 = any, T2 = any> = T1 extends never
	? [any, any]
	: T2 extends never
	? [T1, T1]
	: [T1, T2];

interface CustomSelectorProps
	extends PropsWithChildren,
		SelectHTMLAttributes<HTMLSelectElement> {
	multipleValues?: boolean;
}

export function CustomSelector({
	multipleValues = false,
	value = "none",
	...rest
}: CustomSelectorProps) {
	const [randomId, setRandomId] = useState("");

	useEffect(() => {
		setRandomId(uuidv4());
	}, []);

	return (
		<>
			<div className="flex flex-col">
				<select
					{...rest}
					aria-label={`${randomId}-selector`}
					className={"select " + rest.className}
					name={`${randomId}-selector`}
					id={`${randomId}-selector`}
				>
					<option value="none">{}</option>
				</select>
			</div>
		</>
	);
}
