import React from "react";
import { LoaderCircle } from "lucide-react";

const Loading = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
			<LoaderCircle className="animate-spin h-9 w-9 text-primary-3 mb-4" />
		</div>
	);
};

export default Loading;
