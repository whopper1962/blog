"use client";

import { forwardRef, useState } from "react";
import type { HTMLAttributes, ImgHTMLAttributes, SyntheticEvent } from "react";
import Image from "next/image";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

interface AvatarImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

type AvatarFallbackProps = HTMLAttributes<HTMLDivElement>;

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({ className = "", size = "md", ...props }, ref) => {
  let sizeClasses = "";
  switch (size) {
    case "sm":
      sizeClasses = "h-8 w-8 text-xs";
      break;
    case "md":
      sizeClasses = "h-10 w-10 text-sm";
      break;
    case "lg":
      sizeClasses = "h-12 w-12 text-base";
      break;
    case "xl":
      sizeClasses = "h-16 w-16 text-lg";
      break;
  }

  return (
    <div
      ref={ref}
      className={`relative flex shrink-0 overflow-hidden rounded-full ${sizeClasses} ${className}`}
      {...props}
    />
  );
});

const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className = "", fallback, onError, src, alt = "Avatar image" }, ref) => {
    const [hasError, setHasError] = useState(false);

    const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
      setHasError(true);
      onError?.(e);
    };

    if ((hasError || !src) && fallback) {
      return (
        <div
          className={`flex h-full w-full items-center justify-center bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 ${className}`}
        >
          {fallback}
        </div>
      );
    }

    return (
      <Image
        ref={ref}
        src={typeof src === "string" ? src : ""}
        alt={alt}
        className={`aspect-square h-full w-full object-cover ${className}`}
        onError={handleError}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "100%" }}
      />
    );
  },
);

const AvatarFallback = forwardRef<HTMLDivElement, AvatarFallbackProps>(({ className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex h-full w-full items-center justify-center bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 ${className}`}
      {...props}
    />
  );
});

Avatar.displayName = "Avatar";
AvatarImage.displayName = "AvatarImage";
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
