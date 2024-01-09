"use client";
import { ItemModel } from "@/models/ItemModel";
import {
	HTMLProps,
	PropsWithChildren,
	forwardRef,
	useEffect,
	useRef,
	useState,
} from "react";
import { RiQuestionFill } from "react-icons/ri";
import Button from "./RedirectButton";
import OrderButton from "@/components/OrderButton";
import { buildUser } from "@/utils";
import { UserModel } from "@/models/userModel";

interface ItemCardProps extends PropsWithChildren {
	item: ItemModel;
}

export default function ItemCard({ item }: ItemCardProps) {
	const modalRef = useRef<HTMLDialogElement | null>(null);
	const itemImageFlag = Boolean(item.image.length);

	return (
		<>
			<div className="card w-96 bg-gray-800 shadow-xl text-white">
				<figure className="px-10 pt-10">
					{itemImageFlag && (
						<img
							src={item.image}
							alt={`${item.name}`}
							className="rounded-xl max-h-[100px]"
						/>
					)}
					{!itemImageFlag && <RiQuestionFill size={70} />}
				</figure>
				<div className="card-body items-center text-center">
					<h2 className="card-title">{item.name}</h2>
					<p>{item.description}</p>
					<div className="card-actions">
						{itemImageFlag && (
							<Button
								url={`/dashboard/item/${item.id}`}
								className="btn bg-purple-900 border-purple-900 text-white"
							>
								Pedir
							</Button>
						)}
						{!itemImageFlag && (
							<>
								<button
									className="btn bg-purple-900 border-purple-900 text-white"
									onClick={() => {
										modalRef.current?.showModal();
									}}
								>
									Pedir
								</button>
								<Modal ref={modalRef} item={item} />
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

interface ModalProps extends HTMLProps<HTMLDialogElement> {
	item: ItemModel;
}

const Modal = forwardRef<HTMLDialogElement, ModalProps>(
	({ item, className, ...rest }, ref) => {
		const [user, setUser] = useState<UserModel | null>(null);

		function ModalBox({ children }: PropsWithChildren) {
			return (
				<>
					<div className="modal-box">
						<form method="dialog">
							<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
								✕
							</button>
						</form>
						{children}
					</div>
				</>
			);
		}

		async function getCurrentUser() {
			const user = await buildUser();
			if (user) setUser(user);
		}

		useEffect(() => {
			getCurrentUser();
		}, []);

		return (
			<>
				<dialog {...rest} className={"modal " + className} ref={ref}>
					<ModalBox>
						<div className="flex flex-col justify-between">
							<div className="bg-teal-700 text-white font-bold w-fit p-3 rounded-lg mb-5">
								Nota Fiscal
							</div>
							<div className="flex flex-col gap-3">
								<p className="font-bold text-lg underline">{item.name}</p>
								<p className="font-semibold italic">
									Descrição: {item.description}
								</p>
								<p className="font-bold">
									Valor de aquisição: R$ {item.lot.price}
								</p>
							</div>
							{user && (
								<OrderButton
								className="bg-purple-900 hover:bg-purple-950 text-white mt-5"
								itemId={item.id}
								requesterId={user.id}
							>
								Pedir
							</OrderButton>
							)}
						</div>
					</ModalBox>
				</dialog>
			</>
		);
	}
);
