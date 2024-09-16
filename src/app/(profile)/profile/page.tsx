"use client"
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState } from "react"
import { FiUser } from "react-icons/fi"
import Input from "../_components/Input";
import Select from "../_components/Select";
import * as z from 'zod';
import { CoordonatesSchema } from "@/schema/SettingsValidation";
import Checkbox from "@/app/components/Checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type CoordonateSchema = z.infer<typeof CoordonatesSchema>

const Profile = () => {
  const [date, setDate] = useState<string>("26/10/2024");
  const [image, setImage] = useState<string | null>(null);
  const [phone, setPhone] = useState<string>("");
  const [billAsHome, setBillAsHome] = useState<boolean>(true);
  const [shippAsHome, setShippAsHome] = useState<boolean>(true);
  const imageRef = useRef<HTMLInputElement>(null);
  const handleImaeUploadClick = () => {
    imageRef.current?.click();
  }
  const { register, handleSubmit, formState: { errors } } = useForm<CoordonateSchema>({
    resolver: zodResolver(CoordonatesSchema),
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event.target.files as FileList)[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log(URL.createObjectURL(file));
      setImage(imageUrl);
    }
  }
  return (
    <div className="flex flex-col  min-h-screen  md:px-20 px-5">
      <div className="w-full">
        <div className="flex grow justify-around flex-col w-full">
          <span className="py-3 text-sm md:place-items-end text-center md:text-end">Compte créé  le {date}</span>
          <h1 className="md:text-3xl text-2xl text-center md:text-start font-bold text-first_violet">Informations Personnels</h1>
        </div>
        <div className="flex flex-col items-center  md:items-start space-y-4">
          <form className="w-full ">
            {/* Photo de profil */}
            <div className="flex flex-col items-center  w-full md:items-start gap-4 py-5 " onClick={() => handleImaeUploadClick()}>
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
              <input type="file" {...register('image')} className="hidden" ref={imageRef}  onChange={handleImageChange} />
            </div>
            {/* Coordonnées */}
            <div className="flex flex-col items-center w-full md:w-1/2 md:items-start space-y-4 space-x-0 md:space-x-4 md:space-y-4">
              <h2 className="md:text-2xl text-xl text-start font-semibold text-first_violet">Coordonnées</h2>
              <div className="flex flex-col md:flex-row items-center gap-5 md:items-start w-full">
                {/* <Select label='Civilité' options={[{ value: 'Monsieur', text: 'Monsieur' }, { value: 'Madame', text: 'Madame' }, { value: 'Mademoiselle', text: 'Mademoiselle' }]} placeholder="Choisissez une civilité" onChange={(e) => { }} /> */}
                <Input type="text" placeholder="" label="Prénom" value="" />
                <Input type="text" placeholder="" label="Nom" />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-5 md:items-start w-full">
                <Input type="tel" placeholder="" value={phone} setState={setPhone} label="Numéro de téléphone" />
                <Input type="tel" placeholder="" label="Téléphone portable" />
              </div>
              <div className="flex flex-col  items-end w-full ">
                <div className="w-1/2 flex gap-5 flex-row">
                  <button type="submit" className="w-full p-2 border rounded text-white bg-first_orange">
                    Modifier
                  </button>
                </div>
              </div>
            </div>
          </form>
          <form className='w-full space-y-4'>
            {/* Domicile */}
            <div className="flex flex-col items-center w-full md:w-1/2 md:items-start space-y-4 space-x-0 md:space-x-4 md:space-y-4">
              <h2 className="md:text-2xl text-xl text-start font-semibold text-first_violet">Domicile</h2>
              <div className="flex flex-col md:flex-row items-center gap-5 md:items-start w-full">
                <Input type="text" placeholder="" label="Adresse" />
                <Input type="text" placeholder="" label="Pays" />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-5 md:items-start w-full">
                <Input type="text" placeholder="" label="Province" />
                <Input type="text" placeholder="" label="Ville" />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-5 md:items-start w-full">
                <Input type="text" placeholder="" label="Code postal" />
              </div>
              <div>
              </div>
            </div>
            {/* Adresse de facturation */}
            <div className="flex flex-col items-center w-full md:w-1/2 md:items-start space-y-4 space-x-0 md:space-x-4 md:space-y-4">
              <h2 className="md:text-2xl text-xl text-start font-semibold text-first_violet">Adresse de facturation</h2>
              <div>
                <Checkbox size={4} id='billing' checked={billAsHome} onChange={() => { setBillAsHome(!billAsHome) }} label={"Même que l'adresse du domicile "} primaryColor="" />
              </div>
              {!billAsHome && (
                <>
                  <div className="flex flex-col md:flex-row items-center gap-5 md:items-start w-full">
                    <Input type="text" placeholder="" label="Adresse" />
                    <Input type="text" placeholder="" label="Pays" />
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-5 md:items-start w-full">
                    <Input type="text" placeholder="" label="Province" />
                    <Input type="text" placeholder="" label="Ville" />
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-5 md:items-start w-full">
                    <Input type="text" placeholder="" label="Code postal" />
                  </div>
                </>
              )}
            </div>
            {/* Adresse de livraison */}
            <div className="flex flex-col items-center w-full md:w-1/2 md:items-start space-y-4 space-x-0 md:space-x-4 md:space-y-4">
              <h2 className="md:text-2xl text-xl text-start font-semibold text-first_violet">Adresse de livraison</h2>
              <div>
                <Checkbox size={4} id='shipping' checked={shippAsHome} onChange={() => { setShippAsHome(!shippAsHome) }} label={"Même que l'adresse du domicile "} primaryColor="" />
              </div>
              {!shippAsHome && (
                <>
                  <div className="flex flex-col md:flex-row items-center gap-5 md:items-start w-full">
                    <Input type="text" placeholder="" label="Adresse" />
                    <Input type="text" placeholder="" label="Pays" />
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-5 md:items-start w-full">
                    <Input type="text" placeholder="" label="Province" />
                    <Input type="text" placeholder="" label="Ville" />
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-5 md:items-start w-full">
                    <Input type="text" placeholder="" label="Code postal" />
                  </div>
                </>
              )}
              <div className="flex flex-col items-end w-full">
                <div className="w-1/2 flex gap-5 flex-row">
                  <button type="submit" className="w-full p-2 border rounded text-white bg-first_orange">
                    Modifier
                  </button>
                </div>
              </div>
              <div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile