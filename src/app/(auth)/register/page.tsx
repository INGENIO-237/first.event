import { Suspense } from "react";
import Auth from "../../components/auth/Auth";
import Loading from "@/components/Loading";

export default function Page() {

    return (
        <Suspense fallback={<Loading />}>
            <Auth />
        </Suspense >
    )
};