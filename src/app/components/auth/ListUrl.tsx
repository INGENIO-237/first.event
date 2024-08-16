import Link from "next/link";
import React from "react";

export const ListUrl = ({links}: { links: Array<{ link: string, name: string | undefined }> }) => {
    return (
        <>
            <li className="text-[#FCFCFC] text-base text-nowrap">
                {links.map((link: {
                    link: string;
                    name: string | undefined;
                }, index: React.Key | null | undefined) => (
                    <>
                        <Link key={index} href={link.link}
                              className="text-[14px] font-medium hover:text-blue-500 transition-colors ">
                            {link.name}
                        </Link>
                        {index !== links.length - 1 && <span className="text-base">/</span>}
                    </>
                ))}
            </li>
        </>
    )
}