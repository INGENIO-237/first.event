import {
  Search,
  MapPin,
  ChevronDown,
  Store,
  Calendar,
  Users,
  PlusCircle,
  Heart,
  Ticket,
  ShoppingCart,
} from "lucide-react";

const ticketNumber = 1;

export const dropdownLinks = [
  { title: `Tickets(${ticketNumber})`, link: "#" },
  { title: "Favoris", link: "#" },
  { title: "Centre d'intérêts", link: "#" },
  { title: "Paramètres du compte", link: "/profile" },
  { title: "Historique", link: "#" },
  { title: "Se déconnecter", link: "#" },
];
export const links = [
  { title: "Boutique", icon: Store, link: "#", accessibleBy: "user" },
  {
    title: "Organisateur",
    icon: Calendar,
    link: "/become/organizer",
    accessibleBy: "user only",
  },
  {
    title: "Communicateur",
    icon: Users,
    link: "#",
    accessibleBy: "user only",
  },
  { title: "Créer", icon: PlusCircle, link: "#", accessibleBy: "organizer" },
  { title: "Favoris", icon: Heart, link: "#", accessibleBy: "user" },
  { title: "Tickets", icon: Ticket, link: "#", accessibleBy: "influencer" },
  { title: "Panier", icon: ShoppingCart, link: "#", accessibleBy: "user" },
];
