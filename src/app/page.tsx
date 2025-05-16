"use client";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

const fadeIn: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
	return (
		<div className="container pt-[120px] flex flex-col items-center min-h-screen ">
			<motion.h1
				className="text-xl lg:text-3xl font-bold mb-4"
				variants={fadeIn}
			>
				DHU-Tech Connection & Innovation
			</motion.h1>

			<motion.p
				className="text-sm text-center lg:text-base mb-6 max-w-lg"
				variants={fadeIn}
			>
				DHU Tech provides comprehensive solutions in technology, education,
				website development, and IT services.
			</motion.p>

			<motion.div className="flex gap-4 mb-10" variants={fadeIn}>
				<Link
					href={"/"}
					className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow"
				>
					Explore More
				</Link>
			</motion.div>
		</div>
	);
}
