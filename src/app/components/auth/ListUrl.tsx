import Link from "next/link";
import React from "react";

interface linkInterface {
    link: string;
    name: string;
}

export const ListUrl = ({ links }: { links: Array<linkInterface> }): JSX.Element => {
    return (
        <li className="text-[#FCFCFC] text-base text-nowrap flex">
            {links.map((link: linkInterface, index: React.Key) => (
                <div  key={index}>
                    <Link href={link.link}
                        className="text-[14px] font-medium hover:text-blue-500 transition-colors ">
                        {link.name}
                    </Link>
                    {index !== links.length - 1 && <span className="text-base">{" "}/{" "}</span>}
                </div>
            ))}
        </li>
    )
}