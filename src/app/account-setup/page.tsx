"use client"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import PropagateLoader from "react-spinners/PropagateLoader"

const AccountSetup = () => {
    const router = useRouter();

    const { data } = useQuery({
        queryKey: [undefined],
        queryFn: () => (async () => {
            const result = await fetch("/api/account-setup");
            return result.json();
        })(),
        retry: true,
        retryDelay: 500
    });

    if (data) {
        router.refresh();
        return router.push("/");
    }

    return (
        <div className="min-h-full flex flex-col justify-center items-center space-y-8">
            <PropagateLoader color="#fff" />
            <div className="text-center">
                <p>Please wait wile we setup your account</p>
                <small className="text-muted-foreground">You will be redirected shortly...</small>
            </div>
        </div>
    )
}
 
export default AccountSetup