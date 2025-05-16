"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();
	const { status } = useSession();

	useEffect(() => {
		if (status === "authenticated") {
			router.push("/admin/account");
		}
	}, [status, router]);

	if (status === "loading") {
		return (
			<div className="flex items-center justify-center h-screen">
				<Loading />
			</div>
		);
	}

	if (status === "authenticated") {
		return null;
	}

	const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		setLoading(true);
		setError("");

		const result = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});

		if (result?.error) {
			setError(result.error);
			setLoading(false);
			return;
		}

		router.push("/admin/account");
		setLoading(false);
	};

	return (
		<section className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
					Login
				</h2>

				{error && (
					<p className="bg-red-100 text-red-600 p-3 rounded-md text-center mb-4">
						{error}
					</p>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email Address
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
							placeholder="Enter your email"
							disabled={loading}
							required
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
							placeholder="Enter your password"
							disabled={loading}
							required
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className={`w-full py-2 font-bold rounded-md transition ${
							loading
								? "bg-gray-400 text-white"
								: "bg-blue-600 hover:bg-blue-700 text-white"
						}`}
					>
						{loading ? "Logging in..." : "Login"}
					</button>
				</form>
			</div>
		</section>
	);
};

export default LoginPage;
