import Link from "next/link";
import React from "react";

interface linkInterface {
    link: string;
    name: string | undefined;
}

export const ListUrl = ({ links }: { links: Array<{ link: string, name: string | undefined }> }): JSX.Element => {
    return (
        <li className="text-[#FCFCFC] text-base text-nowrap">
            {links.map((link: linkInterface, index: React.Key) => (
                    <Link key={index} href={link.link}
                        className="text-[14px] font-medium hover:text-blue-500 transition-colors ">
                        {link.name}
                    {index !== links.length - 1 && <span className="text-base">/ </span>}
                    </Link>
            ))}
        </li>
    )
}