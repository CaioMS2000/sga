"use client";
import {
	KeyboardEventHandler,
	PropsWithChildren,
	useRef,
	useState,
	forwardRef,
} from "react";
import Image from "next/image";
import Input from "./InputLeftLabeled";
import { LOGIN } from "@/lib/mutation/user";
import { BasicObject, GraphQLResponse, fetchGraphQL } from "@/utils";
import { saveCookie } from "@/app/actions";
import {
	AccesstokenExpiration,
	AccesstokenKey,
	RefreshtokenExpiration,
	RefreshtokenKey,
	UserCookieKey,
} from "@/utils/constants";
import { FaBoxArchive } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface LoginProps extends PropsWithChildren {}

export default function Login({}: LoginProps) {
	const [email, setEmail] = useState("email@mail.com");
	const [password, setPassword] = useState("123");
	const emailInputRef = useRef<HTMLInputElement | null>(null);
	const passwordInputRef = useRef<HTMLInputElement | null>(null);
	const [error, setError] = useState("");
	const { push } = useRouter();

	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
		if (event.key == "Enter") {
			if (!emailInputRef.current?.value) {
				return emailInputRef.current?.focus();
			}

			if (!passwordInputRef.current?.value) {
				return passwordInputRef.current?.focus();
			}

			emailInputRef.current?.blur();
			passwordInputRef.current?.blur();
			handleSend();
		}
	};

	async function handleSend() {
		try {
			const res: BasicObject<BasicObject> = await fetchGraphQL(LOGIN, {
				key: "login",
				variables: {
					data: {
						email,
						password,
					},
				},
			});

			const accessToken = res.accessToken;
			const refreshToken = res.refreshToken;
			const user = res.user;

			await saveCookie(
				AccesstokenKey,
				JSON.stringify(accessToken.token),
				accessToken.expiresIn ?? AccesstokenExpiration
			);
			await saveCookie(
				RefreshtokenKey,
				JSON.stringify(refreshToken.token),
				refreshToken.expiresIn ?? RefreshtokenExpiration
			);
			await saveCookie(
				UserCookieKey,
				JSON.stringify(user),
				accessToken.expiresIn ?? AccesstokenExpiration
			);

			push("/dashboard");
		} catch (e) {
			let _e: any = (e as BasicObject).message.split(":");
			_e.shift();
			_e = _e.join(":");
			_e = JSON.parse(_e);

			const response = _e as GraphQLResponse;
			const erro = response.response.errors[0];

			setError(erro.message);
			setTimeout(() => {
				setError("");
			}, 5 * 1000);
		}
	}

	return (
		<>
			<div className="h-screen bg-[url('/image/storage.jpg')]">
				<div className="h-screen flex items-center justify-center bg-black/70">
					<div
						id="login-card"
						className="flex flex-col items-center justify-center bg-greenishBlack rounded-md px-6 py-10 max-w-xl"
					>
						<div className="mb-10 bg-black/50 rounded-full p-10">
							<FaBoxArchive className="w-20 h-20" />
						</div>
						<div className="max-w-lg">
							<p className="font-bold text-white text-2xl text-center">
								Sistema de Gerenciamento de Almoxarifado
							</p>
						</div>
						<div className="divider max-w-[10rem] min-w-[8rem] mx-auto" />
						<div className="container flex flex-col items-center gap-5">
							<Input
								ref={emailInputRef}
								label="Email"
								placeholder="seuemail@exemplo.com"
								inputChange={setEmail}
								onKeyDown={handleKeyDown}
								value={email}
							/>
							<Input
								ref={passwordInputRef}
								label="Senha"
								placeholder=""
								type="password"
								inputChange={setPassword}
								onKeyDown={handleKeyDown}
								value={password}
							/>
							<button
								className="btn font-bold text-white bg-byzantineBlue hover:bg-blue-950 border-byzantineBlue hover:border-blue-950 text-lg"
								type="button"
								onClick={handleSend}
							>
								ENTRAR
							</button>
							{error && (
								<div className="toast toast-center">
									<div className="alert alert-error">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="stroke-current shrink-0 h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
										<span>{error}</span>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
