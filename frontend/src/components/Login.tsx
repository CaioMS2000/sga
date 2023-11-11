"use client";
import { KeyboardEventHandler, PropsWithChildren, useRef, useState, forwardRef } from "react";
import Image from "next/image";
import { Input } from "./Input";
import { LOGIN } from "@/lib/mutation/user";
import { BasicObject, GraphQLResponse, fetchGraphQL } from "@/utils";
import { saveCookie } from "@/app/actions";
import { AccesstokenExpiration, AccesstokenKey, RefreshtokenExpiration, RefreshtokenKey, UserCookieKey } from "@/utils/constants";
import { useRouter } from "next/navigation";

interface LoginProps extends PropsWithChildren {}

export default function Login({}: LoginProps) {
	const [email, setEmail] = useState("email@mail.com");
	const [password, setPassword] = useState("123");
	const emailInputRef = useRef<HTMLInputElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);
	const [error, setError] = useState("");
	const {push} = useRouter()

	function handleKeyDown(event: KeyboardEventHandler<HTMLInputElement> ){
		console.log(event)
	}

	async function handleSend() {
		return;
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

			await saveCookie(AccesstokenKey, JSON.stringify(accessToken.token), accessToken.expiresIn ?? AccesstokenExpiration)
			await saveCookie(RefreshtokenKey, JSON.stringify(refreshToken.token), refreshToken.expiresIn ?? RefreshtokenExpiration)
			await saveCookie(UserCookieKey, JSON.stringify(user), accessToken.expiresIn ?? AccesstokenExpiration)

			push('/dashboard')
		} catch (e) {
			console.log(e)
			let _e: any = (e as BasicObject).message.split(":");
			_e.shift();
			_e = _e.join(":");
			console.log(_e)
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
			<div className="h-screen flex items-center justify-center">
				{/* <div id='login-card' className="flex flex-col items-center justify-center bg-green-900 rounded-md p-6 max-w-xl"> */}
				<div
					id="login-card"
					className="flex flex-col items-center justify-center bg-CRMVGO_darkGreen rounded-md p-6 max-w-xl"
				>
					<div className="image-wrapper p-3 bg-white rounded-3xl flex justify-center max-w-xs mb-10">
						<Image
							src={"/image/crmvgo-logo-top.png"}
							priority={true}
							width={300}
							height={300}
							alt=""
						/>
					</div>
					<div>
						<p className="font-bold text-white text-2xl">
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
							className="btn font-bold text-white bg-lime-900 border-lime-900 text-lg"
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
		</>
	);
}
