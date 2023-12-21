import { ReactNode } from "react";
import React from "react";
import Link from "next/link";


export interface IconLinkProps {
    icon: ReactNode;
    linkname: string;
}


export function IconLink({ icon, linkname }: IconLinkProps) {
  return (
    <div className="mb-auto p-4">
      <Link legacyBehavior href={linkname}>
        <a className="p-3 text-decoration-none text-reset" style={{ fontSize: '24px' }}>
          {icon}
          <span className="p-3" style={{ fontSize: '16px' }}>{linkname}</span>
        </a>
      </Link>
    </div>
  );
}
export default IconLink;
