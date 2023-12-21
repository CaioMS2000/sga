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
	inputChange: Dispatch<SetStateAction<string>>;
}

// export function Input({label, placeholder, inputChange, ...rest}: InputProps) {
// 	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
// 		inputChange(e.target.value); // Chama a função de controle com o valor do input
// 	  };

// 	return (
// 		<>
// 			<div className="form-control w-fit text-gray-600">
// 				<label className="input-group">
// 					<span className='bg-gray-300 font-bold'>{label}</span>
// 					<input
// 						type="text"
// 						placeholder={placeholder ?? "email@gmail.com"}
// 						className="input input-bordered bg-gray-100"
// 						onChange={handleInputChange}
//                         {...rest}
// 					/>
// 				</label>
// 			</div>
// 		</>
// 	);
// }

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, placeholder, inputChange, ...rest }: InputProps, ref) => {
		const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
			inputChange(e.target.value); // Chama a função de controle com o valor do input
		};

		return (
			<>
				<div className="form-control w-fit text-gray-600">
					<label className="input-group">
						<span className="bg-gray-300 font-bold">{label}</span>
						<input
							type="text"
							placeholder={placeholder ?? "email@gmail.com"}
							className="input input-bordered bg-gray-100"
							onChange={handleInputChange}
							ref={ref}
							{...rest}
						/>
					</label>
				</div>
			</>
		);
	}
);

export default Input