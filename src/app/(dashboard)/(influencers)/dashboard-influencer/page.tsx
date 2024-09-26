import Header from '../_components/Header'

const page = () => {
    return (
        <div className="flex flex-col py-10 px-7 md:px-20 grow w-full h-svh min-h-svh">
      <div className='w-full h-full space-y-3'>
        {/* Head */}
        <Header title='Bonjour, Exemple' subtitle='Résumé de mes activités' />
      </div>
    </div>

    )
}

export default page