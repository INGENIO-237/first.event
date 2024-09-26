import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface ItemProps {
  imageUrl: string;
  title: string;
  subtitle: string;
}

const AutoLayout: React.FC<ItemProps> = ({ imageUrl, title, subtitle }) => {
  const [titleDisplay, setTitleDisplay] = useState(title);
  const [subtitleDisplay, setSubtitleDisplay] = useState(subtitle);
  const containerRef = useRef<HTMLDivElement>(null);

  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

  useEffect(() => {
    const updateTextLength = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const maxTitleLength = Math.floor(containerWidth / 10);
        const maxSubtitleLength = Math.floor(containerWidth / 9);

        setTitleDisplay(truncateText(title, maxTitleLength));
        setSubtitleDisplay(truncateText(subtitle, maxSubtitleLength));
      }
    };

    updateTextLength();
    window.addEventListener("resize", updateTextLength);
    return () => window.removeEventListener("resize", updateTextLength);
  }, [title, subtitle]);

  return (
    <div ref={containerRef} className="flex items-center p-2 sm:p-3 md:p-4">
      <Image
        src={imageUrl}
        alt={title}
        height={40}
        priority
        width={40}
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover"
      />
      <div className="ml-2 sm:ml-3 md:ml-4 flex-grow min-w-0">
        <p
          className="font-medium text-sm sm:text-base md:text-lg"
          title={title}
        >
          {titleDisplay}
        </p>
        <p
          className="text-xs sm:text-sm md:text-base text-gray-600"
          title={subtitle}
        >
          {subtitleDisplay}
        </p>
      </div>
    </div>
  );
};

export default AutoLayout;
