"use client";
import React from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const mockData = {
	customer: {
		name: "Nguyen Van A",
		email: "nguyenvana@example.com",
		phone: "0987654321",
		registeredAt: "2024-01-10",
		expiresAt: "2025-01-10",
		plan: "Premium Hosting",
	},
	resources: {
		storage: 70,
		cpu: 45,
		ram: 80,
		bandwidth: 55,
	},
};

const ProgressBar = ({
	label,
	percent,
}: {
	label: string;
	percent: number;
}) => (
	<div className="mb-4">
		<div className="flex justify-between mb-1 text-sm font-medium ">
			<span>{label}</span>
			<span>{percent}%</span>
		</div>
		<div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
			<div
				className="h-3 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 transition-all duration-700"
				style={{ width: `${percent}%` }}
			></div>
		</div>
	</div>
);

const getRemainingDays = (expiresAt: string) => {
	const today = dayjs();
	const expiry = dayjs(expiresAt);
	const diff = expiry.diff(today, "day");
	return diff > 0 ? diff : 0;
};

const AccountPage = () => {
	const { customer, resources } = mockData;
	const remainingDays = getRemainingDays(customer.expiresAt);

	return (
		<motion.div
			className="container mx-auto px-12 pb-12 grid grid-cols-1 md:grid-cols-2 gap-4"
			initial={{ opacity: 0, y: 40 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
		>
			{/* Customer Info */}
			<div className="shadow-md rounded-xl p-6 border">
				<h2 className="text-xl font-semibold mb-4 text-content ">
					Thông tin khách hàng
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
					<p>
						<strong>Họ tên:</strong> {customer.name}
					</p>
					<p>
						<strong>Email:</strong> {customer.email}
					</p>
					<p>
						<strong>Số điện thoại:</strong> {customer.phone}
					</p>
					<p>
						<strong>Gói dịch vụ:</strong> {customer.plan}
					</p>
					<p>
						<strong>Ngày đăng ký:</strong> {customer.registeredAt}
					</p>
					<p>
						<strong>Ngày hết hạn:</strong> {customer.expiresAt}
					</p>
					<p>
						<strong>Còn lại:</strong> {remainingDays} ngày
					</p>
				</div>

				{/* Buttons */}
				<div className="mt-6 flex flex-wrap gap-4">
					<button className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full shadow hover:opacity-90 transition">
						Gia hạn
					</button>
					<button className="px-5 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full shadow hover:opacity-90 transition">
						Nâng cấp gói
					</button>
				</div>
			</div>

			{/* Hosting Resource Usage */}
			<div className="shadow-md rounded-xl p-6 border">
				<h2 className="text-xl font-semibold mb-4">
					Thông tin tài nguyên Hosting
				</h2>
				<ProgressBar label="Dung lượng (Storage)" percent={resources.storage} />
				<ProgressBar label="CPU" percent={resources.cpu} />
				<ProgressBar label="RAM" percent={resources.ram} />
				<ProgressBar label="Băng thông" percent={resources.bandwidth} />
			</div>
		</motion.div>
	);
};

export default AccountPage;
