import MobNavBar from "../../components/custom/profile/MobNavBar";
import NavBar from "../../components/custom/profile/NavBar";
import SideBar from "../../components/custom/profile/SideBar";

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
