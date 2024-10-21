
import MobNavBar from "../../components/custom/profile/MobNavBar";
import NavBar from "../../components/custom/profile/NavBar";

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
      <div className="flex flex-row">{children}</div>
    </div>
  );
}
