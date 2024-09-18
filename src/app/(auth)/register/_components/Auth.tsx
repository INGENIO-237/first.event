"use client";
import React, { useState } from "react";
import { RegisterSchema } from "@/schema/AuthValidation";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import login from "/public/assets/images/auth-image2.png";
import logo from "/public/assets/logo.png";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import InputError from "@/app/_components/auth/InputError";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Checkbox from '@/app/_components/Checkbox';

type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export default function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [terms, setTerms] = useState<boolean>(false);
  const [error, setError] = useState<string[]>([]);

  const validatePassword = (password: string) => {
    const errors: string[] = [];
    if (password.length <= 6) {
      errors.push("Votre mot de passe doit comporter au moins 8 caractères.");
    }
    setError(errors);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPasswordConfirm = e.target.value;
    setPasswordConfirm(newPasswordConfirm);
  };
  const isButtonDisabled = () => {
    const isPasswordValid = password.length >= 6;
    const isPasswordMatch = password === passwordConfirm;
    return !isPasswordValid || !isPasswordMatch || !terms;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });
  const onSubmit: SubmitHandler<RegisterSchemaType> = (data) =>
    console.log(data);
  return (
    <div className="w-screen h-[110vh] flex justify-items-center items-center">
      <div className="w-full lg:w-1/2 p-4 lg:p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <Link href={"/"} className="flex justify-start items-center">
            <Image
              src={logo}
              alt="FirstEvent Logo"
              width={150}
              height={37.5}
              className="mb-6 w-60"
              priority
            />
          </Link>

          <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-indigo-900">
            Créer un compte
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="email"
                key="email"
                id="email"
                placeholder="Adresse email"
                {...register("email")}
                className={cn(
                  errors.email
                    ? "focus:border-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition duration-300"
                    : "focus:border-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition duration-300 hover:border-gray-300",
                  "w-full p-2 border rounded focus:outline-none text-[#4F4B4B] placeholder:text-[#9F9D9D]"
                )}
              />
              {errors.email && <InputError message={errors.email.message} />}
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="text"
                key="name"
                placeholder="Nom"
                {...register("name")}
                className={cn(
                  errors.name
                    ? "focus:border-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition duration-300"
                    : "focus:border-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition duration-300 hover:border-gray-300",
                  "w-full sm:w-1/2 p-2 border rounded focus:outline-none text-[#4F4B4B] placeholder:text-[#9F9D9D]"
                )}
              />
              <input
                type="text"
                key="firstname"
                id="firstname"
                placeholder="Prénom"
                {...register("firstname")}
                className={cn(
                  errors.firstname
                    ? "focus:border-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition duration-300"
                    : "focus:border-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition duration-300 hover:border-gray-300",
                  "w-full sm:w-1/2 p-2 border rounded focus:outline-none text-[#4F4B4B] placeholder:text-[#9F9D9D]"
                )}
              />
            </div>
            {errors.name && <InputError message={errors.name.message} />}
            {errors.firstname && (
              <InputError message={errors.firstname.message} />
            )}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mot de passe"
                  {...register("password")}
                  value={password}
                  onChange={handlePasswordChange}
                  className={cn(
                    errors.password
                      ? "focus:border-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition duration-300"
                      : "focus:border-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition duration-300 hover:border-gray-300",
                    "w-full p-2 border rounded focus:outline-none pe-10 text-[#4F4B4B] placeholder:text-[#9F9D9D]"
                  )}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer transition-all duration-300"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </span>
              </div>
              {errors.password && (
                <InputError message={errors.password.message} />
              )}

              {password && passwordConfirm && password !== passwordConfirm && (
                <InputError message="Les mots de passe ne correspondent pas." />
              )}
            </div>
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("passwordConfirm")}
                  placeholder="Confirmer le mot de passe"
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                  className={cn(
                    errors.passwordConfirm
                      ? "focus:border-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition duration-300"
                      : "focus:border-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition duration-300 hover:border-gray-300",
                    "w-full p-2 border rounded focus:outline-none text-[#4F4B4B] placeholder:text-[#9F9D9D]"
                  )}
                />
              </div>
            </div>

            <div className="flex items-start mb-4">
              <div className="flex items-center h-5 mr-2">
                <Checkbox
                  id="terms"
                  size={4}
                  checked={terms}
                  onChange={() => setTerms(!terms)}
                  inputBorderColor={
                    errors.acceptedTerms
                      ? "focus:border-red-500 focus:ring-red-600"
                      : "focus:border-indigo-500 focus:ring-indigo-600"
                  }
                />
              </div>
              <label htmlFor="terms" className="text-sm ">
                J&apos;accepte les{" "}
                <Link
                  href={"#"}
                  className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                >
                  conditions d&apos;utilisation
                </Link>{" "}
                et les
                <Link
                  href={"#"}
                  className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                >
                  {" "}
                  directives de la communauté de FirstEvent
                </Link>{" "}
                et j&apos;ai lu la{" "}
                <Link
                  href={"#"}
                  className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                >
                  politique de confidentialité
                </Link>
                .
              </label>
            </div>
            <button
              type="submit"
              disabled={isButtonDisabled()}
              className={cn(
                isButtonDisabled()
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-orange-500 hover:bg-orange-600",
                "w-full text-white p-2 rounded transition duration-300"
              )}
            >
              Créer un compte
            </button>
          </form>

          <div className="mt-4 text-center bg-gray-300 p-2 rounded cursor-pointer hover:bg-gray-400 transition-colors duration-300">
            <Link
              href={"/login"}
              className="text-[#4F4B4F] hover:text-white font-medium  transition-colors  duration-300"
            >
              Se connecter
            </Link>
          </div>
          <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
            Ou
          </div>

          <div className="flex flex-col justify-center items-center gap-4 ">
            <button
              name="oAuthGoogle"
              id="oAuthGoogle"
              className="w-full py-2 border bg-gray-50 hover:bg-gray-100 transition-colors duration-300 rounded px-3 text-[#4F4B4B] flex flex-row justify-center items-center gap-4 font-medium"
            >
              <FcGoogle className="h-7 w-6" />
              Continuer avec Google
            </button>
            <span className="block text-[#9F9D9E]">
              Autres Méthodes de connexion
            </span>
            <div className="flex flex-row gap-4">
              <button>
                <FaFacebook className="text-[#314698] h-7 w-6" />
              </button>
              <button>
                <FaApple className=" text-[#484848] rounded-md h-7 w-6 " />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image section - hidden on mobile */}
      <div className="bg-white w-1/2 h-full hidden lg:flex">
        <Image
          src={login.src}
          alt="first event"
          className="w-full flex object-cover justify-center h-auto"
          width={800}
          height={0}
          priority
        />
      </div>
    </div>
  );
}
