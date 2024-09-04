import Image, { StaticImageData } from "next/image";
import hand from '/public/assets/images/hand.png';
import Card from "@/app/components/config-account/Card";
import image1 from '/public/assets/images/auth-experience.png'
import image2 from "/public/assets/images/auth-event.png";
import image3 from "/public/assets/images/auth-planification.png";

interface CardType {
  image: StaticImageData,
  text: string,
  buttonText: string,
  link: string,
}

const cards = [
  {
    image: image2,
    text: "Organiser des événements",
    buttonText: "Planifiez votre meilleur événement", 
    link: '/setup-account'
  },
  {
    image: image3,
    text: "Communicateurs événementiels",
    buttonText: "Planifiez votre meilleur événement", 
    link: '/setup-account'
  }
]

const ConfigPage = () => {
  return (
    <div className="mx-auto p-4 flex flex-col justify-center   items-center">
      <div className="">
        <Image src={hand} alt="hand" width={90} height={30} />
      </div>
      <div className="p-4 md:p-8 flex items-center text-center justify-start flex-col">
        <h1 className="text-3xl font md:text-6xl font-bold text-first_violet">
          Bienvenue sur FirstEvent!
        </h1>
        <span className="font-medium text-first_violet">Nous sommes heureux que vous soyez ici! En quoi pouvons-nous vous aider en premier?</span>
      </div>
      <div className="flex flex-col md:flex-row justify-around  md:flex-wrap pb-5">
        {cards.map((card: CardType, index:number) => (
          <Card key={index} image={card.image} illustrationText={card.text} textButton={card.buttonText} link={card.link} />
        ))}
      </div>
    </div>
  )
}

export default ConfigPage;