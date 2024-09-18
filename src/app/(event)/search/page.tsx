'use client'
import { interests } from '@/utils/interests'
import Link from 'next/link'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

const Search = () => {
    const [visibleCount, setVisibleCount] = useState<number>(5);
    const [] = useState();
    // const [] = useState();

    const displayedCategories = interests.slice(0, visibleCount);

    const handleShowMore = () => {
        if (visibleCount + 5 <= interests.length) {
            setVisibleCount(visibleCount + 5)
        }
        else {
            setVisibleCount(interests.length)
        }
    };
    const handleShowLess = () => {
        if (visibleCount - 5 < 5) {
            setVisibleCount(5)
        }
        else {
            setVisibleCount(visibleCount - 5)
        }
    };

    return (
        <div className="grow min-h-full mt-20 md:mt-0 w-screen flex md:flex-row flex-col">
            <div className="flex flex-col h-screen md:w-3/5 gap-5 p-5">
                <span className="space-x-1 text-sm">
                    <Link href={'/'} className="underline p-1 text-first_violet" >Acceuil</Link>/
                    <Link href={'#'} className="underline p-1 text-first_violet">Canada</Link>/
                    <Link href={'#'} className="underline p-1 text-first_violet">Montréal</Link>/
                    <span>Tous les événements</span>
                </span>

                <div className="space-y-3">
                    <div>
                        <h1 className="text-2xl font-bold text-center md:text-start text-first_violet">Événements à Montréal, Canada</h1>
                        <h2 className="text-center md:text-start font-medium">Recherchez quelque chose que vous aimez ou consultez les événements populaires dans votre région</h2>
                    </div>
                    <div className='flex md:flex-row '>
                        <div>
                            {/* Filtres */}
                            <h2 className="font-bold text-xl text-['#5F5E5E']">Filtres</h2>
                            <div >
                                <div className="py-2">
                                    <span className="text-['#5F5E5E'] text-base font-semibold">Catégorie</span>
                                    <div className='mx-auto '>
                                        <motion.ul
                                            className='px-4 py-2'>
                                            {displayedCategories.map((item, index) => {
                                                const Icon = item.icon;
                                                return (
                                                    <motion.li
                                                        key={index}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -20 }}
                                                        transition={{ duration: 0.75 }}
                                                        className='flex flex-row gap-3 items-center text-first_violet' >
                                                        <Icon />
                                                        <span>{item.name}</span>
                                                    </motion.li>
                                                )
                                            })}
                                        </motion.ul>
                                        <div className='space-x-4 px-4 font-medium text-center'>

                                            {(visibleCount < interests.length) && (
                                                <motion.span
                                                    onClick={(e) => (handleShowMore())}
                                                    transition={{ duration: 0.75 }}
                                                    className='text-first_violet text-center text-base hover:underline transition duration-300'> Voir plus</motion.span>
                                            )}
                                            {(visibleCount > 5) && (
                                                <motion.span
                                                    onClick={(e) => (handleShowLess())}
                                                    transition={{ duration: 0.75 }}
                                                    className='text-first_violet text-center text-base transition duration-300'> Voir moins</motion.span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='py-2'>
                                    <span className="text-['#5F5E5E'] text-base font-semibold">Date</span>
                                    <div>
                                        <ul>
                                            <li className='space-x-2'>
                                                <input type='radio' id='date' value={'today'}/>
                                                <label about='date'>Aujourd&apos;ui</label>
                                            </li>
                                            <li className='space-x-2'>
                                                <input type='radio' id='date' value={'tomorrow'}/>
                                                <label>Demain</label>
                                            </li>
                                            <li className='space-x-2'>
                                                <input type='radio' id='date' value={'present-week'}/>
                                                <label>Cette semaine</label>
                                            </li>
                                            <li className='space-x-2'>
                                                <input type='radio' id='date' value={'select'} className='border-2' />
                                                <label>Choisis une date</label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center border items-center bg-black h-screen md:w-2/5'>

            </div>
        </div>
    )
}

export default Search