import {
  Store,
  Calendar,
  Users,
  PlusCircle,
  Heart,
  Ticket,
  ShoppingCart,
  House,
  CalendarClock,
  Megaphone,
  DollarSign,
  LucideProps,
  LucideIcon,
} from "lucide-react";
import React, { ForwardRefExoticComponent } from "react";
import { IconType } from "react-icons";

export interface linksType {
  title: string;
  icon: IconType| LucideIcon;
  link: string;
  accessibleBy?: string;
  subLinks?: string[];
}

const ticketNumber = 1;

export const dropdownLinks = [
  { title: `Tickets(${ticketNumber})`, link: "#" },
  { title: "Favoris", link: "#" },
  { title: "Centre d'intérêts", link: "#" },
  { title: "Paramètres du compte", link: "/profile" },
  { title: "Historique", link: "#" },
  { title: "Se déconnecter", link: "#" },
];
export const links: linksType[] = [
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

export const influencersDashboardLinks: linksType[] = [
  { title: "Acceuil", icon: House, link: "/dashboard-influencer",   },
  { title: "Mes codes promos", icon: CalendarClock, link: "/dashboard-influencer/promo-codes", },
  // { title: "Marketing", icon: Megaphone, link: "/dashboard/marketing", },
  { title: "Finances", icon: DollarSign, link: "/dashboard-influencer/finance", },
  // { title: "Finances", icon: DollarSign, link: "/dashboard/finance", },
];



export const organizerDashboardLinks: linksType[] = [];