import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import logo from '/public/assets/logo-white.png';

import {ListUrl} from "@/app/components/auth/ListUrl";
import {Facebook, X, Linkedin, Instagram, LucideIcon, Twitter} from "lucide-react";
import {cn} from "@/lib/utils";

const Footer: React.FC = () => {
    interface Social {
        name: string;
        icon: LucideIcon;
        href: string,
        color: string
    }

    const socials: Social[] = [{
        name: 'Facebook',
        icon: Facebook,
        href: 'https://www.facebook.com/',
        color: 'text-[#0053ff]'
    }, {
        name: 'X',
        icon: Twitter,
        href: 'https://x.com/',
        color: 'text-[#1DA1F2]'
    }, {
        name: 'LinkedIn',
        icon: Linkedin,
        href: 'https://www.linkedin.com/',
        color: 'text-[#0077B5]'
    }, {
        name: 'Instagram',
        icon: Instagram,
        href: 'https://www.instagram.com/',
        color: 'text-[#E4405F]'
    }]
    return (
        <footer className="bg-[#270B87] text-white w-screen m-0 p-0">
            <div className="mx-0 py-8">
                <div className="flex flex-col lg:flex-row justify-between gap-8 m-4">
                    <div className="flex flex-col justify-between items-center mb-8">
                        <div className="flex space-x-4">
                            {socials.map((social, index) => {

                                const Icon = social.icon
                                return (
                                    <Link key={index} href="#"
                                          className={cn(social.color, `w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-colors`)}>
                                        <span className="sr-only">{social.name}</span>
                                        <Icon/>
                                    </Link>
                                )
                            })}
                        </div>
                        <div className="mb-4 md:mb-0">

                            <Image src={logo} alt="FirstEvent Logo" width={250} height={40}/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h3 className="font-bold mb-2">Liens rapides</h3>
                            <ul className="space-y-2">
                                <ListUrl links={[{link: "#", name: "Tous les événements"}]}/>
                                <ListUrl links={[{link: "#", name: "Créer un événement"}]}/>
                                <ListUrl links={[{link: "#", name: "Se connecter"}, {link: "#", name: "S'inscrire"}]}/>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">Entreprise</h3>
                            <ul className="space-y-2">
                                <ListUrl links={[{link: "#", name: "À propos de nous"}]}/>
                                <ListUrl links={[{link: "#", name: "Politique d'utilisation"}]}/>
                                <ListUrl links={[{link: "#", name: "Événement"}]}/>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">Support</h3>
                            <ul className="space-y-2">
                                <ListUrl links={[{link: "#", name: "FAQ"}]}/>
                                <ListUrl links={[{link: "#", name: "Nous-contacter"}]}/>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center text-sm pb-5">
                <p>Copyright © 2024 FirstEvent | Tous droits réservés <span className="hidden lg:inline">|</span> Conçu
                    et développé par <Link
                        href="https://mentalists.ca"
                        className="text-[#006FFC] font-medium hover:text-blue-500 transition-colors">Mentalists</Link>
                </p>
            </div>
        </footer>
    );
};

export default Footer;