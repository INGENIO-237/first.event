"use client";
import InputError from "@/components/custom/auth/InputError";
import Checkbox from "@/components/custom/Checkbox";
import CitySelectInput from "@/components/custom/CitySelect";
import StateSelectInput from "@/components/custom/StateSelect";
import { cn } from "@/lib/utils";
import {
  AdressValidationSchema,
  GeneralInfoSchema,
} from "@/schema/SettingsValidation";
import { parseAddress, ParseGeneralData } from "@/utils/parser";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiUser } from "react-icons/fi";
import { toast } from "sonner";
import * as z from "zod";
import Input from "../../../components/custom/Input";
import CountrySelectInput from "@/components/custom/CountrySelect";

type GeneralInfo = z.infer<typeof GeneralInfoSchema>;
type AddressType = z.infer<typeof AdressValidationSchema>;

const Profile = () => {
  const [date, setDate] = useState<string>("26/10/2024");
  const [image, setImage] = useState<string | null>(null);
  const [billAsHome, setBillAsHome] = useState<boolean>(true);
  const [shippAsHome, setShippAsHome] = useState<boolean>(true);
  const [countryid, setcountryid] = useState<number>(0);
  const [stateid, setStateId] = useState<number>(0);
  const [shippingcountryid, setshippingcountryid] = useState<number>(0);
  const [billingcountryid, setbillingcountryid] = useState<number>(0);
  const [shippingstateid, setshippingstateid] = useState<number>(0);
  const [billingstateid, setbillingstateid] = useState<number>(0);
  const imageRef = useRef<HTMLInputElement>(null);
  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  // console.log('billAsHome', billAsHome, ' shippAsHome', shippAsHome)

  const handleImaeUploadClick = () => {
    imageRef.current?.click();
  };

  const {
    register: registerInfo,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<GeneralInfo>({
    resolver: zodResolver(GeneralInfoSchema),
  });

  const {
    register: registerAddress,
    handleSubmit: handleAddressSubmit,
    formState: { errors: address_errors },
    setValue: setAddressValue,
  } = useForm<AddressType>({
    resolver: zodResolver(AdressValidationSchema),
    defaultValues: {
      shippingAsHome: true,
      billingAsHome: true,
      address: "",
      city: "",
      province: "",
      country: "",
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event.target.files as FileList)[0];
    if (file && ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      const imageUrl = URL.createObjectURL(file);
      console.log(URL.createObjectURL(file));
      setImage(imageUrl);
      imageRef.current?.files
        ? setValue("image", imageRef.current?.files[0])
        : "";
    }
  };

  const submitGeneralInfoForm = (data: GeneralInfo) => {
    const payload = ParseGeneralData(data);
    // TODO : send the data to the API
    toast.success("OK");
  };

  const submitAddressForm = (data: AddressType) => {
    // parse the data
    toast.success("adresses OK");
    const payload = parseAddress(data);
    // TODO : send the data to the API
    console.log(payload);
  };

  const unsetBillingInfo = () => {
    setAddressValue('billing_address', '');
    setAddressValue('billing_country', '');
    setAddressValue('billing_province', '');
    setAddressValue('billing_city', '');
    setAddressValue('billing_postal_code', '');
    setAddressValue('billingAsHome', !billAsHome);
  }

  const unsetShippingInfo = () => {
    setAddressValue('shipping_address', '');
    setAddressValue('shipping_country', '');
    setAddressValue('shipping_province', '');
    setAddressValue('shipping_city', '');
    setAddressValue('shipping_postal_code', '');
    setAddressValue('shippingAsHome', !shippAsHome);
  }

  return (
    <div className="flex flex-col  min-h-screen  md:px-20 px-5">
      <div className="w-full">
        <div className="flex grow justify-around flex-col w-full">
          <span className="py-3 text-sm md:place-items-end text-center md:text-end">
            Compte créé le {date}
          </span>
          <h1 className="md:text-3xl text-2xl text-center md:text-start font-bold text-first_violet">
            Informations Personnelles
          </h1>
        </div>
        <div className="flex flex-col items-center  md:items-start space-y-4">
          <form
            className="w-full "
            onSubmit={handleSubmit((data) => submitGeneralInfoForm(data))}
            encType="multipart/form-data"
          >
            {/* Photo de profil */}
            <div className="flex flex-col items-center  w-full md:items-start gap-4 py-5 ">
              <h2 className="md:text-2xl text-xl text-start font-semibold text-first_violet">
                Photo de profil
              </h2>
              <div
                className={cn(
                  "w-32 md:w-40 h-32 md:h-40 flex flex-col items-center justify-center hover:cursor-pointer border rounded-full",
                  image ? "bg-white" : " bg-first_gray"
                )}
                onClick={() => handleImaeUploadClick()}
              >
                {image ? (
                  <Image
                    src={image}
                    alt="Profile"
                    priority
                    width={160} // Spécifier la largeur de l"image
                    height={160} // Spécifier la hauteur de l"image
                    className="rounded-full object-cover w-32 md:w-40 h-32 md:h-40"
                  />
                ) : (
                  <>
                    <FiUser className="md:w-10 md:h-10 text-sm" />
                    <span className="text-center md:text-sm text-xs">
                      Ajouter ou modifier une photo de profil
                    </span>
                  </>
                )}
              </div>
              <input
                type="file"
                {...registerInfo("image")}
                accept="image/*"
                max={1}
                className="hidden"
                ref={imageRef}
                onChange={handleImageChange}
              />
              {errors.image && <InputError message={errors.image.message} />}
            </div>
            {/* Coordonnées */}
            <div className="flex flex-col items-center w-full md:w-1/2 md:items-start space-y-4 space-x-0 md:space-x-4 md:space-y-4">
              <h2 className="md:text-2xl text-xl text-start font-semibold text-first_violet">
                Coordonnées
              </h2>
              <div className="flex flex-col md:flex-row items-center gap-5 md:items-start w-full">
                <Input
                  type="text"
                  label="Prénom"
                  register={registerInfo("firstname")}
                  error={errors?.firstname?.message}
                />
                <Input
                  type="text"
                  label="Nom"
                  register={registerInfo("lastname")}
                  error={errors?.lastname?.message}
                />
              </div>
              {/* Tel */}
              <div className="flex flex-col md:flex-row items-center gap-5 md:items-start w-full">
                <Input
                  type="tel"
                  setPhoneState={(phone, data, formattedValue) => {
                    setValue("fix_phone_number", "+" + phone);
                  }}
                  register={registerInfo("fix_phone_number")}
                  error={errors?.fix_phone_number?.message}
                  label="Téléphone fixe"
                />
                <Input
                  type="tel"
                  setPhoneState={(phone, data, formattedValue) => {
                    setValue("mobile_phone_number", "+" + phone);
                  }}
                  register={registerInfo("mobile_phone_number")}
                  error={errors?.mobile_phone_number?.message}
                  label="Téléphone portable"
                />
              </div>
              <div className="flex flex-col  items-end w-full ">
                <div className="w-1/2 flex gap-5 flex-row">
                  <button
                    type="submit"
                    className="w-full p-2 border rounded text-white bg-first_orange"
                  >
                    Modifier
                  </button>
                </div>
              </div>
            </div>
          </form>
          <form
            className="w-full space-y-4"
            onSubmit={handleAddressSubmit((data) => submitAddressForm(data))}
          >
            {/* Domicile */}
            <div className="flex flex-col items-center w-full md:w-1/2 md:items-start space-y-4 space-x-0 md:space-x-4 md:space-y-4">
              <h2 className="md:text-2xl text-xl text-start font-semibold text-first_violet">
                Domicile
              </h2>
              <div className="flex flex-col md:flex-row items-center gap-5 md:items-start w-full">
                <Input
                  type="text"
                  label="Adresse"
                  register={registerAddress("address")}
                  error={address_errors?.address?.message}
                />
                <CountrySelectInput label="Pays"
                  onChange={(e: any) => {
                    setcountryid(e.id)
                    setAddressValue("country", e.name)
                  }}
                  register={registerAddress("country")}
                  error={address_errors?.country?.message}
                />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-5 md:items-start w-full">
                <StateSelectInput
                  countryid={countryid}
                  onChange={(e: any) => {
                    setStateId(e.id);
                    setAddressValue('province', e.name);
                  }}
                  label="Province"
                  error={address_errors?.province?.message}

                />
                <CitySelectInput
                  countryid={countryid}
                  stateid={stateid}
                  label="Ville"
                  onChange={(e: any) => {
                    setAddressValue('city', e.name);
                  }}
                  error={address_errors?.city?.message}
                />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-5 md:items-start w-full">
                <Input
                  type="text"
                  label="Code postal"
                  register={registerAddress("postal_code")}
                  error={address_errors?.postal_code?.message}
                />
              </div>
              <div></div>
            </div>
            {/* Adresse de facturation */}
            <div className="flex flex-col items-center w-full md:w-1/2 md:items-start space-y-4 space-x-0 md:space-x-4 md:space-y-4">
              <h2 className="md:text-2xl text-xl text-start font-semibold text-first_violet">
                Adresse de facturation
              </h2>
              <div>
                <Checkbox size={4} id='billing' checked={billAsHome} onChange={() => { setBillAsHome(!billAsHome); unsetBillingInfo() }} label={"Même que l'adresse du domicile "} primaryColor="" />
                {/* {console.log(billAsHome)} */}
                {address_errors?.billingAsHome && (
                  <InputError
                    message={address_errors?.billingAsHome?.message}
                  />
                )}
              </div>
              <AnimatePresence>
                {!billAsHome && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 1 }}
                      className="flex flex-col md:flex-row items-center gap-5 md:items-start w-full"
                    >
                      <Input
                        type="text"
                        label="Adresse"
                        register={registerAddress("billing_address")}
                        error={address_errors?.billing_address?.message}
                      />
                      <CountrySelectInput label="Pays"
                        onChange={(e: any) => {
                          setbillingcountryid(e.id)
                          setAddressValue("billing_country", e.name)
                        }}
                        register={registerAddress("billing_country")}
                        error={address_errors?.billing_country?.message}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.75 }}
                      className="flex flex-col md:flex-row items-center gap-5 md:items-start w-full"
                    >
                      <StateSelectInput
                        countryid={billingcountryid}
                        onChange={(e: any) => {
                          setbillingstateid(e.id);
                          setAddressValue('billing_province', e.name);
                        }}
                        label="Province"
                        error={address_errors?.billing_province?.message}

                      />
                      <CitySelectInput
                        countryid={billingcountryid}
                        stateid={billingstateid}
                        label="Ville"
                        onChange={(e: any) => {
                          setAddressValue('billing_city', e.name);
                        }}
                        error={address_errors?.billing_city?.message}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col md:flex-row items-center gap-5 md:items-start w-full"
                    >
                      <Input
                        type="text"
                        label="Code postal"
                        register={registerAddress("billing_postal_code")}
                        error={address_errors?.billing_postal_code?.message}
                      />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            {/* Adresse de livraison */}
            <div className="flex flex-col items-center w-full md:w-1/2 md:items-start space-y-4 space-x-0 md:space-x-4 md:space-y-4">
              <h2 className="md:text-2xl text-xl text-start font-semibold text-first_violet">
                Adresse de livraison
              </h2>
              <div>
                <Checkbox size={4} id='shipping' checked={shippAsHome} onChange={() => { setShippAsHome(!shippAsHome); unsetShippingInfo() }} label={"Même que l'adresse du domicile "} primaryColor="" />
                {address_errors?.shippingAsHome && (<InputError message={address_errors?.shippingAsHome?.message} />)}
              </div>
              <AnimatePresence>
                {!shippAsHome && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 1 }}
                      className="flex flex-col md:flex-row items-center gap-5 md:items-start w-full"
                    >
                      <Input
                        type="text"
                        label="Adresse"
                        register={registerAddress("shipping_address")}
                        error={address_errors?.shipping_address?.message}
                      />
                      <CountrySelectInput label="Pays"
                        onChange={(e: any) => {
                          setshippingcountryid(e.id)
                          setAddressValue("shipping_country", e.name)
                        }}
                        register={registerAddress("shipping_country")}
                        error={address_errors?.shipping_country?.message}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.75 }}
                      className="flex flex-col md:flex-row items-center gap-5 md:items-start w-full"
                    >
                      <StateSelectInput
                        countryid={shippingcountryid}
                        onChange={(e: any) => {
                          setStateId(e.id);
                          setAddressValue('shipping_province', e.name);
                        }}
                        label="Province"
                        error={address_errors?.shipping_province?.message}

                      />
                      <CitySelectInput
                        countryid={shippingcountryid}
                        stateid={stateid}
                        label="Ville"
                        onChange={(e: any) => {
                          setAddressValue('shipping_city', e.name);
                        }}
                        error={address_errors?.shipping_city?.message}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col md:flex-row items-center gap-5 md:items-start w-full"
                    >
                      <Input
                        type="text"
                        label="Code postal"
                        register={registerAddress("shipping_postal_code")}
                        error={address_errors?.shipping_postal_code?.message}
                      />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
              <div className="flex flex-col items-end w-full">
                <div className="w-1/2 flex gap-5 flex-row">
                  <button
                    type="submit"
                    className="w-full p-2 border rounded text-white bg-first_orange"
                  >
                    Modifier
                  </button>
                </div>
              </div>
              <div></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
