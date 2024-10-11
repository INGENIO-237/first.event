import server from "@/lib/server";
import { SetupInterestsData } from "@/utils/types/setup";
import { DefaultError, useMutation } from "@tanstack/react-query";

export function useSaveInterests() {
    const updateInterests = async (data: SetupInterestsData) => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await server({
            'Authorization': accessToken ? `Bearer ${accessToken}` : null,
            ["x-refresh"]: refreshToken ? refreshToken : null
        }).post('/account/interests', data);

        return response.data;
    }

    const { mutateAsync: setOrganizers,
        data,
        error,
        isPending } = useMutation<any, DefaultError, SetupInterestsData>({
            mutationFn: updateInterests,
            
        });

}