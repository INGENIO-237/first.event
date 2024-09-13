'use client'

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface DropdownItemProps {
  link: string, 
  title: string,
}

const DropdownItem = ({link, title}: DropdownItemProps) => {
  return (
    <>
    <DropdownMenuItem >
      <Link href={link} className="w-full px-2 py-1 transition duration-300 rounded-full hover:text-white hover:bg-first_orange">{title}</Link>
    </DropdownMenuItem>
    </>
  )
}

export default DropdownItem