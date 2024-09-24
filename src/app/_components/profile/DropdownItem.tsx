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
      <Link href={link} className="w-full pl-2 py-1 transition duration-300 rounded text-nowrap hover:text-white hover:bg-first_orange">{title}</Link>
    </DropdownMenuItem>
    </>
  )
}

export default DropdownItem