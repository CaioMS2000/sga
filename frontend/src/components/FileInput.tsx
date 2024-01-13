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
import { IoIosClose } from "react-icons/io";

interface FileInputProps
	extends PropsWithChildren,
		InputHTMLAttributes<HTMLInputElement> {
	"label-class"?: string;
	"label-text"?: string;
	"bg-empty"?: string;
	// inputChange?: Dispatch<SetStateAction<string>>;
	inputChange?: (arg: string) => void;
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

				const file = event.target.files[0];
				setSelectedFile(file);
			} else {
				setHasFiles(false);
			}
		}
	}

	useEffect(() => {
		setRandomId(uuidv4());
	}, []);

	useEffect(() => {
		if (inputChange) {
			if (selectedFile) {
				const reader = new FileReader();

				reader.onloadend = () => {
					const res = reader.result;
					inputChange(res as string);
				};

				reader.readAsDataURL(selectedFile);
			} else {
				inputChange("");
				setHasFiles(false);
			}
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
						"rounded-l-lg p-3 border-r-[2px] border-gray-600 flex items-center " +
						labelClass
					}
					onClick={(e) => {
						document.getElementById(`${randomId}`)?.click();
					}}
				>
					<p>{labelText}</p>
				</div>
				<div className={"rounded-r-lg flex items-center " + (hasFiles?"":"p-2 ") + bgEmpty}>
					{hasFiles && (
						<>
							<div className="flex flex-col p-3 pr-0">
								<FaFile
									className="min-w-[20px] min-h-[20px]"
									onClick={() => {
										document
											.getElementById(`${randomId}`)
											?.click();
									}}
								/>
							</div>
							<div className="flex flex-col pt-1 pr-1 h-full justify-start">
								<IoIosClose
									className="min-w-[20px] min-h-[20px] hover:cursor-pointer text-red-500 "
									onClick={() => {console.log('clicou');setSelectedFile(null)}}
								/>
							</div>
						</>
					)}
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
