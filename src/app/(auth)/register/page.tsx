'use client'
import React, {useState} from 'react';
import Image from 'next/image';
import login from '/public/assets/images/auth-image2.png';
import logo from '/public/assets/logo.png';
import Link from "next/link";
import {EyeIcon, EyeOffIcon, CheckCircleIcon, XCircleIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import InputError from "@/app/components/auth/InputError";

const RegisterSchema = z.object({
    email: z
        .string({required_error: "L'adresse email est obligatoire"})
        .email({message: "L'adresse email n'est pas valide"}),
    name: z
        .string({required_error: "Le nom est obligatoire"})
        .min(2, {message: 'Le nom doit contenir au moins 2 caractères'}),
    firstname: z
        .string({required_error: "Le prénom est obligatoire"})
        .min(2, {message: 'Le prénom doit contenir au moins 2 caractères'}),
    password: z
        .string({required_error: "Le mot de passe est obligatoire"})
        .min(8, {message: 'Le mot de passe doit contenir au moins 8 caractères'}),
    passwordConfirm: z
        .string()
        .min(8, {message: 'Le mot de passe doit contenir au moins 8 caractères'}),
    acceptedTerms: z
        .boolean({required_error: "Vous devez accepter les conditions d'utilisation"}),
}).refine((data) => data.password === data.passwordConfirm, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['passwordConfirm'],
});
type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export default function Page() {
    const {register, handleSubmit, formState: {errors}} = useForm<RegisterSchemaType>({
        resolver: zodResolver(RegisterSchema),
    });
    const onSubmit: SubmitHandler<RegisterSchemaType> = (data) => console.log(data);

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
    const [error, setError] = useState<string[]>([]);

    const validatePassword = (password: string) => {
        const errors: string[] = [];


        if (password.length < 8) {
            errors.push('Votre mot de passe doit comporter au moins 8 caractères.');
        }
        setError(errors);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPasswordConfirm = e.target.value;
        setPasswordConfirm(newPasswordConfirm);
    };

    const isButtonDisabled = () => {
        const isPasswordValid = password.length >= 8;
        const isPasswordMatch = password === passwordConfirm;
        return !isPasswordValid || !isPasswordMatch || !acceptedTerms;
    };

    return (
        <>
            <div className="w-screen h-screen flex justify-items-center items-center">
                {/* Form section */}
                <div className="w-full lg:w-1/2 p-4 lg:p-8 flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full">
                        <div className="flex justify-start items-center">
                            <Image src={logo} alt="FirstEvent Logo" width={150} height={37.5} className="mb-6 w-60"/>
                        </div>

                        <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-indigo-900">Créer un compte</h1>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <input type="email" key="email" id="email"
                                       placeholder="Adresse email" {...register('email')}
                                       className={cn(errors.email ? 'focus:border-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition duration-300' : 'focus:border-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition duration-300 hover:border-gray-300', "w-full p-2 border rounded focus:outline-none text-[#4F4B4B] placeholder:text-[#9F9D9D]")}/>
                                {errors.email && <InputError message={errors.email.message}/>}
                            </div>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <input type="text" key="name" placeholder="Nom" {...register('name')}
                                       className={cn(errors.name ? 'focus:border-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition duration-300' : 'focus:border-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition duration-300 hover:border-gray-300', "w-full sm:w-1/2 p-2 border rounded focus:outline-none text-[#4F4B4B] placeholder:text-[#9F9D9D]")}/>
                                <input type="text" key="firstname" id="firstname"
                                       placeholder="Prénom" {...register('firstname')}
                                       className={cn(errors.firstname ? 'focus:border-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition duration-300' : 'focus:border-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition duration-300 hover:border-gray-300', "w-full sm:w-1/2 p-2 border rounded focus:outline-none text-[#4F4B4B] placeholder:text-[#9F9D9D]")}/>
                            </div>
                            {errors.name && <InputError message={errors.name.message}/>}
                            {errors.firstname && <InputError message={errors.firstname.message}/>}
                            <div>
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"}
                                           placeholder="Mot de passe" {...register('password')}
                                           value={password}
                                           onChange={handlePasswordChange}
                                           className={cn(errors.password ? 'focus:border-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition duration-300' : 'focus:border-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition duration-300 hover:border-gray-300', "w-full p-2 border rounded focus:outline-none text-[#4F4B4B] placeholder:text-[#9F9D9D]")}/>
                                    <span onClick={() => setShowPassword(!showPassword)}
                                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer">
                                        {showPassword ? <EyeOffIcon/> : <EyeIcon/>}
                                    </span>
                                    {errors.password &&
                                        <InputError message={errors.password.message}/>}
                                </div>

                                {password && passwordConfirm && password !== passwordConfirm && (
                                    <InputError message="Les mots de passe ne correspondent pas."/>
                                )}
                            </div>
                            <div>
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"} {...register('passwordConfirm')}
                                           placeholder="Confirmer le mot de passe"
                                           value={passwordConfirm}
                                           onChange={handlePasswordConfirmChange}
                                           className={cn(errors.passwordConfirm ? 'focus:border-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition duration-300' : 'focus:border-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition duration-300 hover:border-gray-300', "w-full p-2 border rounded focus:outline-none text-[#4F4B4B] placeholder:text-[#9F9D9D]")}/>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <input type="checkbox" id="terms" checked={acceptedTerms} {...register('acceptedTerms')}
                                       onChange={() => setAcceptedTerms(!acceptedTerms)}
                                       className={cn(errors.acceptedTerms ? 'focus:border-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition duration-300' : 'focus:border-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition duration-300', "mt-1 mr-2 checked:bg-blue-500 p-2 ")}/>
                                <label htmlFor="terms" className="text-sm text-[#9F9D9E]">
                                    J&apos;accepte les <Link href={"#"} className="text-blue-500">conditions
                                    d&apos;utilisation</Link> et les
                                    <Link href={"#"} className="text-blue-500"> directives de la communauté de
                                        FirstEvent</Link> et j&apos;ai lu
                                    la <Link href={"#"} className="text-blue-500">politique de confidentialité</Link>.
                                </label>
                            </div>
                            <button type="submit"
                                    disabled={isButtonDisabled()}
                                    className={cn(isButtonDisabled() ? 'cursor-not-allowed' : '', "w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition duration-300")}>
                                Créer un compte
                            </button>
                        </form>

                        <p className="mt-4 text-center">
                            <Link href={'/login'}
                                  className="text-[#270B87] font-medium hover:text-blue-700 transition-colors  duration-300">Connectez-vous</Link>
                        </p>
                    </div>
                </div>

                {/* Image section - hidden on mobile */}
                <div className='bg-white w-1/2 h-full hidden lg:flex'>
                    <Image src={login} alt="Next.js Logo"
                           className='w-full flex object-cover justify-center h-auto' width={800} height={0}/>
                </div>
            </div>
        </>
    );
};