import MobNavBar from "../_components/profile/MobNavBar";
import NavBar from "../_components/profile/NavBar";
import SideBar from "./_components/SideBar";
import "react-country-state-city/dist/react-country-state-city.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <MobNavBar />
      <div className="flex flex-row">
        <SideBar />
        <div className="px-4 py-2 md:max-w-[80%] w-full">{children}</div>
      </div>
    </div>
  );
}
