import { BsCameraReels } from "react-icons/bs";
import { CiMusicNote1 } from "react-icons/ci";
import { FaBus, FaCar, FaRunning, FaStopwatch } from "react-icons/fa";
import { Fa9, FaHeartPulse, FaMasksTheater, FaPeopleGroup } from "react-icons/fa6";
import { GiGreenhouse } from "react-icons/gi";
import { HiBuildingOffice, HiMiniCog } from "react-icons/hi2";
import { IoAirplaneOutline } from "react-icons/io5";
import { MdOutlineBusinessCenter, MdOutlineFamilyRestroom } from "react-icons/md";
import { PiCoatHanger, PiHandsPrayingFill } from "react-icons/pi";

    interface Interest {
        name: string,
        icon: JSX.Element,
        tags: Array<string>
    }
type Interests = Array<Interest>
export const interests: Interests = [
    {
        name: 'Musique',
        icon: <CiMusicNote1 />,
        tags: ['Alternative', 'Blues et Jazz', 'Classique', 'Pays', 'Latin', 'Culturel', 'GED/Électronique', 'Populaire', 'Hip-Hop/Rap', 'Métal', 'Indépendant', 'Opéra', 'R&B', 'Réligieux/Spirituel', ' Reggae', 'Rocher', 'Top-40', 'Americaine', 'Blues', 'Patûrin', 'Acoustique', 'DJ/Danse', 'Éxpérimental', 'Monde', 'Psychédélique', 'Punk/Hardcore', 'Chanteur/Compositeur', 'GED', 'Autre'],
    },
    {
        name: 'Affaires',
        icon: <MdOutlineBusinessCenter />,
        tags: ['Startups et petites entreprises', 'Finace', 'Éducateurs', 'Média', 'Association à buts non lucratif et ONG', 'Carrière', 'Investissement', 'Conception', 'Autre'],
    },
    {
        name: 'Nourritures et boissons',
        icon: <Fa9 />,
        tags: ['Bière', 'Vin', 'Nourriture', 'Spiritieux', 'Autre']
    },
    {
        name: 'Communauté',
        icon: <FaPeopleGroup />,
        tags: ['État', 'Comté', 'Ville/Village', 'Médiéval', 'Renaissance', 'Patrimoine', 'Nationalité', 'Langue', 'Historique', 'Autre']
    },
    {
        name: 'Arts',
        icon: <FaMasksTheater />,
        tags: ['Théatre', 'Musicale', 'Ballet', 'Danse', 'Opéra', 'Bijoux', 'Orchestre', 'Artisanat', 'Beaux-Arts', 'Arts littéraires', 'Peinture', 'Comédie', 'Sculpture', 'Conception', 'Autre']
    },
    {
        name: 'Films et médias',
        icon: <BsCameraReels />,
        tags: ['TV', 'Film', 'Dessin animé', 'Jeux', 'Bandes déssinés', 'Adulte', 'Comédie', 'Autre'],
    },
    {
        name: 'Sport et remise en forme',
        icon: <FaRunning />,
        tags: ['Course', 'Marche','Vélo', 'Vélo de montagne', 'Obstacles', 'Basket-ball', 'Football', 'Base-ball', 'Golf', 'Volley-ball', 'Tennis', 'Natation et sports nautiques', 'Hockey', 'Sports mécaniques', 'Combats et arts martiaux', 'Sports de neige', 'Rugby', 'Yoga', 'Exercice', 'Balle-molle', 'Lutte', 'Lacrosse', 'Acclamation', 'Camps', 'Musculation', 'Piste de course', 'Autre'],
    },
    {
        name: 'Santé',
        icon: <FaHeartPulse />,
        tags: ['Santé personnelle', 'Santé mentale', 'Médical', 'Spa', 'Yoga', 'Autre'],
    },
    {
        name: 'Science et technologies',
        icon: <HiMiniCog />,
        tags: ['Biotech', 'High Tech', 'Mobile', 'Social Media', 'Robotics', 'Autre'],
    },
    {
        name: 'Voyages et plein air',
        icon: <IoAirplaneOutline />,
        tags: ['Randonnée', 'Rafting', 'Kayak', 'Canoê', 'Escalade', 'Voyage', 'Autre'],
    },
    {
        name: 'Charité et causes',
        icon: <FaHeartPulse />,
        tags: ['Bien-être animal', 'Environnement', 'Soins de santé', 'Droits humains', 'Aide internationale', 'pauvreté', 'Secours aux sinistrés', 'Éducation', 'Autre'],
    },
    {
        name: 'Spiritualité',
        icon: <PiHandsPrayingFill />,
        tags: ['Christianisme', 'Judaïsme', 'Islam', 'Mormonisme', 'Athéisme', 'Bouddhisme', 'Sikhisme', 'Réligion orientale', 'Mysticisme et occultisme', 'Agnosticisme', 'Non affilié', 'Hindouïsme', 'Réligions populaires', 'Shintoïsme', 'Autre' ],
    },
    {
        name: 'Famille et éducation',
        icon: <MdOutlineFamilyRestroom />,
        tags: ['Éducation'],
    },
    {
        name: 'Famille et éducation',
        icon: <HiBuildingOffice />,
        tags: ['Parti politique', 'Autre fête', 'Impartial', 'Gouvernement féderal', 'Gouvernement de l\'état', 'Gouvernement du comté/municipalité', 'Militaire', 'Les affaires internationnales', 'La sécurité nationale', 'Autre'],
    },
    {
        name: 'Gouvernement',
        icon: <MdOutlineFamilyRestroom />,
        tags: ['Éducation', 'Anciens élèves', 'Parentalité', 'Bébé', 'Réunion', 'Enfants et jeunes', 'Association des parents d\'élèves', 'Personne àgée', 'Autre'],
    },
    {
        name: 'Mode',
        icon: <PiCoatHanger />,
        tags: ['Mode', 'Accessoires', 'Mariage', 'Beauté', 'Autre'],
    },
    {
        name: 'Maison et style de vie',
        icon: <GiGreenhouse />,
        tags: ['Rencontre', 'Animaux de compagnie', 'Maison & jardin', 'Autre'],
    },
    {
        name: 'Auto, bateau et avion',
        icon: <FaCar />,
        tags: ['Auto', 'Moto/VTT', 'Bateau', 'Avion', 'Autre'],
    },
    {
        name: 'Loisirs',
        icon: <FaStopwatch />,
        tags: ['Animé/Bandes déssinés', 'Jeux', 'Bricolage', 'Photographie', 'Tricotage', 'Livres', 'Adultes', 'Dessin Peinture', 'Autre'],
    },
    {
        name: 'Activités scolaires',
        icon: <FaBus />,
        tags: ['Dîner', 'Levée des fonds', 'Tombola', 'Garderie aprés l\'école', 'Parking', 'Orateur public', 'Autre'],
    },
]