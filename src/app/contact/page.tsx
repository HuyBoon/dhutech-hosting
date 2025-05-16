"use client";
import React from "react";
import { motion } from "framer-motion";

const ContactPage = () => {
	return (
		<motion.div
			className="container mx-auto px-12 min-h-screen"
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
		>
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold b-4">Liên Hệ</h1>
				<p className=" max-w-2xl mx-auto">
					Chúng tôi luôn sẵn sàng hỗ trợ bạn. Gửi tin nhắn hoặc liên hệ qua
					thông tin bên dưới.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
				{/* Form */}
				<form className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 space-y-4">
					<input
						type="text"
						placeholder="Họ tên"
						className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
					/>
					<input
						type="email"
						placeholder="Email"
						className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
					/>
					<textarea
						rows={4}
						placeholder="Nội dung"
						className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
					></textarea>
					<button
						type="submit"
						className="px-6 py-2 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-full hover:opacity-90 transition"
					>
						Gửi liên hệ
					</button>
				</form>

				{/* Contact Info */}
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 space-y-4 text-gray-700 dark:text-gray-300">
					<h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
						Thông tin liên hệ
					</h2>
					<p>
						<strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP.HCM
					</p>
					<p>
						<strong>Email:</strong> support@yourhost.vn
					</p>
					<p>
						<strong>Hotline:</strong> 1900 123 456
					</p>
					<div className="flex space-x-4 mt-4">
						<a href="#" className="text-blue-500 hover:underline">
							Facebook
						</a>
						<a href="#" className="text-pink-500 hover:underline">
							TikTok
						</a>
						<a href="#" className="text-red-500 hover:underline">
							YouTube
						</a>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default ContactPage;
