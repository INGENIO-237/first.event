interface Coordinates {
  lat: number;
  lng: number;
}

export interface topTendanceInterface {
  id: number;
  title: string;
  description: string;
  category: string;
  day: string;
  date: string;
  hour: string;
  price: string | number;
  ort: string;
  image: string;
  coordinates: Coordinates;
  tags: string[];
  capacity: number;
  organizer: string;
  website: string;
}
export type HandleLike = (id: number) => void;

const topTendances:topTendanceInterface[] = [
  {
    id: 1,
    title: "Festival de Jazz de Montréal",
    description: "Le plus grand festival de jazz au monde",
    category: "Musique",
    day: "Samedi",
    date: "2024-07-15",
    hour: "19h00",
    price: "Gratuit",
    ort: "Quartier des spectacles, Montréal",
    image: "/assets/images/auth-event.png",
    coordinates: {
      lat: 45.5089,
      lng: -73.5617
    },
    tags: ["jazz", "musique", "festival", "extérieur"],
    capacity: 10000,
    organizer: "L'Équipe Spectra",
    website: "https://www.montrealjazzfest.com/"
  },
  {
    id: 2,
    title: "Exposition Van Gogh",
    description: "Immersion dans l'univers de Van Gogh",
    category: "Art",
    day: "Dimanche",
    date: "2024-08-20",
    hour: "10h00",
    price: 25,
    ort: "Arsenal art contemporain, Montréal",
    image: "/assets/images/hand.png",
    coordinates: {
      lat: 45.4785,
      lng: -73.5532
    },
    tags: ["art", "exposition", "peinture", "immersif"],
    capacity: 500,
    organizer: "Normal Studio",
    website: "https://vangoghexpo.com/montreal/"
  },
  {
    id: 3,
    title: "Marathon de Montréal",
    description: "Course annuelle à travers la ville",
    category: "Sport",
    day: "Dimanche",
    date: "2024-09-22",
    hour: "08h00",
    price: 80,
    ort: "Parc La Fontaine, Montréal",
    image: "/assets/images/auth-event.png",
    coordinates: {
      lat: 45.5225,
      lng: -73.5696
    },
    tags: ["course", "marathon", "sport", "extérieur"],
    capacity: 5000,
    organizer: "Événements GPCQM",
    website: "https://mtlmarathon.com/"
  },
  {
    id: 4,
    title: "Festival du Film de Montréal",
    description: "Célébration du cinéma international",
    category: "Cinéma",
    day: "Lundi",
    date: "2024-08-26",
    hour: "18h30",
    price: 15,
    ort: "Cinéma Impérial, Montréal",
    image: "/assets/images/auth-event.png",
    coordinates: {
      lat: 45.5076,
      lng: -73.5694
    },
    tags: ["cinéma", "film", "festival", "international"],
    capacity: 800,
    organizer: "Festival du Nouveau Cinéma",
    website: "https://nouveaucinema.ca/"
  },
  {
    id: 5,
    title: "Salon de l'Auto de Montréal",
    description: "Exposition des derniers modèles automobiles",
    category: "Automobile",
    day: "Vendredi",
    date: "2025-01-17",
    hour: "10h00",
    price: 20,
    ort: "Palais des congrès de Montréal",
    image: "/assets/images/auth-event.png",
    coordinates: {
      lat: 45.5032,
      lng: -73.5611
    },
    tags: ["auto", "exposition", "technologie"],
    capacity: 3000,
    organizer: "Corporation des concessionnaires d'automobiles de Montréal",
    website: "https://salonautomontreal.com/"
  },
  {
    id: 6,
    title: "Piknic Électronik",
    description: "Festival de musique électronique en plein air",
    category: "Musique",
    day: "Dimanche",
    date: "2024-05-19",
    hour: "14h00",
    price: 30,
    ort: "Parc Jean-Drapeau, Montréal",
    image: "/assets/images/auth-event.png",
    coordinates: {
      lat: 45.5132,
      lng: -73.5314
    },
    tags: ["musique électronique", "festival", "extérieur", "danse"],
    capacity: 7500,
    organizer: "Piknic Électronik",
    website: "https://piknicelectronik.com/montreal/"
  },
  {
    id: 7,
    title: "Marché de Noël de Montréal",
    description: "Marché festif avec produits locaux et artisanaux",
    category: "Marché",
    day: "Samedi",
    date: "2024-12-07",
    hour: "11h00",
    price: "Gratuit",
    ort: "Place Jacques-Cartier, Vieux-Montréal",
    image: "/assets/images/christmas-market.jpg",
    coordinates: {
      lat: 45.5075,
      lng: -73.5526
    },
    tags: ["noël", "marché", "artisanat", "gastronomie"],
    capacity: 2000,
    organizer: "Ville de Montréal",
    website: "https://www.mtl.org/fr/quoi-faire/festivals-et-evenements/marche-de-noel-montreal"
  },
  {
    id: 8,
    title: "Osheaga",
    description: "Festival de musique et arts",
    category: "Musique",
    day: "Vendredi",
    date: "2024-08-02",
    hour: "13h00",
    price: 125,
    ort: "Parc Jean-Drapeau, Montréal",
    image: "/assets/images/osheaga.jpg",
    coordinates: {
      lat: 45.5136,
      lng: -73.5319
    },
    tags: ["musique", "festival", "arts", "extérieur"],
    capacity: 45000,
    organizer: "evenko",
    website: "https://www.osheaga.com/"
  }
];

export default topTendances;