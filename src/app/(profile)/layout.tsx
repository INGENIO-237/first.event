import MobNavBar from "../components/profile/MobNavBar";
import NavBar from "../components/profile/NavBar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <MobNavBar />
            {children}
        </div>
    );
}
