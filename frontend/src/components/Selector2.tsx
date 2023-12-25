"use client";
import {
	HTMLAttributes,
	PropsWithChildren,
	SelectHTMLAttributes,
	useEffect,
	useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { IoIosClose } from "react-icons/io";

export type CustomTuple<T1 = any, T2 = any> = T1 extends never
	? [any, any]
	: T2 extends never
	? [T1, T1]
	: [T1, T2];

interface CustomSelectorProps
	extends PropsWithChildren,
		SelectHTMLAttributes<HTMLSelectElement> {
	label: string;
	values: CustomTuple[];
	selectedValue: any[];
	handleChange: (arg: any) => void;
	deleteValue: (arg: any) => void;
}

export function CustomSelector({
	value = "none",
	label,
	values,
	handleChange,
	deleteValue,
	selectedValue,
	...rest
}: CustomSelectorProps) {
	const [randomId, setRandomId] = useState("");

	useEffect(() => {
		setRandomId(uuidv4());
	}, []);

	useEffect(() => {
		if(selectedValue && selectedValue.length)console.log(selectedValue);
	}, [selectedValue]);

	return (
		<>
			<div className="flex flex-col">
				<select
					{...rest}
					aria-label={`${randomId}-selector`}
					name={`${randomId}-selector`}
					id={`${randomId}-selector`}
					className={"select " + rest.className}
					value={value}
					onChange={e => {handleChange(e)}}
				>
					<option value="none">{label}</option>
					{values.map((v, index) => (
						<option key={index} value={v[0]}>{v[1]}</option>
					))}
				</select>
				{selectedValue && (
					<div className="flex flex-col gap-3 mt-5">
						{selectedValue.map((v, index) => (
							<SelectorValue value={(v as any[])[0]} key={index} className="rounded-lg border-2 border-gray-400 px-3" label={(v as any[])[1] as string} deleteValue={deleteValue}/>
						))}
					</div>
				)}
			</div>
		</>
	);
}

interface SelectorValueProps extends PropsWithChildren , HTMLAttributes<HTMLDivElement>{
	value: string;
	label: string;
	'label-class'?: string;
	deleteValue?: (arg: any) => void;
}
function SelectorValue({value, label, deleteValue, 'label-class':label_class,className, ...rest}: SelectorValueProps){
	return(
		<div {...rest} className={"flex gap-3 items-center " + className}>
			<div className={"flex-1 " + label_class}>{label}</div>
			<IoIosClose className='min-w-[40px] min-h-[40px] hover:cursor-pointer text-red-500' onClick={() => {
				if(deleteValue) deleteValue(value);
			}}/>
		</div>
	)
}