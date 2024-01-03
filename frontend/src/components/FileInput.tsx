"use client";
import {
	ChangeEvent,
	Dispatch,
	InputHTMLAttributes,
	PropsWithChildren,
	SetStateAction,
	useEffect,
	useRef,
	useState,
	forwardRef,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { FaFile } from "react-icons/fa6";

interface FileInputProps
	extends PropsWithChildren,
		InputHTMLAttributes<HTMLInputElement> {
	"label-class"?: string;
	"label-text"?: string;
	"bg-empty"?: string;
	inputChange?: Dispatch<SetStateAction<string>>;
	inputValue?: string;
}

export default forwardRef<HTMLInputElement, FileInputProps>(function FileInput(
	{
		className,
		placeholder,
		"label-class": labelClass,
		"label-text": labelText = "Escolher arquivos",
		"bg-empty": bgEmpty,
		inputChange,
		inputValue,
		...rest
	}: FileInputProps,
	ref
) {
	const [hasFiles, setHasFiles] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [randomId, setRandomId] = useState("");

	function handleChange(event: ChangeEvent<HTMLInputElement>) {

		if (event.target && event.target.files) {
			if (event.target.files.length > 0) {
				setHasFiles(true);

				const file = event.target.files[0]
				setSelectedFile(file)
			} else {
				setHasFiles(false);
			}
		}
	}

	useEffect(() => {
		setRandomId(uuidv4());
	}, []);

	useEffect(() => {
		if(selectedFile && inputChange){
			const reader = new FileReader()

			reader.onloadend = () => {
				const res = reader.result
				inputChange(res as string)
			}

			reader.readAsDataURL(selectedFile)
		}
	}, [selectedFile]);

	return (
		<>
			<div
				className={
					"flex rounded-lg b-1 border-[2px] border-gray-600 w-fit cursor-pointer " +
					className
				}
			>
				<div
					className={
						"rounded-l-lg p-3 border-r-[2px] border-gray-600 " +
						labelClass
					}
					onClick={(e) => {
						document.getElementById(`${randomId}`)?.click();
					}}
				>
					{labelText}
				</div>
				<div
					className={"p-3 rounded-r-lg flex items-center " + bgEmpty}
				>
					{hasFiles && <FaFile />}
				</div>
			</div>
			{/* ===== input hidden ===== */}
			<input
				type="file"
				id={randomId}
				className="hidden"
				ref={ref}
				onChange={handleChange}
			/>
		</>
	);
});
