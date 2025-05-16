"use client";

import React, { useEffect, useState } from "react";

interface WebItem {
	ip: string;
	port: string;
	pm2name: string;
	webname: string;
}

interface ProcessStats {
	cpu_percent: number;
	memory_mb: number;
	name: string;
	pid: number;
}

export default function HostingPage() {
	const [webList, setWebList] = useState<WebItem[]>([]);
	const [processStats, setProcessStats] = useState<ProcessStats[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await fetch("/api/getlist");
				const data = await res.json();
				setWebList(data.listweb);
				setProcessStats(data.webstats.processes);
			} catch (err) {
				console.error("Failed to fetch hosting data", err);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, []);

	const getStatsByPm2Name = (pm2name: string) => {
		return processStats.find((proc) => proc.name === pm2name);
	};

	if (loading) return <div className="p-4">Loading...</div>;

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Hosting Information</h1>
			<div className="overflow-x-auto">
				<table className="min-w-full border text-sm">
					<thead className="bg-gray-200">
						<tr>
							<th className="border px-2 py-1">Web Name</th>
							<th className="border px-2 py-1">IP</th>
							<th className="border px-2 py-1">Port</th>
							<th className="border px-2 py-1">PM2 Name</th>
							<th className="border px-2 py-1">PID</th>
							<th className="border px-2 py-1">CPU (%)</th>
							<th className="border px-2 py-1">Memory (MB)</th>
						</tr>
					</thead>
					<tbody>
						{webList.map((web) => {
							const stats = getStatsByPm2Name(web.pm2name);
							return (
								<tr key={web.webname} className="hover:bg-gray-50">
									<td className="border px-2 py-1">{web.webname}</td>
									<td className="border px-2 py-1">{web.ip}</td>
									<td className="border px-2 py-1">{web.port}</td>
									<td className="border px-2 py-1">{web.pm2name}</td>
									<td className="border px-2 py-1">{stats?.pid ?? "N/A"}</td>
									<td className="border px-2 py-1">
										{stats?.cpu_percent ?? "N/A"}
									</td>
									<td className="border px-2 py-1">
										{stats?.memory_mb ?? "N/A"}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
