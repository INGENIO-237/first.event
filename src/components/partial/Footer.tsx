'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/assets/logo-white.png';
import { IconType } from 'react-icons'
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ListUrl } from '@/app/_components/auth/ListUrl';

const Footer: React.FC = () => {

    interface Social {
        name: string;
        icon: IconType;
        link: string;
    }

    const socials: Social[] = [{
        name: 'Facebook',
        icon: FaFacebookF,
        link: 'https://www.facebook.com/',
    }, {
        name: 'Twitter',
        icon: FaXTwitter,
        link: 'https://x.com/',
    }, {
        name: 'LinkedIn',
        icon: FaLinkedin,
        link: 'https://www.linkedin.com/',
    }, {
        name: 'Instagram',
        icon: FaInstagram,
        link: 'https://www.instagram.com/',
    }]

    const firstLinks = [
        [{ link: '#', name: 'Tous les événements' }],
        [{ link: '#', name: 'Créer un événement' }],
        [{ link: '/login', name: 'Se connecter' }, { link: '/register', name: "S'inscrire" }]
    ];

    const secondLinks = [
        [{ link: '#', name: "À propos de nous" }],
        [{ link: '#', name: "Politique d'utilisation" }],
        [{ link: '#', name: "Évènement" }],
    ];

    const thirdLinks = [
        [{ link: '#', name: "FAQ" }],
        [{ link: '#', name: "Nous-contacter" }]
    ];
    return (
        <footer className="bg-first_violet text-white pb-2">
            <div className="px-4 md:px-8 md:py-8 mx-auto w-full">
                <div className="flex flex-col md:flex-row justify-between gap-10 lg:px-8">
                    <div className="flex flex-col justify-center items-center mb-8">
                        <Link href="/" className="my-4 md:my-0">
                            <Image src={logo} alt="FirstEvent Logo" width={250} height={40} />
                        </Link>
                        <div className="flex space-x-4">
                            {socials.map((social, index) => {

                                const Icon = social.icon
                                return (
                                    <Link key={index} href="#"
                                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-indigo-900 hover:bg-indigo-600 hover:text-white hover:shadow-sm hover:shadow-indigo-500 hover:font-semibold transition-colors">
                                        <span className="sr-only">{social.name}</span>
                                        <Icon />
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h3 className="font-bold mb-2">Liens rapides</h3>
                            <ul className="space-y-2 text-sm">
                                {firstLinks.map((link, index) => {
                                    return (
                                        <ListUrl key={index} links={link} />
                                    )
                                })}

                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">Entreprise</h3>
                            <ul className="space-y-2">
                                {secondLinks.map((link, index) => (
                                    <ListUrl key={index} links={link} />
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">Support</h3>
                            <ul className="space-y-2">
                                {thirdLinks.map((link, index) => (
                                    <ListUrl key={index} links={link} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center text-sm">
                <p>Copyright © 2024 FirstEvent | Tous droits réservés | Conçu et développé par <Link href="https://mentalists.ca" className="text-blue-300 hover:underline transition duration-300">Mentalists</Link></p>
            </div>
        </footer>
    );
};

export default Footer;