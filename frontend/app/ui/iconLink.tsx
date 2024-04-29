import { ReactNode } from "react";
import React from "react";
import Link from "next/link";

export interface IconLinkProps {
  icon: ReactNode;
  linkName: string;
  link: string;
}

export function IconLink({ icon, linkName, link }: IconLinkProps) {
  return (
    <div className="mb-auto p-4">
      <Link legacyBehavior href={link}>
        <a
          className="p-3 text-decoration-none text-reset"
          style={{ fontSize: "24px" }}>
          {icon}
          <span className="p-3" style={{ fontSize: "16px" }}>
            {linkName}
          </span>
        </a>
      </Link>
    </div>
  );
}
export default IconLink;
