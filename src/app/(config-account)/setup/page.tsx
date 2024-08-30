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
}

const cards = [
  {
    image: image1,
    text: "Trouver une expérience",
    buttonText: "Dites nous ce que vous aimez", 
  },
  {
    image: image2,
    text: "Organiser des événements",
    buttonText: "Planifiez votre meilleur événement", 
  },
  {
    image: image3,
    text: "Communicateurs événementiels",
    buttonText: "Planifiez votre meilleur événement", 
  }
]

const ConfigPage = () => {
  return (
    <div className="min-h-screen mx-auto p-4 flex flex-col items-center">
      <div className="  ">
        <Image src={hand} alt="hand" width={90} height={30} />
      </div>
      <div className="p-4 md:p-8 flex items-center text-center justify-start flex-col">
        <h1 className="text-3xl font md:text-6xl font-bold text-first_violet">
          Bienvenue sur FirstEvent!
        </h1>
        <span className="font-medium text-first_violet">Nous sommes heureux que vous soyez ici! En quoi pouvons-nous vous aider en premier?</span>
      </div>
      <div className="flex flex-col md:flex-row justify-around md:w-2/3 md:flex-wrap pb-5">
        {cards.map((card: CardType, index:number) => (
          <Card key={index} image={card.image} illustrationText={card.text} textButton={card.buttonText} />
        ))}
        {/* <Card image={image1} illustrationText="Trouver une expérience" textButton="Dites nous ce que vous aimez" />
        <Card image={image2} illustrationText="Organiser des événements" textButton="Planifiez votre meilleur événement" />
        <Card image={image3} illustrationText="Communicateurs événementiels" textButton="Planifiez votre meilleur événement" /> */}
      </div>
    </div>
  )
}

export default ConfigPage;