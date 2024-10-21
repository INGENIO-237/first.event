import Select from "@/components/custom/profile/Select";
import Input from "@/components/custom/Input";

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <>
      {/* Head */}
      <div className="flex flex-col w-full gap-2">
        <h1 className="md:text-4xl text-2xl font-bold text-first_violet">
          {title}
        </h1>
        <span className="text-[#5F5E5E]">{subtitle}</span>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-6 w-full gap-2 ">
        <Input
          type="search"
          placeholder="Rechercher un organisateur/ événement"
        />
        <Select placeholder="Tous les codes promos" options={[]} />
        <Select placeholder="Tous les organisateurs" options={[]} />
        <Select placeholder="Tous les événements" options={[]} />
        <Select placeholder="Date de début" options={[]} />
        <Select placeholder="Date de fin" options={[]} />
      </div>
      {/* Stats */}
      <div className="grid md:grid-cols-4 grid-cols-2 md:gap-6 gap-3 items-center w-full ">
        <div className="flex md:text-2xl text-center md:text-start text-md font-semibold flex-col text-balance  gap-2 items-start justify-start w-full md:p-4 p-2 rounded shadow-card">
          <span className="">Nombre d&apos;organisateurs</span>
          <span className="text-center">0</span>
        </div>
        <div className="flex md:text-2xl text-md font-semibold text-center md:text-start flex-col text-balance  gap-2 items-start justify-start w-full md:p-4 p-2 rounded shadow-card">
          <span className="">Nombre de codes promos</span>
          <span className="text-center">0</span>
        </div>
        <div className="flex md:text-2xl text-md text-center md:text-start font-semibold flex-col text-balance  gap-2 items-start justify-start w-full md:p-4 p-2 rounded shadow-card">
          <span className="">Nombre de tickets vendus</span>
          <span>0</span>
        </div>
        <div className="flex md:text-2xl text-md text-center md:text-start font-semibold flex-col text-balance  gap-2 items-start justify-start w-full md:p-4 p-2 rounded shadow-card">
          <span className="">Nombre d&apos;événements</span>
          <span>0</span>
        </div>
      </div>
    </>
  );
};

export default Header;
