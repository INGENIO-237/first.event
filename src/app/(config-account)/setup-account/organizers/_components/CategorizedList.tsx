import Image, { ImageProps } from 'next/image';
import React from 'react';
import { FaX } from 'react-icons/fa6';

interface ListItem {
  title: string;
  subtitle: string;
  imageUrl: string;
}

interface Category {
  name: string;
  icon: React.ReactNode;
  items: ListItem[];
}

export interface CategorizedListProps {
  categories: Category[];
}

const CategorizedList: React.FC<CategorizedListProps> = ({ categories }) => {
  return (
    <div className="space-y-4 md:w-[80%] overflow-x-hidden">
      {categories.map((category, index) => {
        return (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-2 mb-4 font-bold  text-3xl text-first_violet ">
              {category.icon}
             {category.name}
            </div>
            <div className="space-y-2">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between rounded-lg p-3 shadow-lg">
                  <div className="flex items-center">
                    <Image src={item.imageUrl} alt={item.title} height={20} width={20} className="w-10 h-10 rounded-full object-cover" />
                    <div className="ml-3">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.subtitle}</p>
                    </div>
                  </div>
                  <div className='flex flex-col items-end'>
                    <button className='text-xl hover:scale-110 transition duration-300 hover:text-gray-700'>×</button>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors duration-300">
                      Suivre
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default CategorizedList;