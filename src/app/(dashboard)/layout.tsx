import type { Metadata } from "next";
import SideBar from "../../components/custom/dashboard/SideBar";
import NavBar from "../../components/custom/profile/NavBar";
import MobNavBar from "../../components/custom/profile/MobNavBar";

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
                <div className="px-4 py-2 w-full">{children}</div>
            </div>
        </div>
    );
}
