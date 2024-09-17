'use client'
import React from 'react'
import FloatingInput from '../_components/FloatingInput'
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const emailSchema = z.object({
    email: z.string().email("L'adresse email n'est pas valide"),
});

const passwordSchema = z.object({
    currentPassword: z.string().min(1, "Le mot de passe actuel est requis"),
    newPassword: z.string().min(8, "Le nouveau mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string().min(1, "Veuillez confirmer le nouveau mot de passe"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
});

type EmailFormData = z.infer<typeof emailSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

const Credentials = () => {
    const { 
        register: registerEmail, 
        handleSubmit: handleSubmitEmail, 
        formState: { errors: emailErrors, isSubmitting: isEmailSubmitting },
        watch: watchEmail,
        setValue: setEmailValue
    } = useForm<EmailFormData>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: 'jiordikengne@gmail.com'
        }
    });

    const { 
        register: registerPassword, 
        handleSubmit: handleSubmitPassword, 
        formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
        watch: watchPassword,
        setValue: setPasswordValue
    } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema)
    });

    const onEmailSubmit: SubmitHandler<EmailFormData> = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("Email updated:", data);
    };

    const onPasswordSubmit: SubmitHandler<PasswordFormData> = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("Password updated:", data);
    };

    return (
        <div className='md:px-20 flex flex-col gap-y-8 pt-5'>
            <div className='md:grid md:grid-cols-2 md:gap-6'>
                <div className='sm:rounded-tl-md sm:rounded-tr-md max-w-full'>
                    <div className="md:col-span-1 pb-4 flex justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-first_violet">Modifier l&apos;e-mail</h2>
                        </div>
                    </div>
                    <form onSubmit={handleSubmitEmail(onEmailSubmit)}>
                        <FloatingInput
                            label='Email'
                            {...registerEmail('email')}
                            value={watchEmail('email')}
                            onChange={(e) => setEmailValue('email', e.target.value)}
                            error={emailErrors.email?.message}
                            required
                        />
                        <div className="flex justify-start">
                            <Button
                                type="submit"
                                disabled={isEmailSubmitting}
                                className="bg-first_orange hover:bg-first_orange/90 text-white font-semibold"
                            >
                                {isEmailSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Modification en cours...
                                    </>
                                ) : (
                                    'Modifier'
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='md:grid md:grid-cols-2 md:gap-6'>
                <div className='sm:rounded-tl-md sm:rounded-tr-md'>
                    <div className="md:col-span-1 pb-4 flex justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-first_violet">Votre mot de passe</h2>
                        </div>
                    </div>
                    <form onSubmit={handleSubmitPassword(onPasswordSubmit)}>
                        <FloatingInput 
                            label='Mot de passe actuel'
                            type='password'
                            {...registerPassword('currentPassword')}
                            value={watchPassword('currentPassword')}
                            onChange={(e) => setPasswordValue('currentPassword', e.target.value)}
                            error={passwordErrors.currentPassword?.message}
                            required
                        />
                        <FloatingInput
                            label='Nouveau mot de passe'
                            type='password'
                            {...registerPassword('newPassword')}
                            value={watchPassword('newPassword')}
                            onChange={(e) => setPasswordValue('newPassword', e.target.value)}
                            error={passwordErrors.newPassword?.message}
                            required
                        />
                        <FloatingInput 
                            label='Répéter le nouveau mot de passe'
                            type='password'
                            {...registerPassword('confirmPassword')}
                            value={watchPassword('confirmPassword')}
                            onChange={(e) => setPasswordValue('confirmPassword', e.target.value)}
                            error={passwordErrors.confirmPassword?.message}
                            required
                            text='Votre mot de passe doit contenir au moins 8 caractères.'
                        />
                        <div className="flex justify-start mt-4">
                            <Button
                                type="submit"
                                disabled={isPasswordSubmitting}
                                className="bg-first_orange hover:bg-first_orange/90 text-white font-semibold"
                            >
                                {isPasswordSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Modification en cours...
                                    </>
                                ) : (
                                    'Modifier'
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Credentials;