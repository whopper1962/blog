import type React from "react";

interface IconLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function IconLink({ href, external = false, className = "", children, ...props }: IconLinkProps) {
  const rel = external ? "noreferrer noopener" : props.rel;
  const target = external ? "_blank" : props.target;

  const baseClasses = "text-muted-foreground hover:text-blue-600 transition-all hover:scale-110";

  return (
    <a href={href} className={`${baseClasses} ${className}`.trim()} rel={rel} target={target} {...props}>
      {children}
    </a>
  );
}
