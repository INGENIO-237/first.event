import React from "react";
import Footer from "@/app/components/Footer";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="pt-10 md:pt-0">
            {children}  
        </div>
    );
}
