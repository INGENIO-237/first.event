import Link from 'next/link'
import React from 'react'

type Props = {}

const PersonalData = (props: Props) => {
    return (
        <div className="w-full md:px-20 py-8 flex flex-col gap-y-8">
            <div className="text-start">
                <h2 className="text-2xl md:text-3xl font-bold text-first_violet text-balance">
                    Gestion de vos données personnelles
                </h2>
            </div>
            <div className='w-full'>
                <p className='text-balance'>Si vous souhaitez consulter comment vos données sur FirstEvent sont gérées, Consultez notre <Link href='' className='text-[#006FFC]'>politique de confidentialité</Link>. Puis, consultez «{" "}<Link href='' className='text-[#006FFC]'>Gestion de données personnelles</Link>{" "}».</p>
            </div>
        </div>
    )
}

export default PersonalData