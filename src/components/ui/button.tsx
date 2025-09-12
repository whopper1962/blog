import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "transparent";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none cursor-pointer";
    let ringFocusClasses = "focus:ring-2 focus:ring-offset-2";
    let variantClasses = "";
    switch (variant) {
      case "default":
        variantClasses = "bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus:ring-blue-500";
        break;
      case "destructive":
        variantClasses = "bg-red-600 text-white shadow-sm hover:bg-red-700 focus:ring-red-500";
        break;
      case "outline":
        variantClasses =
          "border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700";
        break;
      case "secondary":
        variantClasses =
          "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600";
        break;
      case "ghost":
        variantClasses =
          "text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100";
        break;
      case "link":
        variantClasses = "text-blue-600 underline-offset-4 hover:underline focus:ring-blue-500 dark:text-blue-400";
        break;
      case "transparent":
        variantClasses =
          "bg-transparent text-inherit hover:bg-transparent border-0 border-transparent outline-0 outline-transparent outline-offset-0 focus:outline-0 focus:outline-transparent focus:outline-offset-0 focus:!ring-0 focus:!ring-offset-0 focus-visible:outline-0 focus-visible:outline-transparent focus-visible:outline-offset-0 focus-visible:!ring-0 focus-visible:!ring-offset-0";
        ringFocusClasses = "";
        break;
    }

    let sizeClasses = "";
    switch (size) {
      case "default":
        sizeClasses = "h-9 px-4 py-2";
        break;
      case "sm":
        sizeClasses = "h-8 px-3 py-1.5 text-xs";
        break;
      case "lg":
        sizeClasses = "h-10 px-6 py-2.5";
        break;
      case "icon":
        sizeClasses = "h-9 w-9 p-0";
        break;
    }

    const combinedClasses = `${baseClasses} ${ringFocusClasses} ${variantClasses} ${sizeClasses} ${className}`.trim();

    return <button ref={ref} className={combinedClasses} {...props} />;
  },
);

Button.displayName = "Button";

export { Button };
