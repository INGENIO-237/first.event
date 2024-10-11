"use client"
import React, {useEffect, useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import {EyeIcon, EyeOffIcon} from "lucide-react";
import {FaApple, FaFacebook} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import {useDispatch} from "react-redux";
import {z} from "zod";

import {cn} from "@/lib/utils";
import login from "/public/assets/images/auth-image2.png";
import logo from "/public/assets/logo.png";
import {registerUser} from "@/features/auth/authThunks";
import InputError from "@/app/_components/auth/InputError";
import Checkbox from "@/app/_components/Checkbox";
import {AppDispatch} from "@/store/store";
import {toast} from "sonner";
import {LoginData} from "@/utils/types/auth";
import {useGetCurrentUser, useLogin} from "@/_services/auth.service";
import {useRouter} from "next/navigation";

// Zod schema for form validation
const registerSchema = z.object({
    email: z.string().email("Adresse email invalide"),
    lastname: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    firstname: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    passwordConfirm: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    acceptedTerms: z.boolean().refine((val) => val, {
        message: "Vous devez accepter les conditions d'utilisation",
    }),
}).refine((data) => data.password === data.passwordConfirm, {
    message: "Les mots de passe ne correspondent pas",
    path: ["passwordConfirm"],
});

type RegisterSchemaType = z.infer<typeof registerSchema>;

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    // const {error, status} = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setError,
    } = useForm<RegisterSchemaType>({
        resolver: zodResolver(registerSchema),
    });

    const {loginUser, isPending, error, data} = useLogin();

    const {
        getCurrentUser,
        isPending: userPending,
        error: userError,
        data: currentUser,
    } = useGetCurrentUser();

    useEffect(() => {
        if (data) {
            const { accessToken, refreshToken, otpGenerated } = data;

            if (otpGenerated) {
                router.push("/confirm-otp");
            } else {
                //store in the localStorage the refreshToken and accessToken
                localStorage.setItem("refreshToken", refreshToken);
                localStorage.setItem("accessToken", accessToken);

                getCurrentUser()
            }
        }
    }, [data, getCurrentUser, router]);

    useEffect(() => {
        if(!userPending && currentUser){
            // Set redux current user
        }
    }, [currentUser, userPending]);

    const onSubmit: SubmitHandler<RegisterSchemaType> = async (data) => {
        try {
            const action = await dispatch(registerUser(data));
            if (registerUser.rejected.match(action) && action.payload) {
                toast.warning(action.payload.message);
                if (action.payload.message === 'Adresse électronique déjà utilisée') {
                    setError('email', {
                        type: 'manual',
                        message: action.payload.message
                    });
                } else {
                    console.error("Erreur d'enregistrement:", action.payload.message);
                }
            }
            if (registerUser.fulfilled.match(action) && action.payload) {
                toast.success('Compte créé avec succès');
                // TODO : Begin with the login process
                //     On recupere l'email et le mot de passe puis on fait un login qui va renvoyer un accessToken On  recupère le refreshToken
                const {email, password} = data;
                const loginData: LoginData = {
                    email,
                    password
                }
                await loginUser(loginData)

            }

        } catch (error) {
            toast.error('Une erreur est survenue.');
        }
    };

    return (
        <div className="w-full min-h-screen flex bg-gray-50">
            <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
                <div className="max-w-md mx-auto w-full space-y-8">
                    <Link href="/" className="flex justify-start items-center">
                        <Image
                            src={logo}
                            alt="FirstEvent Logo"
                            width={150}
                            height={37.5}
                            className="mb-6 w-60"
                            priority
                        />
                    </Link>

                    <h1 className="text-3xl font-bold mb-6 text-indigo-900">
                        Créer un compte
                    </h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <input
                                type="email"
                                {...register("email")}
                                placeholder="Adresse email"
                                className={cn(
                                    "w-full p-3 border rounded-lg focus:outline-none text-gray-700 placeholder:text-gray-400",
                                    errors.email
                                        ? "border-red-500 focus:ring-2 focus:ring-red-500"
                                        : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                                )}
                            />
                            {errors.email && <InputError message={errors.email.message}/>}
                        </div>

                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <div className="w-full sm:w-1/2">
                                <input
                                    type="text"
                                    {...register("lastname")}
                                    placeholder="Nom"
                                    className={cn(
                                        "w-full p-3 border rounded-lg focus:outline-none text-gray-700 placeholder:text-gray-400",
                                        errors.lastname
                                            ? "border-red-500 focus:ring-2 focus:ring-red-500"
                                            : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                                    )}
                                />
                                {errors.lastname && <InputError message={errors.lastname.message}/>}
                            </div>
                            <div className="w-full sm:w-1/2">
                                <input
                                    type="text"
                                    {...register("firstname")}
                                    placeholder="Prénom"
                                    className={cn(
                                        "w-full p-3 border rounded-lg focus:outline-none text-gray-700 placeholder:text-gray-400",
                                        errors.firstname
                                            ? "border-red-500 focus:ring-2 focus:ring-red-500"
                                            : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                                    )}
                                />
                                {errors.firstname && <InputError message={errors.firstname.message}/>}
                            </div>
                        </div>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                placeholder="Mot de passe"
                                className={cn(
                                    "w-full p-3 border rounded-lg focus:outline-none pr-10 text-gray-700 placeholder:text-gray-400",
                                    errors.password
                                        ? "border-red-500 focus:ring-2 focus:ring-red-500"
                                        : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                                )}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <EyeOffIcon size={20}/> : <EyeIcon size={20}/>}
                            </button>
                        </div>
                        {errors.password && <InputError message={errors.password.message}/>}

                        <div className="relative">
                            <input
                                type={showPasswordConfirm ? "text" : "password"}
                                {...register("passwordConfirm")}
                                placeholder="Confirmer le mot de passe"
                                className={cn(
                                    "w-full p-3 border rounded-lg focus:outline-none text-gray-700 placeholder:text-gray-400",
                                    errors.passwordConfirm
                                        ? "border-red-500 focus:ring-2 focus:ring-red-500"
                                        : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                                )}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                {showPasswordConfirm ? <EyeOffIcon size={20}/> : <EyeIcon size={20}/>}
                            </button>
                        </div>
                        {errors.passwordConfirm && <InputError message={errors.passwordConfirm.message}/>}

                        <div className="flex items-start mb-4">
                            <div className="flex items-center h-5 mr-2">
                                <Checkbox
                                    id="acceptedTerms"
                                    {...register("acceptedTerms")}
                                    size={5}
                                    bgColor="bg-indigo-500"
                                    inputBorderColor={
                                        errors.acceptedTerms
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                    }
                                />
                            </div>
                            <label htmlFor="acceptedTerms" className="text-sm text-gray-700">
                                J&apos;accepte les{" "}
                                <Link href="#" className="text-indigo-600 hover:text-indigo-800">conditions
                                    d&apos;utilisation
                                </Link>{" "}et la{" "}
                                <Link href="#" className="text-indigo-600 hover:text-indigo-800">politique de
                                    confidentialité
                                </Link>.
                            </label>
                        </div>
                        {errors.acceptedTerms && <InputError message={errors.acceptedTerms.message}/>}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={cn(
                                "w-full text-white p-3 rounded-lg transition duration-300 text-lg font-semibold",
                                isSubmitting
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700"
                            )}
                        >
                            {isSubmitting ? "Création en cours..." : "Créer un compte"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                            Déjà un compte ? Se connecter
                        </Link>
                    </div>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-50 text-gray-500">Ou continuer avec</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-3">
                            <button
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <FcGoogle className="h-5 w-5"/>
                            </button>
                            <button
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <FaFacebook className="h-5 w-5 text-[#314698]"/>
                            </button>
                            <button
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <FaApple className="h-5 w-5 text-[#484848]"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/2 h-full hidden lg:flex">
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