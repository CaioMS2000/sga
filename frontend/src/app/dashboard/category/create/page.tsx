"use client";
import Input from "@/components/Input";
import { CREATE_CATEGORY } from "@/lib/mutation/category";
import { BasicObject, GraphQLResponse, fetchGraphQL } from "@/utils";
import { FaFolder } from "react-icons/fa";
import {
	KeyboardEventHandler,
	PropsWithChildren,
	useRef,
	useState,
} from "react";

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
				key: "login",
				variables: {
					data: {
						name,
						description,
					},
				},
			});
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
			<div className="bg-gray-900">
				<div className="font-bold flex items-center gap-3">
                    <FaFolder /> <span>Nova categoria</span>
                </div>
				<Input
					ref={nameInputRef}
					label="Nome"
					placeholder="Descartáveis"
					value={name}
					inputChange={setName}
					onKeyDown={handleKeyDown}
				/>
				<Input
					ref={descriptionInputRef}
					label="Descrição"
					placeholder="Descrição"
					value={description}
					inputChange={setDescription}
					onKeyDown={handleKeyDown}
				/>
			</div>
		</>
	);
}
