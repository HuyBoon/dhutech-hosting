"use client";

import { useState } from "react";

export default function DeployPage() {
	const [gitRepo, setGitRepo] = useState("");
	const [branch, setBranch] = useState("main");
	const [webName, setWebName] = useState("");
	const [npmInstall, setNpmInstall] = useState(true);
	const [status, setStatus] = useState("");

	const handleDeploy = async () => {
		setStatus("Đang gửi yêu cầu...");

		try {
			const response = await fetch("http://10.8.0.62:5019/deploy", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					git_repo: gitRepo,
					branch: branch,
					web_name: webName,
					npm_install: npmInstall.toString(),
				}),
			});

			console.log("response", response);
			if (response.ok) {
				setStatus("Triển khai thành công!");
			} else {
				const errorText = await response.text();
				setStatus(`Lỗi: ${response.status} - ${errorText}`);
			}
		} catch (error) {
			setStatus("Gặp lỗi khi gọi API: " + (error as Error).message);
		}
	};

	return (
		<div className="max-w-xl mx-auto mt-10 p-6 bg-white  shadow rounded-xl">
			<h1 className="text-2xl font-bold mb-4">Triển khai Website</h1>

			<div className="mb-4">
				<label className="block font-medium">Git Repo (SSH URL)</label>
				<input
					type="text"
					value={gitRepo}
					onChange={(e) => setGitRepo(e.target.value)}
					className="w-full p-2 border rounded"
					placeholder="git@github.com:user/repo.git"
				/>
			</div>

			<div className="mb-4">
				<label className="block font-medium">Branch</label>
				<input
					type="text"
					value={branch}
					onChange={(e) => setBranch(e.target.value)}
					className="w-full p-2 border rounded"
					placeholder="main"
				/>
			</div>

			<div className="mb-4">
				<label className="block font-medium">Tên miền (web_name)</label>
				<input
					type="text"
					value={webName}
					onChange={(e) => setWebName(e.target.value)}
					className="w-full p-2 border rounded"
					placeholder="example.com"
				/>
			</div>

			<div className="mb-4">
				<label className="inline-flex items-center">
					<input
						type="checkbox"
						checked={npmInstall}
						onChange={(e) => setNpmInstall(e.target.checked)}
						className="mr-2"
					/>
					Chạy npm install
				</label>
			</div>

			<button
				onClick={handleDeploy}
				className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
			>
				Triển khai
			</button>

			{status && <p className="mt-4 text-sm text-gray-700 ">{status}</p>}
		</div>
	);
}
