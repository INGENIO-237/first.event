import { FaPlus, FaStoreAlt, FaTicketAlt } from 'react-icons/fa';
import { FcPlanner } from 'react-icons/fc';
import { GiOrganigram } from 'react-icons/gi';
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoMdHeartEmpty } from "react-icons/io";

let ticketNumber = 1;

export const dropdownLinks = [
    // {
    //   title: 'Parcourez les événements',
    //   link: '#',
    // },
    {
        title: `Tickets(${ticketNumber})`,
        link: '#',
    },
    {
        title: 'Favoris',
        link: '#',
    },
    {
        title: 'Centre d\'intérêts',
        link: '#',
    },
    {
        title: 'Paramètres du compte',
        link: '#',
    },
    {
        title: 'Historique',
        link: '#',
    },
    {
        title: 'Se déconnecter',
        link: '#',
    },
];
export const links = [
    {
        title: 'Boutique',
        icon: FaStoreAlt,
        link: '#',
        accessibleBy: 'user'
    },
    {
        title: 'Organisateur',
        icon: FcPlanner,
        link: '#',
        accessibleBy: 'organizer'
    },
    {
        title: 'Communicateur',
        icon: GiOrganigram,
        link: '#',
        accessibleBy: 'influencer'
    },
    {
        title: 'Créer',
        icon: FaPlus,
        link: '#',
        accessibleBy: 'organizer'
    },
    {
        title: 'Favoris',
        icon: IoMdHeartEmpty,
        link: '#',
        accessibleBy: 'user'
    },
    {
        title: 'Tickets',
        icon: FaTicketAlt,
        link: '#',
        accessibleBy: 'influencer'
    },
    {
        title: 'Panier',
        icon: HiOutlineShoppingCart,
        link: '#',
        accessibleBy: 'user'
    },
];