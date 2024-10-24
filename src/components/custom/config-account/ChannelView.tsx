"use client";

import { X } from "lucide-react";
import Link from "next/link";

interface Props {
  name: string;
  followers: number | string;
  link: string;
  close: () => void;
}

const ChannelView = ({ name, followers, link, close }: Props) => {
  return (
    <div className="flex w-full flex-row gap-2 border border-first_gray rounded-md p-2 ">
      <div className="w-full p-2">
        <div className="flex flex-row gap-5 items-center ">
          <span className="">{name}</span>
          <span className="text-blue-400">{followers} abonnés</span>
        </div>
        <div className="flex flex-row gap-5 items-center ">
          <span className="">
            Lien:{" "}
            <Link href={link} className="text-blue-400">
              {link}
            </Link>
          </span>
        </div>
      </div>
      <div
        className="flex flex-row items-center justify-end  border border-red-500 rounded-full size-5"
        onClick={() => close()}
      >
        <button className="text-red-500 " onClick={close}>
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChannelView;
