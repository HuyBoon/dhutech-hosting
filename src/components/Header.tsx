"use client";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import MenuItem from "./MenuItem";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { CircleUser } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const navItems = [
	{ name: "Account", href: "/admin/account" },
	{ name: "Hosting", href: "/admin/hosting" },
	{ name: "Deploy", href: "/admin/manage" },
	{ name: "About Us", href: "/about" },
	{ name: "Contact", href: "/contact" },
];

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { scrollY } = useScroll();
	const router = useRouter();
	useMotionValueEvent(scrollY, "change", (latest) => {
		setIsScrolled(latest > 50);
	});
	const toHome = () => {
		router.push("/");
	};

	return (
		<motion.nav
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			className={`fixed w-full z-50 ${
				isScrolled
					? "backdrop-blur-2xl bg-background/90 shadow-2xl shadow-primary/10"
					: "backdrop-blur-lg bg-background/50"
			} transition-all duration-300 ease-out`}
		>
			<div className="max-w-7xl mx-auto px-6 py-3">
				<div className="flex items-center justify-between">
					{/* Logo Section */}
					<motion.div
						whileHover={{ scale: 1.05 }}
						className="flex items-center gap-2 group"
					>
						<Link
							href="/"
							className="font-semibold text-content/90 group-hover:text-primary transition-colors"
						>
							DHUTECH.
						</Link>
					</motion.div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-6">
						<div
							className="flex items-center gap-6 bg-background/80 px-4 py-2 
            							rounded-full border border-white/5 shadow-lg shadow-primary/5"
						>
							{navItems.map((item, i) => (
								<MenuItem key={item.name} index={i} href={item.href}>
									{item.name}
								</MenuItem>
							))}
						</div>

						<div className="h-6 w-px bg-white/10 mx-2" />

						<div className="flex gap-3">
							<button
								onClick={() => {
									router.push("/login");
								}}
								className="p-2 cursor-pointer rounded-lg bg-white/5 hover:bg-primary/10 transition-colors group"
							>
								<CircleUser className="h-5 w-5 text-content/80 group-hover:text-primary transition-colors" />
							</button>
						</div>
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-primary/10 transition-colors"
					>
						{isMenuOpen ? (
							<XMarkIcon className="h-6 w-6 text-content/80" />
						) : (
							<Bars3Icon className="h-6 w-6 text-content/80" />
						)}
					</button>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						className="md:hidden mt-4 pb-4 space-y-4"
					>
						{navItems.map((item) => (
							<a
								key={item.name}
								href={item.href}
								onClick={() => setIsMenuOpen(false)}
								className="block px-4 py-2 text-content/80 hover:text-hover hover:bg-white/5 
                				rounded-lg transition-colors"
							>
								{item.name}
							</a>
						))}
						<div className="pt-4 border-t border-white/5 flex gap-4">
							<button
								onClick={() => {
									setIsMenuOpen(false);
									router.push("/login");
								}}
								className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 transition-colors group"
							>
								<CircleUser className="h-5 w-5 text-content/80 group-hover:text-primary transition-colors" />
							</button>
						</div>
					</motion.div>
				)}
			</div>
		</motion.nav>
	);
}
