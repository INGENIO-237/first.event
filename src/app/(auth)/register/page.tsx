'use client'
import React from 'react';
import Image from 'next/image';

import login from '/public/assets/images/auth-image2.png';

import logo from '/public/assets/logo.png';
import Link from "next/link";


export default function Page() {
    return (
        <>
            <div className="w-screen h-screen md:flex flex-row">
                {/* Form section */}
                <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full">
                        <div className="flex justify-start items-center">
                            <Image src={logo} alt="FirstEvent Logo" width={150} height={37.5} className="mb-6 w-60"/>
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-indigo-900">Créer un compte</h1>

                        <form className="space-y-4">
                            <div>
                                <input type="email" key="email" id="email" placeholder="Adresse email"
                                       className="w-full p-2 border rounded"/>
                            </div>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <input type="text" key="name" placeholder="Nom"
                                       className="w-full sm:w-1/2 p-2 border rounded"/>
                                <input type="text" key="firstname" id="firstname" placeholder="Prénom"
                                       className="w-full sm:w-1/2 p-2 border rounded"/>
                            </div>
                            <div>
                                <input type="password" placeholder="Mot de passe"
                                       className="w-full p-2 border rounded"/>
                                <p className="text-xs text-gray-500 mt-1">Votre mot de passe doit comporter au moins 8
                                    caractères.</p>
                            </div>
                            <div className="flex items-start">
                                <input type="checkbox" id="terms" className="mt-1 mr-2"/>
                                <label htmlFor="terms" className="text-sm">
                                    J&apos;accepte les <Link href={"#"} className="text-blue-500">conditions
                                    d&apos;utilisation</Link> et les
                                    <Link href={"#"} className="text-blue-500"> directives de la communauté de
                                        FirstEvent</Link> et j&apos;ai lu
                                    la <Link href={"#"} className="text-blue-500">politique de confidentialité</Link>.
                                </label>
                            </div>
                            <button type="submit"
                                    disabled
                                    className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition duration-300 hover:cursor-not-allowed">
                                Créer un compte
                            </button>
                        </form>

                        <p className="mt-4 text-center">
                            <Link href={'/login'} className="text-blue-500 hover:underline">Connectez-vous</Link>
                        </p>
                    </div>
                </div>

                {/* Image section - hidden on mobile */}
                <div className='bg-white w-1/2 h-full hidden lg:flex'>
                    <Image src={login} alt="Next.js Logo"
                           className='w-full flex object-cover justify-center h-auto' width={800} height={0}/>
                </div>
            </div>
        </>

    );
};
