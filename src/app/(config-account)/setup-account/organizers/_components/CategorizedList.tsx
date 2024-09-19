import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CategorySkeleton from "./CategorySkeleton";

export interface ListItem {
  _id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  isFollowed?: boolean;
}

interface Category {
  name: string;
  icon: React.ReactNode;
  items: ListItem[];
}

interface CategorizedListProps {
  categories: Category[];
  onFollowedChange: (followedItems: ListItem[]) => void;
}

const CategorizedList: React.FC<CategorizedListProps> = ({
  categories,
  onFollowedChange,
}) => {
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [followedItems, setFollowedItems] = useState<ListItem[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setCategoryData(categories.slice(0, 3));
      setLoading(false);
    }, 2000);
  }, [categories]);

  /* useEffect(() => {
    const updatedFollowedItems: ListItem[] = categoryData.flatMap(category =>
      category.items.filter(item => item.isFollowed)
    );
    console.log(updatedFollowedItems)
    onFollowedChange(updatedFollowedItems);
  }, [categoryData, onFollowedChange]); */

  /* useEffect(() => {
    onFollowedChange(followedItems);
  }, [followedItems, onFollowedChange]); */

  const handleDelete = (categoryIndex: number, itemId: number) => {
    const updatedCategories = categoryData
      .map((category, idx) => {
        if (idx === categoryIndex) {
          const updatedItems = category.items.filter(
            (item) => item._id !== itemId
          );
          return {
            ...category,
            items: updatedItems,
          };
        }
        return category;
      })
      .filter((category) => category.items.length > 0);

    setCategoryData(updatedCategories);
  };

  const handleFollowToggle = (categoryIndex: number, itemId: number) => {
    const updatedCategories = categoryData.map((category, idx) => {
      if (idx === categoryIndex) {
        return {
          ...category,
          items: category.items.map((item) => {
            if (item._id === itemId) {
              return { ...item, isFollowed: !item.isFollowed };
            }
            return item;
          }),
        };
      }
      return category;
    });
    setCategoryData(updatedCategories);
    // Update followedItems state when user toggles follow
    const updatedFollowedItems: ListItem[] = categoryData.flatMap((category) =>
      category.items.filter((item) => item.isFollowed)
    );
    setFollowedItems(updatedFollowedItems);
  };

  return (
    <div className="space-y-4 md:w-[80%] overflow-x-hidden">
      {loading
        ? categories
            .slice(0, 3)
            .map((category, index) => <CategorySkeleton key={index} />)
        : categoryData.map((category, categoryIndex) => {
            return (
              <div
                key={categoryIndex}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <div className="flex items-center gap-2 mb-4 font-bold text-3xl text-first_violet ">
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
                        className="flex items-center justify-between rounded-lg p-3 shadow-lg"
                      >
                        <div className="flex items-center">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            height={20}
                            width={20}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="ml-3">
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-gray-600">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <button
                            onClick={() =>
                              handleDelete(categoryIndex, item._id)
                            }
                            className={`text-xl hover:scale-110 transition duration-300 hover:text-gray-700 ${
                              category.items.length <= 3
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            disabled={category.items.length <= 3} // Disable button if 3 or fewer items
                          >
                            ×
                          </button>
                          <motion.button
                            onClick={() =>
                              handleFollowToggle(categoryIndex, item._id)
                            }
                            whileTap={{ scale: 0.9 }}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                              item.isFollowed
                                ? "bg-first_violet text-white hover:bg-indigo-700"
                                : "bg-orange-500 text-white hover:bg-orange-600"
                            }`}
                          >
                            {item.isFollowed ? "Suivi(e)" : "Suivre"}
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default CategorizedList;
