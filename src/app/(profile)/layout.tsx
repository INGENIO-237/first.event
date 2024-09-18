import MobNavBar from "../components/profile/MobNavBar";
import NavBar from "../components/profile/NavBar";
import SideBar from "./_components/SideBar";

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
                <div className="px-4 w-full py-2">
                {children}
                </div>
            </div>
        </div>
    );
}
