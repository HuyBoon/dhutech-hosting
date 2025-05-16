import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";

import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AppProvider } from "@/components/AppContext";
import { Toaster } from "sonner";

const robotoMono = Roboto_Mono({
	subsets: ["latin"],
	variable: "--font-roboto-mono",
	weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "DHU-TECH || Connection with Innovation",
	description: "Connection with Innovation",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${robotoMono.variable} } antialiased`}>
				<AppProvider>
					<Header />
					<main className="pt-[100px]">{children}</main>
					<Footer />
				</AppProvider>
				<Toaster richColors position="top-right" />
			</body>
		</html>
	);
}
