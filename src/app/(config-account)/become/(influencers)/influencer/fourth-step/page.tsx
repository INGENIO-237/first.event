"use client";

import ChannelView from "@/app/_components/config-account/ChannelView";
import ExpandInput from "@/app/_components/config-account/ExpandInput";
import ProgressBar from "@/app/_components/config-account/ProgressBar";
import { cn, generateKey } from "@/lib/utils";
import { ChannelSchema } from "@/schema/ConfigAccountValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import image from "/public/assets/images/setup-account/fourth-step.png";

type ChannelData = z.infer<typeof ChannelSchema>;



const FourthStep = () => {
    const [channels, setChannels] = useState<ChannelData[]>([]);
    const [inputValues, setInputValues] = useState<{ name: string; followers: number; link: string }>({
        name: '',
        followers: 0,
        link: ''
    });

    useEffect(() => {
        let chan = localStorage.getItem("channels")
        if (chan) {
            setChannels(JSON.parse(chan));
        }
    }, []);

    const { register, handleSubmit: submitForm, formState: { errors }, setValue } = useForm<ChannelData>({
        resolver: zodResolver(ChannelSchema),
    });

    const router = useRouter();

    const handleSubmitForm = (d: ChannelData) => {
        addChannel(d)
        setInputValues({ name: '', followers: 0, link: '' });
        // router.push("/");
    }

    const handleSubmit = () => {
        const experience = localStorage.getItem("experience")
        const approximatePeople = localStorage.getItem("approximatePeople")
        const pastEvent = localStorage.getItem("pastEvent");
        const payload = {
            "experience": experience,
            "pastEvent": pastEvent,
            "approximatePeople": approximatePeople,
            "channels": channels
        }
        // TODO: Add the API logic here
        console.log(payload);
        toast.success("Account set successfully");
    }

    const addChannel = (channel: ChannelData) => {
        setChannels((prevChannels) => [...prevChannels, channel]);
        setInputValues({ name: '', followers: 0, link: '' });
        setValue('name', '');
        setValue('followers', '0');
        setValue('link', '');
    }

    const removeChannel = (channelIndex: number) => {
        setChannels((prevChannels) => [...prevChannels.filter((item, index) => {
            return (index !== channelIndex)
        })]);
    }

    return (
        <div className="grow flex flex-col md:flex-row w-full md:h-screen">
            <div className="grow md:w-1/2 px-5 flex pt-20 pb-5 md:overflow-scroll md:no-scrollbar space-y-5 flex-col justify-around md:items-center">
                <div className="md:w-5/6 flex flex-col justify-between items pt-4  h-full space-y-5">
                    <div className="space-y-4">
                        <div className="w-full space-y-4">
                            <h1 className="text-3xl font-extrabold text-first_violet">
                                Quels sont vos canaux de communication et le nombre d&apos;abonnés ?
                            </h1>
                            <div className="w-full">
                                <ProgressBar limit={4} step={4} />
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <form className="flex flex-col w-full gap-2" onSubmit={submitForm((d) => handleSubmitForm(d))}>
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-row gap-2 ">
                                        <ExpandInput
                                            error={errors.name?.message}
                                            register={register('name')}
                                            placeholder={"Canal de canalisation"}
                                            value={inputValues.name}
                                            onChange={(e) => setInputValues({ ...inputValues, name: e.target.value })}
                                        />
                                        <ExpandInput
                                            register={register('followers')}
                                            placeholder={"Nombres d'abonnés"}
                                            type={"number"}
                                            value={inputValues.followers}
                                            onChange={(e) => setInputValues({ ...inputValues, followers: parseInt(e.target.value) })}
                                            error={errors.followers?.message}
                                        />
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <ExpandInput
                                            placeholder={"Lien du compte"}
                                            register={register('link')}
                                            value={inputValues.link}
                                            onChange={(e) => setInputValues({ ...inputValues, link: e.target.value })}
                                            error={errors.link?.message}
                                        />
                                        <button type="submit"
                                            className={cn("rounded-full w-7 h-7 flex items-center border border-first_violet  text-center text-first_violet self-start")}><Check /></button>
                                    </div>
                                </div>
                            </form>
                            <div className="flex flex-col gap-2">
                                {channels.map((channel, index) => (
                                    <>
                                        <ChannelView key={generateKey()} name={channel.name} followers={channel.followers} link={channel.link} close={() => removeChannel(index)} />
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-around items-end w-5/6">
                        <Link href={"/become/organizer/fourth-step"} className="border border-first_orange bg-white hover:bg-first_orange p-2 rounded text-first_orange hover:text-white transition text-center duration-300 w-2/6 ">Retour</Link>
                        <button
                            disabled={channels.length == 0}
                            onClick={() => handleSubmit()}
                            className={cn(" rounded py-2 text-center text-white w-2/6 ", channels.length == 0 ? "cursor-not-allowed bg-gray-400 " : "bg-first_orange hover:bg-orange-600 transition duration-300")} >
                            Suivant</button>
                    </div>
                </div>
            </div>
            <div className="bg-white w-1/2 h-screen min-h-screen hidden md:flex">
                <Image
                    src={image}
                    alt="image"
                    className="w-full flex object-cover justify-center h-auto"
                    width={800}
                    height={0}
                />
            </div>
        </div>
    )
}

export default FourthStep;