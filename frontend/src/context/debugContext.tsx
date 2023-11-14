"use client";
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

interface DebugProviderProps {
	children: ReactNode;
}

type envType = "development" | "production" | "test";

export interface DebugContextType {
	debuging: boolean;
	setDebuging: Dispatch<SetStateAction<boolean>>;
	isProductionEnv: boolean;
	isDevelopmentEnv: boolean;
	isTestEnv: boolean;
	ENVIRONMENT: envType;
}

export const DebugContext = createContext({} as DebugContextType);

export default function DebugProvider({ children }: DebugProviderProps) {
	const isProductionEnv = process.env.NODE_ENV === "production";
	const isDevelopmentEnv = process.env.NODE_ENV === "development";
	const isTestEnv = process.env.NODE_ENV === "test";
	const ENVIRONMENT = process.env.NODE_ENV;

	const [str, setStr] = useState("");
	const [debuging, setDebuging] = useState(
	  isDevelopmentEnv || isTestEnv ? true : false,
	);
	// const [debuging, setDebuging] = useState(false);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const key = event.key;

			if (key == "Backspace") {
				setStr("");
			} else {
				setStr((prevState) => `${prevState}${key}`);
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	useEffect(() => {
		if (str.toLocaleLowerCase() == "debugon") {
			setDebuging(true);
			setStr("");
		} else if (str.toLocaleLowerCase() == "debugoff") {
			setDebuging(false);
			setStr("");
		}
	}, [str]);

	return (
		<DebugContext.Provider
			value={{
				debuging,
				setDebuging,
				isProductionEnv,
				isDevelopmentEnv,
				isTestEnv,
				ENVIRONMENT,
			}}
		>
			{children}
		</DebugContext.Provider>
	);
}