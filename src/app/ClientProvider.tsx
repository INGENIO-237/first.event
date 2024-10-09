'use client';
import Footer from "@/components/partial/Footer";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import StripeProvider from "./StripeProvider";



const ClientProvider = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <QueryClientProvider client={queryClient}>
            <StripeProvider>
                {children}
                <ToastContainer
                    position="bottom-right"
                    theme="colored"
                    autoClose={3000}
                />
                <Footer />
            </StripeProvider>
        </QueryClientProvider>
    )
}

export default ClientProvider;