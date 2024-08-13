import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import logo from '/public/assets/logo-white.png';
import {IconType} from 'react-icons'
import {FaFacebookF, FaInstagram, FaLinkedin} from "react-icons/fa";
import {FaX} from "react-icons/fa6";

const Footer: React.FC = () => {
    // on fait une interface pour les réseaux sociaux qui aura le nom du réseau et l'icône
    interface Social {
        name: string;
        icon: IconType;
    }

    const socials: Social[] = [{
        name: 'Facebook',
        icon: FaFacebookF,
    }, {
        name: 'Twitter',
        icon: FaX,
    }, {
        name: 'LinkedIn',
        icon: FaLinkedin,
    }, {
        name: 'Instagram',
        icon: FaInstagram,
    }]
    return (
        <footer className="bg-indigo-900 text-white w-screen">
            <div className="container mx-0 py-8">
                <div className="flex flex-col lg:flex-row justify-between gap-8 m-8">
                    <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
                        <div className="flex space-x-4">
                            {socials.map((social, index) => {

                                const Icon = social.icon
                                return (
                                    <Link key={index} href="#"
                                          className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-indigo-900">
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
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-8 mb-8">
                        <div>
                            <h3 className="font-bold mb-2">Liens rapides</h3>
                            <ul className="space-y-2">
                                <li><Link href="#">Tous les événements</Link></li>
                                <li><Link href="#">Créer un événement</Link></li>
                                <li><Link href="#">Se connecter</Link> / <Link href="#">S&lsquo;inscrire</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">Entreprise</h3>
                            <ul className="space-y-2">
                                <li><Link href="#">À propos de nous</Link></li>
                                <li><Link href="#">Politique d&lsquo;utilisation</Link></li>
                                <li><Link href="#">Événement</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">Support</h3>
                            <ul className="space-y-2">
                                <li><Link href="#">FAQ</Link></li>
                                <li><Link href="#">Nous-contacter</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center text-sm">
                <p>Copyright © 2024 FirstEvent | Tous droits réservés | Conçu et développé par <Link
                    href="https://mentalists.ca" className="text-blue-300 hover:underline">Mentalists</Link></p>
            </div>
        </footer>
    );
};

export default Footer;