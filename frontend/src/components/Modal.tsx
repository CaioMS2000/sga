"use client";
import { ButtonHTMLAttributes, PropsWithChildren, forwardRef } from "react";

interface ModalProps
	extends PropsWithChildren,
		ButtonHTMLAttributes<HTMLDialogElement> {
			title?: string;
		}

const Modal = forwardRef<HTMLDialogElement, ModalProps>(function (
	{children, title = 'Editar'}: ModalProps,
	ref
) {
	return (
		<>
			<dialog className="modal modal-bottom sm:modal-middle" ref={ref}>
				<div className="modal-box">
					<h3 className="font-bold text-lg">{title}</h3>
					{children}
					<div className="modal-action">
						<form method="dialog">
							<button className="btn">Cancelar</button>
						</form>
					</div>
				</div>
			</dialog>
		</>
	);
});

export default Modal;