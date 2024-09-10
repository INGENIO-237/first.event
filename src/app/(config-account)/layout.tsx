import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import Navbar from '../components/config-account/Navbar';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            {children}
        </div>
    );
}
