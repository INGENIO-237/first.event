"use client";

import Checkbox from "@/components/custom/Checkbox";
import ProgressBar from "@/components/custom/config-account/ProgressBar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaBriefcase, FaMusic, FaPlus, FaCheck } from "react-icons/fa";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import CategorySkeleton from "./_components/CategorySkeleton";
import AutoLayout from "./_components/AutoLayout";
import { useRouter } from "next/navigation";

interface ListItem {
  _id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  isFollowed: boolean;
}

interface Category {
  name: string;
  icon: React.ReactNode;
  items: ListItem[];
}

const ThirdStep = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initialOrganizers: Category[] = [
      {
        name: "Affaires",
        icon: <FaBriefcase />,
        items: [
          {
            _id: 1,
            title: "Simplykart Inc",
            subtitle: "Site informatique et outils",
            imageUrl:
              "https://plus.unsplash.com/premium_photo-1675088136456-4eb83fc5b827?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            isFollowed: true,
          },
          {
            _id: 2,
            title: "Simplykart Inc",
            subtitle: "Site informatique et outils",
            imageUrl:
              "https://images.unsplash.com/photo-1725961476494-efa87ae3106a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
            isFollowed: false,
          },
          {
            _id: 3,
            title: "Simplykart Inc",
            subtitle: "Site informatique et outils",
            imageUrl:
              "https://images.unsplash.com/photo-1725961476494-efa87ae3106a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
            isFollowed: false,
          },
          {
            _id: 4,
            title: "Simplykart Incr",
            subtitle:
              "Site informatique et outils kwdhbjehbfjwherbfjwhberfjhwbrjdhfbjwhrbfdjwhbrfdjwhbrjdfhbwjrhmbfjehbfh",
            imageUrl:
              "https://images.unsplash.com/photo-1725961476494-efa87ae3106a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
            isFollowed: false,
          },
          {
            _id: 5,
            title: "Simplykart Inc",
            subtitle: "Site informatique et outils",
            imageUrl:
              "https://images.unsplash.com/photo-1725961476494-efa87ae3106a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
            isFollowed: false,
          },
        ],
      },
      {
        name: "Musique",
        icon: <FaMusic />,
        items: [
          {
            _id: 10,
            title: "Simplykart Inc",
            subtitle: "Site informatique et outils",
            imageUrl: "/assets/images/auth-event.png",
            isFollowed: false,
          },
        ],
      },
    ];

    setTimeout(() => {
      setCategoryData(initialOrganizers.slice(0, 3));
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const followedItems = categoryData.flatMap((category) =>
      category.items.filter((item) => item.isFollowed)
    );
    setIsButtonDisabled(followedItems.length === 0);
  }, [categoryData]);

  const handleDelete = (categoryIndex: number, itemId: number) => {
    setCategoryData((prevData) =>
      prevData
        .map((category, idx) => {
          if (idx === categoryIndex) {
            return {
              ...category,
              items: category.items.filter((item) => item._id !== itemId),
            };
          }
          return category;
        })
        .filter((category) => category.items.length > 0)
    );
  };

  const handleFollowToggle = (categoryIndex: number, itemId: number) => {
    setCategoryData((prevData) =>
      prevData.map((category, idx) => {
        if (idx === categoryIndex) {
          return {
            ...category,
            items: category.items.map((item) =>
              item._id === itemId
                ? { ...item, isFollowed: !item.isFollowed }
                : item
            ),
          };
        }
        return category;
      })
    );
  };

  const handleSubmit = () => {
    const followedOrganizers = categoryData.flatMap((category) =>
      category.items.filter((item) => item.isFollowed)
    );
    console.log("isCheck", isChecked);
    if (followedOrganizers.length > 0) {
      console.log("Followed Organizers:", followedOrganizers);

      toast.success("Organisateurs soumis avec succès");
    } else {
      toast.error("Aucun organisateur suivi");
    }

    let nextLink = localStorage.getItem("redirect-after-setup-account");
    if (nextLink) {
      router.push(nextLink);
    }
    router.push("/");
  };

  const renderCategoryList = () => {
    if (loading) {
      return Array(3)
        .fill(null)
        .map((_, index) => <CategorySkeleton key={index} />);
    }
    const truncateText = (text: string, maxLength: number) =>
      text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    return categoryData.map((category, categoryIndex) => (
      <div key={categoryIndex} className="bg-white rounded-lg shadow-card p-4">
        <div className="flex items-center gap-2 mb-4 font-bold text-2xl md:text-3xl text-first_violet">
          {category.icon}
          {category.name}
        </div>
        <div className="space-y-2">
          <AnimatePresence>
            {category.items.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between rounded-lg p-3 shadow-card"
              >
                <AutoLayout
                  imageUrl={item.imageUrl}
                  subtitle={item.subtitle}
                  title={item.title}
                />
                <div className="flex flex-col items-end">
                  <button
                    onClick={() => handleDelete(categoryIndex, item._id)}
                    className={`text-xl hover:scale-110 transition duration-300 hover:text-gray-700 ${
                      category.items.length <= 3
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={category.items.length <= 3}
                  >
                    ×
                  </button>
                  <motion.button
                    onClick={() => handleFollowToggle(categoryIndex, item._id)}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 lg:px-4 lg:py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                      item.isFollowed
                        ? "bg-first_violet text-white hover:bg-indigo-700"
                        : "bg-orange-500 text-white hover:bg-orange-600"
                    }`}
                  >
                    <span className="hidden lg:inline">
                      {item.isFollowed ? "Suivi(e)" : "Suivre"}
                    </span>
                    <span className="lg:hidden">
                      {item.isFollowed ? <FaCheck /> : <FaPlus />}
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    ));
  };

  return (
    <div className="grow flex flex-col md:flex-row w-full min-h-screen">
      <div className="grow md:w-1/2 px-4 md:px-5 flex pt-10 md:pt-20 space-y-5 flex-col justify-center md:items-center">
        <div className="md:w-4/6 flex flex-col justify-between py-4 md:py-9 h-full space-y-5">
          <div className="w-full space-y-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-first_violet mb-4 md:mb-6">
              Suivre <br />
              les organisateurs <br />
              <span className="text-[#E35E07]">à Montreal</span>
            </h1>
            <span className="text-xs md:text-sm text-balance mb-2">
              Nous pensons que vous allez adorez ces organisateurs. Suivez-les
              pour être averti lorsqu&apos;ils ajoutent un nouvel événement
            </span>
            <div className="w-full">
              <ProgressBar limit={2} step={2} />
            </div>
            <div className="w-full flex items-center justify-between">
              <Checkbox
                id="email-send"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                primaryColor="text-first_orange"
                inputBorderColor="border-first_orange"
              />
              <label
                className="ml-2 text-xs md:text-sm text-gray-400 w-full"
                htmlFor="email-send"
              >
                Envoyez-moi des e-mails sur les meilleurs événements qui se
                déroulent à proximité ou en ligne
              </label>
            </div>
          </div>
          <div className="hidden md:flex flex-row justify-between w-full">
            <Link
              href={"/setup-account/interests"}
              className="border border-first_orange bg-white hover:bg-first_orange p-2 rounded text-first_orange hover:text-white transition duration-300"
            >
              Précedent
            </Link>
            <button
              onClick={handleSubmit}
              className={cn(
                isButtonDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-first_orange hover:text-white",
                "border border-first_orange bg-white p-2 rounded text-first_orange transition duration-300"
              )}
              disabled={isButtonDisabled}
            >
              Continuer
            </button>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 grow  md:mt-0 md:bg-[#D9D9D9] overflow-y-scroll space-y-6 md:space-y-10 md:h-screen py-6 md:py-14 pb-16 md:pb-0 no-scrollbar">
        <div className="space-y-4 w-full flex flex-col items-center justify-center">
          <div className="space-y-4 w-full md:w-[80%] overflow-x-hidden">
            {renderCategoryList()}
          </div>
        </div>
        <div className="md:hidden flex justify-center">
          <div className="flex flex-row items-center justify-between w-full px-4">
            <Link
              href={"/setup-account"}
              className="border border-first_orange bg-white hover:bg-first_orange p-2 rounded text-first_orange hover:text-white transition duration-300 text-sm"
            >
              Précedent
            </Link>
            <button
              onClick={handleSubmit}
              className={cn(
                isButtonDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-first_orange hover:text-white",
                "border border-first_orange bg-white p-2 rounded text-first_orange transition duration-300 text-sm"
              )}
              disabled={isButtonDisabled}
            >
              Continuer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdStep;
