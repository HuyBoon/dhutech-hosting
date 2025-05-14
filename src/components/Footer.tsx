"use client";
import React, { useEffect } from "react";

import Link from "next/link";

const Footer = () => {
	return (
		<footer className="bg-gray-900 text-white py-8">
			<div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				{/* About Section */}
				<div className="space-y-4">
					<h4 className="text-lg font-semibold">DHU Tech Connections</h4>
					<p className="text-sm">
						We're dedicated to delivering innovative technology solutions
						tailored to meet the unique needs of businesses like yours.
					</p>
				</div>

				{/* Services Section */}
				<div className="space-y-4">
					<h4 className="text-lg font-semibold">Services We Offer</h4>
					<ul className="text-sm space-y-2">
						<li>Software Development</li>
						<li>IT Consulting & Support</li>
					</ul>
				</div>

				{/* Useful Links Section */}
				<div className="space-y-4">
					<h4 className="text-lg font-semibold">Useful Links</h4>
					<ul className="text-sm flex flex-col gap-1 space-y-2">
						<Link href="/">About Us</Link>
						<Link href="/">Forums</Link>
						<Link href="/">Contact Us</Link>
						<Link href="/privacy-policy">Our Privacy Policy</Link>
						<Link href="/terms-of-service">Our Terms of Service</Link>
					</ul>
				</div>

				{/* Contact Section */}
				<div className="space-y-4">
					<h4 className="text-lg font-semibold">Contact Us</h4>
					<ul className="text-sm space-y-2">
						{/* <li>Phone: 0984 18 13 04</li> */}
						<li>Email: dhutechvietnam@gmail.com</li>
						<li>Website: dhutech.com</li>
					</ul>
				</div>
			</div>
			<div className="mt-8 text-center text-sm border-t border-gray-700 pt-4">
				<p>Copyright &copy; 2025 DHUTech. All Rights Reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
