import DashboardEventCaroussel from '@/components/custom/dashboard/DashboardEventCaroussel'
import Header from '../_components/Header'
import DashboardOrganizersCaroussel from '@/components/custom/dashboard/DashboardOrganizersCaroussel';
import { PencilLine, WandSparkles } from 'lucide-react';
import Link from 'next/link';

const page = () => {
    return (
        <div className="flex flex-col py-10 px-7 md:px-20 grow w-full min-h-svh">
            <div className='w-full h-full space-y-5'>
                {/* Head */}
                <Header title='Bonjour, Exemple' subtitle='Résumé de mes activités' />

                <DashboardEventCaroussel title='Mes Événements en cours' events={events} />
                <DashboardOrganizersCaroussel title='Mes Organisateurs' organizers={organizers} />
                <div className="flex flex-col md:flex-row gap-x-4 justify-center w-full">
                    <div className="bg-[#F1F1F1] md:w-1/2 p-4 text-center flex flex-col justify-center items-center space-y-3">
                        <span className='border rounded-full border-black p-2 text-center text-first_violet bg-white'>
                            <PencilLine />
                        </span>
                        <h2 className='text-2xl font-semibold text-[#5F5E5E] '>
                            Commence ici
                        </h2>
                        <h4>
                            Communiquer sur des événements en cours , contactez les organisateurs, recevez votre code promtionnel et gagnez de l&apos;argent.
                        </h4>
                        <Link href={'#'} className="text-first_violet border p-2 bg-white font-semibold border-first_violet hover:bg-first_violet hover:text-white">
                            Contacter les organisateurs
                        </Link>
                    </div>
                    <div className="bg-[#F1F1F1] md:w-1/2 p-4 text-center flex flex-col justify-center items-center space-y-3">
                        <span className='border rounded-full border-black p-2 text-center text-first_violet bg-white'>
                            <WandSparkles />
                        </span>
                        <h2 className='text-2xl font-semibold text-[#5F5E5E] '>
                            Codes promotionnels
                        </h2>
                        <h4>
                            Vendez plus de billets avec vos codes promotionels d&apos;affiliation des événements en cours. Utilisez des canaux de communications pour atteindre un maximim de cible.
                        </h4>
                        <Link href={'#'} className="text-first_violet border p-2 bg-white font-semibold border-first_violet hover:bg-first_violet hover:text-white">
                            Essayez-le maintenant !
                        </Link>
                    </div>

                </div>
            </div>
        </div>

    )
}

const events = [
    {
        title: "Stratégie de changement réussie pour les entreprises",
        day: "Mercredi",
        hour: "17h00",
        price: "120",
        place: "Douala",
        image: "/assets/images/setup-account/conference.png",
        organizer: "Organizer",
    },
    {
        title: "Stratégie de changement réussie pour les entreprises",
        day: "Lundi",
        hour: "17h00",
        price: "120",
        place: "Douala",
        image: "/assets/images/setup-account/conference-2.png",
        organizer: "Organizer",
    },
    {
        title: "Stratégie de changement réussie pour les entreprises",
        day: "Samedi",
        hour: "17h00",
        price: "130",
        place: "Douala",
        image: "/assets/images/setup-account/fourth-step.png",
        organizer: "Organizer",
    },
    {
        title: "Stratégie de changement réussie pour les entreprises",
        day: "Mercredi",
        hour: "17h00",
        price: "120",
        place: "Douala",
        image: "/assets/images/setup-account/conference.png",
        organizer: "Organizer",
    },
    {
        title: "Stratégie de changement réussie pour les entreprises",
        day: "Lundi",
        hour: "17h00",
        price: "120",
        place: "Douala",
        image: "/assets/images/setup-account/conference-2.png",
        organizer: "Organizer",
    },
    {
        title: "Stratégie de changement réussie pour les entreprises",
        day: "Samedi",
        hour: "17h00",
        price: "130",
        place: "Douala",
        image: "/assets/images/setup-account/fourth-step.png",
        organizer: "Organizer",
    },

];

const organizers = [
    {
        id: 1,
        name: "Organizer 1",
        liked: true,
        image: "/assets/images/dashboard/profile.png",
        eventsCount: 3,
        askLink: '#',
    },
    {
        id: 2,
        name: "Organizer 2",
        liked: true,
        image: "/assets/images/dashboard/profile.png",
        eventsCount: 1,
        askLink: '#',
    },
    {
        id: 3,
        name: "Organizer 3",
        liked: false,
        image: "/assets/images/dashboard/profile.png",
        eventsCount: 0,
        askLink: '#',
    },
    {
        id: 4,
        name: "Organizer 4",
        liked: true,
        image: "/assets/images/dashboard/profile.png",
        eventsCount: 5,
        askLink: '#',
    },
];
export default page