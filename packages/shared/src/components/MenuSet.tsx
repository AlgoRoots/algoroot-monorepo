import type { Route } from "next";
import Link from "next/link";
import React, { type HTMLAttributes } from "react";

export interface MenuLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href?: Route<string> | URL | string;
}

const MenuLink = ({ href, children, ...props }: MenuLinkProps) => {
  if (!href) {
    throw new Error("MenuLink: href is required");
  }

  const isExternal = typeof href === "string" && href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href.toString()}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href as Route<string> | URL} {...props}>
      {children}
    </Link>
  );
};

export { MenuLink };
