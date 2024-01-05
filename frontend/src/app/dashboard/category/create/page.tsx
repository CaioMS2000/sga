"use client";
import { CREATE_CATEGORY } from "@/lib/mutation/category";
import { BasicObject, GraphQLResponse, fetchGraphQL } from "@/utils";
import { FaFolder } from "react-icons/fa";
import {
	KeyboardEventHandler,
	PropsWithChildren,
	useRef,
	useState,
} from "react";
import Input from "@/components/InputSimple";

interface CategoryCreateProps extends PropsWithChildren {}

export default function CategoryCreate({}: CategoryCreateProps) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const nameInputRef = useRef<HTMLInputElement | null>(null);
	const descriptionInputRef = useRef<HTMLInputElement | null>(null);

	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
		if (event.key == "Enter") {
			if (!nameInputRef.current?.value) {
				return nameInputRef.current?.focus();
			}

			if (!descriptionInputRef.current?.value) {
				return descriptionInputRef.current?.focus();
			}

			nameInputRef.current?.blur();
			descriptionInputRef.current?.blur();
			handleSend();
		}
	};

	async function handleSend() {
		try {
			const res = await fetchGraphQL(CREATE_CATEGORY, {
				key: "createCategory",
				variables: {
					data: {
						name,
						description,
					},
				},
			});

			setName("");
			setDescription("");
		} catch (e) {
			console.log(e);
			let _e: any = (e as BasicObject).message.split(":");
			_e.shift();
			_e = _e.join(":");
			console.log(_e);
			_e = JSON.parse(_e);

			const response = _e as GraphQLResponse;
			const erro = response.response.errors[0];
		}
	}

	return (
		<>
			<div className="bg-gray-900 w-fit py-20 px-10 mx-auto rounded-lg">
				<div className="font-bold flex items-center gap-3 mb-5 text-4xl">
					<FaFolder /> <span>Nova categoria</span>
				</div>

				<div className="flex flex-col gap-3 items-center">
					<Input
						ref={nameInputRef}
						inputChange={setName}
						value={name}
						label="Nome"
						placeholder="ex: objetos descartaveis"
						className="input-info"
						label-class="font-bold"
						onKeyDown={handleKeyDown}
					/>

					<Input
						ref={descriptionInputRef}
						inputChange={setDescription}
						value={description}
						label="Descrição"
						placeholder="opcional"
						className="input-info placeholder:italic"
						label-class="font-bold"
						onKeyDown={handleKeyDown}
					/>

					<button
						className="btn btn-primary w-40 mt-10"
						onClick={handleSend}
					>
						Criar
					</button>
				</div>
			</div>
		</>
	);
}
