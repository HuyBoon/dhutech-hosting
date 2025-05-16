"use client";
import React from "react";
import { motion } from "framer-motion";

const AboutUsPage = () => {
	return (
		<motion.div
			className="container mx-auto px-12 min-h-screen"
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
		>
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold  mb-4">Về Chúng Tôi</h1>
				<p className=" max-w-2xl mx-auto">
					Chúng tôi là một đội ngũ đam mê công nghệ, cung cấp giải pháp hosting
					và phát triển web chất lượng cao cho cá nhân và doanh nghiệp.
				</p>
			</div>

			<div className=" grid grid-cols-1 items-center md:grid-cols-2 gap-10">
				<div>
					<h2 className="text-2xl font-semibold  mb-4">
						Sứ mệnh của chúng tôi
					</h2>
					<p className="">
						Mang đến dịch vụ ổn định, bảo mật và hiệu quả để khách hàng yên tâm
						phát triển kinh doanh trực tuyến.
					</p>
				</div>

				<div>
					<h2 className="text-2xl font-semibold  mb-4">Giá trị cốt lõi</h2>
					<ul className="list-disc list-inside  space-y-2">
						<li>Uy tín và trách nhiệm</li>
						<li>Đổi mới và sáng tạo</li>
						<li>Hỗ trợ tận tình 24/7</li>
						<li>Khách hàng là trung tâm</li>
					</ul>
				</div>
			</div>

			<div className="mt-16 text-center">
				<h2 className="text-2xl font-semibold  mb-4">Đội ngũ của chúng tôi</h2>
				<p className=" max-w-xl mx-auto">
					Gồm các chuyên gia trong lĩnh vực server, bảo mật, thiết kế UI/UX và
					phát triển hệ thống.
				</p>
			</div>
		</motion.div>
	);
};

export default AboutUsPage;
