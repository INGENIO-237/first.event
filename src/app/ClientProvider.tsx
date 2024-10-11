'use client';
import React from "react";
import Footer from "@/components/partial/Footer";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import StripeProvider from "./StripeProvider";

const ClientProvider = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <QueryClientProvider client={queryClient}>
            <StripeProvider>
                {children}
                <Footer />
            </StripeProvider>
        </QueryClientProvider>
    )
}

export default ClientProvider;