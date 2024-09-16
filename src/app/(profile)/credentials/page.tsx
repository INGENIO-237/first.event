import React from 'react'

type Props = {}

const Credentials = ({ }: Props) => {
    return (
        <div className='md:px-20 px-5 flex flex-col gap-y-8 pt-5'>
            <div className='md:grid md:grid-cols-2 md:gap-6'>
                <div className='sm:rounded-tl-md sm:rounded-tr-md max-w-full'>
                    <div className="md:col-span-1 pb-4 flex justify-between">
                        <div className="px-4 sm:px-0">
                            <h2 className="text-2xl font-bold text-first_violet">Modifier l&apos;e-mail</h2>
                        </div>
                    </div>
                    <form>
                        <div className="mb-3">
                            <label className='block mb-3 text-base text-black'>Email<span className='text-red-600 ml-1'>*</span></label>
                            <input type='email' className='px-4 mb-1 py-[15px] block w-full border-[#D9D9D9] rounded-lg text-sm focus:border-first_violet shadow-card focus:ring-success-500 disabled:opacity-50 disabled:pointer-events-none' />
                        </div>
                        <div className="flex items-center justify-end py-3 text-end">
                            <div className="flex flex-col sm:flex-row items-center w-full">
                                <button className='inline-flex items-center px-4 py-2 bg-first_orange border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-first_orange/90 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition ease-in-out duration-150 mr-3'>
                                    Modifier
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className='md:grid md:grid-cols-2 md:gap-6'>
                <div className='sm:rounded-tl-md sm:rounded-tr-md'>
                    <div className="md:col-span-1 pb-4 flex justify-between">
                        <div className="px-4 sm:px-0">
                            <h2 className="text-2xl font-bold text-first_violet">Votre mot de passe</h2>
                        </div>
                    </div>
                    <form>
                        <div className="mb-3">
                            <label className='block mb-3 text-base text-black'>Mot de passe<span className='text-red-600 ml-1'>*</span></label>
                            <input type='password' className='px-4 mb-1 py-[15px] block w-full border-[#D9D9D9] rounded-lg text-sm focus:border-first_violet shadow-card  focus:ring-success-500 disabled:opacity-50 disabled:pointer-events-none' />
                        </div>
                        <div className="mb-3">
                            <label className='block mb-3 text-base text-black'>Nouveau mot de passe<span className='text-red-600 ml-1'>*</span></label>
                            <input type='password' className='px-4 mb-1 py-[15px] block w-full border-[#D9D9D9] rounded-lg text-sm focus:border-first_violet shadow-card  focus:ring-success-500 disabled:opacity-50 disabled:pointer-events-none' />
                        </div>
                        <div className="mb-3">
                            <label className='block mb-3 text-base text-black'>Répéter le nouveau mot de passe<span className='text-red-600 ml-1'>*</span></label>
                            <input type='password' className='px-4 mb-1 py-[15px] block w-full border-[#D9D9D9] rounded-lg text-sm focus:border-first_violet shadow-card  focus:ring-success-500 disabled:opacity-50 disabled:pointer-events-none' />
                        <p className='text-sm text-nowrap'>Votre mot de passe doit contenir au moins 8 caractères.</p>
                        </div>
                        <div className="flex items-center justify-end py-3 text-end">
                            <div className="flex flex-col sm:flex-row items-center w-full">
                                <button className='inline-flex items-center px-4 py-2 bg-first_orange border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-first_orange/90 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition ease-in-out duration-150 mr-3'>
                                    Modifier
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Credentials