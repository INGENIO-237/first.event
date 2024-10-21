import Card from "@/components/custom/config-account/Card";
import Image, { StaticImageData } from "next/image";
import image2 from "/public/assets/images/auth-event.png";
import image3 from "/public/assets/images/auth-planification.png";
import hand from "/public/assets/images/hand.png";

interface CardType {
  image: StaticImageData;
  text: string;
  buttonText: string;
  link: string;
}

const cards = [
  {
    image: image2,
    text: "Organiser des événements",
    buttonText: "Planifiez votre meilleur événement",
    link: "/become/organizer",
  },
  {
    image: image3,
    text: "Communicateurs événementiels",
    buttonText: "Planifiez votre meilleur événement",
    link: "/become/influencer",
  },
];

const Onboarding = () => {
  return (
    <div className="m-auto pt-10 flex flex-col justify-center items-center">
      <div className="">
        <Image src={hand} priority alt="hand" width={90} height={30} />
      </div>
      <div className="p-4 md:p-8 flex items-center text-center justify-start flex-col">
        <h1 className="text-3xl font md:text-6xl font-bold text-first_violet">
          Bienvenue sur FirstEvent!
        </h1>
        <span className="font-medium text-first_violet">
          Nous sommes heureux que vous soyez ici! En quoi pouvons-nous vous
          aider en premier?
        </span>
      </div>
      <div className="flex flex-col md:flex-row justify-around  md:flex-wrap pb-5">
        {cards.map((card: CardType, index: number) => (
          <Card
            key={index}
            image={card.image}
            illustrationText={card.text}
            textButton={card.buttonText}
            link={card.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Onboarding;
