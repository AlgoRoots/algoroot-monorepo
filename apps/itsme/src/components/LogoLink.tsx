import { cn } from "@algoroot/ui/lib/utils";
import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

export const LogoLink = ({
  href,
  subTitle,
  className,
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  subTitle?: string;
}) => {
  return (
    <Link
      href={href}
      className={cn("font-mono text-xl font-bold tracking-tighter", className)}
    >
      It's ME!
      <p className="text-primary text-xs">{subTitle}</p>
    </Link>
  );
};
