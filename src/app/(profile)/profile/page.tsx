"use client"
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState } from "react"
import { FiUser } from "react-icons/fi"
import Input from "../_components/Input";
import Select from "../_components/Select";

const Profile = () => {
  const [date, setDate] = useState<string>("26/10/2024");
  // const [isCropImage, setIsCropImage] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const handleImaeUploadClick = () => {
    imageRef.current?.click();
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event.target.files as FileList)[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log(URL.createObjectURL(file));
      setImage(imageUrl);
    }
  }
  return (
    <div className="grow flex flex-col bg-zic-600 min-h-screen md:px-20 px-5">
      <div className="">
        <div className="flex justify-around flex-col md:w-11/12 ">
          <span className="py-3 text-sm md:place-items-center text-center md:text-end">Compte créé sur FirstEvent depuis le {date}</span>
          <h1 className="md:text-3xl text-2xl text-center md:text-start font-bold text-first_violet">Informations Personnels</h1>
        </div>
        <div>
          <div className="flex flex-col items-center md:items-start gap-4 py-5 " onClick={() => handleImaeUploadClick()}>
            <h2 className="md:text-2xl text-xl text-start font-semibold text-first_violet">Photo de profil</h2>
            <div className={cn("w-32 md:w-40 h-32 md:h-40 flex flex-col items-center justify-center hover:cursor-pointer border rounded-full", image ? "bg-white" : " bg-first_gray")}>
              {image ? (
                <Image src={image} alt="Profile" width={160} // Spécifier la largeur de l"image
                  height={160} // Spécifier la hauteur de l"image
                  className="rounded-full object-cover w-32 md:w-40 h-32 md:h-40" />
              ) : (
                <>
                  <FiUser className="md:w-10 md:h-10 text-sm" />
                  <span className="text-center md:text-sm text-xs">Ajouter ou modifier une photo de profil</span>
                </>
              )}
            </div>
            <input type="file" className="hidden" ref={imageRef} onChange={handleImageChange} />
          </div>
          <div className="flex flex-col items-center md:items-start space-y-4 space-x-0 md:space-x-4 md:space-y-4">
            <h2 className="md:text-2xl text-xl text-start font-semibold text-first_violet">Coordonnées</h2>
            <div>
              <div className="flex flex-col md:flex-row items-center gap-5 md:items-start w-full">
                <Select label='Civilité' options={[{ value: 'Monsieur', text: 'Monsieur' }, { value: 'Madame', text: 'Madame' }, { value: 'Mademoiselle', text: 'Mademoiselle' }]} placeholder="Civilité" onChange={(e) => { }} />
                <Input type="text" placeholder="Prénom" label="Prénom" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile