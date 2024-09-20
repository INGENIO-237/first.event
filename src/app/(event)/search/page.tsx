'use client'
import { interests } from '@/utils/interests'
import Link from 'next/link'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import Checkbox from '@/app/_components/Checkbox'
import EventBanner from '@/app/_components/event/EventBanner'
import event from '/public/assets/images/event-image.png'

const Search = () => {
    const [visibleCount, setVisibleCount] = useState<number>(5);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [tarif, setTarif] = useState<string>('');
    const [format, setFormat] = useState<string>('');
    const [likedOrganisers, setLikedOrganisers] = useState<boolean>(false);
    const [onlineEvents, setOnlineEvents] = useState<boolean>(false);
    // const [] = useState();

  const displayedCategories = interests.slice(0, visibleCount);

  const handleShowMore = () => {
    if (visibleCount + 5 <= interests.length) {
      setVisibleCount(visibleCount + 5);
    } else {
      setVisibleCount(interests.length);
    }
  };
  const handleShowLess = () => {
    if (visibleCount - 5 < 5) {
      setVisibleCount(5);
    } else {
      setVisibleCount(visibleCount - 5);
    }
  };

    return (
        <div className="grow min-h-full mt-16 md:mt-0 w-screen flex md:flex-row flex-col-reverse">
            <div className="flex flex-col min-h-screen md:w-3/5 gap-5 pt-2 px-3">
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
                    <div className='flex flex-col md:flex-row w-full py-3 gap-3'>
                        <div className='md:w-4/12 mx-auto'>
                            {/* Filtres */}
                            <h2 className="font-bold text-xl text-['#5F5E5E']">Filtres</h2>
                            <div className='grid grid-cols-2 md:grid-cols-1 md:space-y-3' >
                                <div className="py-2 ">
                                    <span className="text-['#5F5E5E'] text-base font-semibold">Catégorie</span>
                                    <div className='mx-auto '>
                                        <motion.ul
                                            className='px-4 py-1'>
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
                                                    className='text-first_violet text-center text-base transition hover:underline duration-300'> Voir moins</motion.span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='py-2'>
                                    <span className="text-['#5F5E5E'] text-base font-semibold">Date</span>
                                    <div>
                                        <ul className='flex flex-col gap-2 px-4'>
                                            <li className='space-x-2'>
                                                <input type='radio' id={'today'} checked={selectedDate === 'today'} onChange={() => selectedDate === 'today' ? setSelectedDate('') : setSelectedDate('today')} />
                                                <label htmlFor='today'>Aujourd&apos;ui</label>
                                            </li>
                                            <li className='space-x-2'>
                                                <input type='radio' id={'tomorrow'} checked={selectedDate === 'tomorrow'} onChange={() => selectedDate === 'tomorrow' ? setSelectedDate('') : setSelectedDate('tomorrow')} />
                                                <label htmlFor='tomorrow'>Demain</label>
                                            </li>
                                            <li className='space-x-2'>
                                                <input type='radio' id={'present-week'} checked={selectedDate === 'present-week'} onChange={() => selectedDate === 'present-week' ? setSelectedDate('') : setSelectedDate('present-week')} />
                                                <label htmlFor='present-week'>Cette semaine</label>
                                            </li>
                                            <li className='space-x-2'>
                                                <input type='radio' id={'select'} className='border-2' checked={selectedDate === 'select'} onChange={() => selectedDate === 'select' ? setSelectedDate('') : setSelectedDate('select')} />
                                                <label htmlFor='select'>Choisis une date</label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='py-2'>
                                    <span className="text-['#5F5E5E'] text-base font-semibold">Tarif</span>
                                    <div>
                                        <ul className='flex flex-col gap-2 px-4'>
                                            <li className='space-x-2'>
                                                <input type='radio' id={'free'} checked={tarif === 'free'} onChange={() => tarif === 'free' ? setTarif('') : setTarif('free')} />
                                                <label htmlFor='free'>Gratuit</label>
                                            </li>
                                            <li className='space-x-2'>
                                                <input type='radio' id={'paid'} checked={tarif === 'paid'} onChange={() => tarif === 'paid' ? setTarif('') : setTarif('paid')} />
                                                <label htmlFor='paid'>Payant</label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='py-2 '>
                                    <span className="text-['#5F5E5E'] text-base font-semibold">Format</span>
                                    <div>
                                        <ul className='flex flex-col gap-2 px-4'>
                                            <li className='space-x-2'>
                                                <input type='radio' id={'class'} checked={format === 'class'} onChange={() => format === 'class' ? setFormat('') : setFormat('class')} />
                                                <label htmlFor='class'>Classe</label>
                                            </li>
                                            <li className='space-x-2'>
                                                <input type='radio' id={'conference'} checked={format === 'conference'} onChange={() => format === 'conference' ? setFormat('') : setFormat('conference')} />
                                                <label htmlFor='conference'>Conférence</label>
                                            </li>
                                            <li className='space-x-2'>
                                                <input type='radio' id={'fest'} checked={format === 'fest'} onChange={() => format === 'fest' ? setFormat('') : setFormat('fest')} />
                                                <label htmlFor='fest'>Festival</label>
                                            </li>
                                            <li className='space-x-2'>
                                                <input type='radio' id={'party'} checked={format === 'party'} onChange={() => format === 'party' ? setFormat('') : setFormat('party')} />
                                                <label htmlFor='party'>Fête</label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="space-y-4 ">
                                    <div className='flex items-center'>
                                        <Checkbox id={'organizers'} size={5} checked={likedOrganisers} label={"Afficher uniquement les événements des organisateurs que je suis."} primaryColor="" onChange={() => { setLikedOrganisers(!likedOrganisers) }} />
                                    </div>
                                    <div className='flex items-center'>
                                        <Checkbox id='online' size={5} checked={onlineEvents} label={"Rechercher des événrments en ligne."} primaryColor="" onChange={() => { setOnlineEvents(!onlineEvents) }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full md:w-8/12 space-y-3'>
                            {/*  Banners*/}
                            {events.map((event, index) => <EventBanner key={index} {...event} />)}
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center  items-center  h-auto md:w-2/5'>
                Map
            </div>
        </div>
    )
}

const events = [
    {
        id: 1,
        title: 'Event 1',
        image: event,
        place: 'Place 1',
        date: '2022-01-01',
        time: '10:00',
        category: 'Category 1',
    },
    {
        id: 2,
        title: 'Event 2',
        image: event,
        place: 'Place 2',
        date: '2022-01-02',
        time: '10:00',
        category: 'Category 2',
    },
    {
        id: 3,
        title: 'Event 3',
        image: event,
        place: 'Place 3',
        date: '2022-01-03',
        time: '10:00',
        category: 'Category 3',
    },
    {
        id: 4,
        title: 'Event 4',
        image: event,
        place: 'Place 4',
        date: '2022-01-04',
        time: '10:00',
        category: 'Category 4',
    },
    {
        id: 5,
        title: 'Event 5',
        image: event,
        place: 'Place 5',
        date: '2022-01-05',
        time: '10:00',
        category: 'Category 5',
    },
    {
        id: 6,
        title: 'Event 6',
        image: event,
        place: 'Place 6',
        date: '2022-01-06',
        time: '10:00',
        category: 'Category 6',
    },
    {
        id: 7,
        title: 'Event 7',
        image: event,
        place: 'Place 7',
        date: '2022-01-07',
        time: '10:00',
        category: 'Category 7',
    },
    {
        id: 8,
        title: 'Event 8',
        image: event,
        place: 'Place 8',
        date: '2022-01-08',
        time: '10:00',
        category: 'Category 8',
    },
]
export default Search