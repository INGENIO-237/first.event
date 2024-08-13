import Link from "next/link";
import React from "react";

{/*On fait component contenant un li avec autant de liens que l'on voudra afficher, dont un component avec des parametres de type {link1, link2, etc...}*/
}
export const ListUrl = ({links}: { links: Array<{ link: string, name: string | undefined }> }) => {
    return (
        <>
            <li className="text-[#FCFCFC] text-base text-nowrap">
                {links.map((link: {
                    link: string;
                    name: string | undefined;
                }, index: React.Key | null | undefined) => (
                    <>
                        <Link key={index} href={link.link} className="text-[14px] font-medium hover:text-blue-500 transition-colors ">
                            {link.name}
                        </Link>
                        {/*Si on a plus d'un lien, on ajoute un slash*/}
                        {index !== links.length - 1 && <span className="text-base">/</span>}
                    </>
                ))}
            </li>
        </>
    )
}