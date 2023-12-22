import { Providers } from "@/Providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Debug from "@/components/Debug";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "SGA",
	description: "Sistema de Almoxarifado",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<body className={inter.className} suppressHydrationWarning={true}>
				<Providers>
					<Debug />
					{children}
				</Providers>
			</body>
		</html>
	);
}
