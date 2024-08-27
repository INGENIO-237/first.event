'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/assets/logo-white.png';
import { IconType } from 'react-icons'
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ListUrl } from '@/app/components/auth/ListUrl';

const Footer: React.FC = () => {

    interface Social {
        name: string;
        icon: IconType;
    }

    const socials: Social[] = [{
        name: 'Facebook',
        icon: FaFacebookF,
    }, {
        name: 'Twitter',
        icon: FaXTwitter,
    }, {
        name: 'LinkedIn',
        icon: FaLinkedin,
    }, {
        name: 'Instagram',
        icon: FaInstagram,
    }]
    return (
        <footer className="bg-first_violet text-white pb-2">
            <div className="px-4 md:px-8 md:py-8 mx-auto w-full">
                <div className="flex flex-col md:flex-row justify-between gap-10 lg:px-8">
                    <div className="flex flex-col justify-center items-center mb-8">
                        <Link href="/" className="mb-4 md:mb-0">

                            <Image src={logo} alt="FirstEvent Logo" width={250} height={40} />
                        </Link>
                        <div className="flex space-x-4">
                            {socials.map((social, index) => {

                                const Icon = social.icon
                                return (
                                    <Link key={index} href="#"
                                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-indigo-900 hover:bg-white/80 transition-colors">
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
                                <ListUrl links={[{ link: '#', name: 'Tous les événements' }]} />
                                <ListUrl links={[{ link: '#', name: 'Créer un événement' }]} />
                                <ListUrl links={[{ link: '/login', name: 'Se connecter' }, { link: '/register', name: "S'inscrire" }]} />
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">Entreprise</h3>
                            <ul className="space-y-2">
                                <ListUrl links={[{ link: '#', name: "À propos de nous" }]} />
                                <ListUrl links={[{ link: '#', name: "Politique d'utilisation" }]} />
                                <ListUrl links={[{ link: '#', name: "Évènement" }]} />
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">Support</h3>
                            <ul className="space-y-2">
                                <ListUrl links={[{ link: '#', name: "FAQ" }]} />
                                <ListUrl links={[{ link: '#', name: "Nous-contacter" }]} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center text-sm">
                <p>Copyright © 2024 FirstEvent | Tous droits réservés | Conçu et développé par <Link href="https://mentalists.ca" className="text-blue-300 hover:underline">Mentalists</Link></p>
            </div>
        </footer>
    );
};

export default Footer;