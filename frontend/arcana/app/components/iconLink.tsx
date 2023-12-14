import Image from "next/image";
import React from "react";
import { ReactNode } from "react";


export interface IconLinkProps {
    icon: ReactNode;
    linkname: string;
}


export function IconLink({ icon, linkname }: IconLinkProps) {
    return (
        <div className="mb-auto p-4">
            <a href={linkname} className="p-3" style={{ color: 'white', fontSize: '20px', textDecoration: 'none' }}>
                {icon}
                <span className="p-3" style={{ color: 'white', fontSize: '20px' }}>{linkname}</span>
            </a>
        </div>
    );
}
export default IconLink;

