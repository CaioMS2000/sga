import {
	PropsWithChildren,
	InputHTMLAttributes,
	ChangeEvent,
	Dispatch,
	SetStateAction,
	forwardRef,
} from "react";

interface InputProps
	extends PropsWithChildren,
		InputHTMLAttributes<HTMLInputElement> {
	label: string;
	placeholder?: string;
	'label-class'?: string;
	// inputChange: Dispatch<SetStateAction<string>>;
	/**
	 * most common: Dispatch<SetStateAction<string>>
	 */
	inputChange: (arg: string) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, placeholder, className, inputChange, value, 'label-class':label_class, ...rest }: InputProps, ref) => {
		return (
			<>
				<label className="form-control w-full max-w-xs">
					<div className="label">
						<span className={"label-text " + label_class}>{label}</span>
					</div>
					<input
						{...rest}
						type="text"
						placeholder={placeholder}
						value={value}
						className={"input input-bordered w-full max-w-xs " + className}
						onChange={e => inputChange(e.target.value)}
						ref={ref}
					/>
				</label>
			</>
		);
	}
);

export default Input;
