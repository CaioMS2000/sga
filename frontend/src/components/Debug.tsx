"use client";
import { useDebug } from "@/hooks";
import { ReactNode, useEffect, useRef, useState } from "react";

export interface DebugProps {
	children?: ReactNode;
}

export default function Debug({ children }: DebugProps) {
	const { debuging } = useDebug();
	const [screenDimensions, setScreenDimensions] = useState({
		width: 0,
		height: 0,
	});

	const debugRef = useRef<HTMLDivElement | null>(null);

	function setTop() {
		const debugElement = debugRef.current;
		if (debugElement) {
			const height = debugElement.clientHeight;
			const topSpacing = `calc(100vh - ${height}px)`;
			debugElement.style.top = topSpacing;
		}
	}

	useEffect(() => {
		const updateScreenDimensions = () => {
			setScreenDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener("resize", updateScreenDimensions);
		updateScreenDimensions(); // Chame isso também para obter as dimensões iniciais

		return () => {
			window.removeEventListener("resize", updateScreenDimensions);
		};
	}, []);

	useEffect(() => {
		// Calcule a altura do componente referenciado
		setTop();
	}, [screenDimensions]);

	useEffect(() => {
		if (debuging) {
			setTop();
		}
	}, [debuging]);

	if (!debuging) return <></>;

	return (
		<div
			ref={debugRef}
			className="absolute bg-black p-3 z-[1000] border-purple-500 border-2"
		>
			<p>
				Debug info
			</p>
			<div className='flex flex-col'>
				<p>
					Dimensões da Tela: {screenDimensions.width} x{" "}
					{screenDimensions.height}
				</p>
			</div>
		</div>
	);
}
