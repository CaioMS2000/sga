"use client";
import { UNLINK_USER_FROM_DEPARTMENT } from "@/lib/mutation/department";
import { fetchGraphQL } from "@/utils";
import { Fragment, HTMLProps, PropsWithChildren, useRef } from "react";
import Modal from "./Modal";
import { UserModel } from "@/models/userModel";

interface UnlinkUserFromDepartmentButtonProps
	extends PropsWithChildren,
		HTMLProps<HTMLDivElement> {
	user: UserModel;
	departmentCode: string;
}

export default function UnlinkUserFromDepartmentButton({
	user,
	departmentCode,
	children,
	className,
	...rest
}: UnlinkUserFromDepartmentButtonProps) {
	const modalRef = useRef<HTMLDialogElement | null>(null);

	async function handleClick() {
		const res = await fetchGraphQL(UNLINK_USER_FROM_DEPARTMENT, {
			key: "unlinUserFromDepartment",
			variables: {
				userId: user.id,
				departmentCode,
			},
		});

		console.log(res);
		location.reload();
	}

	return (
		<>
			<div
				{...rest}
				onClick={() => {
					if (modalRef.current) {
						modalRef.current.showModal();
					}
				}}
				className={className}
			>
				{children}
			</div>
			<Modal title="Desvincular" ref={modalRef}>
				<div className="flex flex-col gap-3">
					<p className="font-bold">
						Tem certeza que deseja desvincular esse usuário deste
						departamento?
					</p>
					<div className="join join-vertical">
						<p className="join-item font-bold">{user.name}</p>
						<p className="join-item font-bold">{user.email}</p>
					</div>
          <button className="btn w-fit bg-green-700 text-white" onClick={handleClick}>Confirmar</button>
				</div>
			</Modal>
		</>
	);
}
