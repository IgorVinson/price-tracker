import { useSession, signIn } from "next-auth/react";

export default function useAuth() {
    const { data: session } = useSession();

    const isAuthenticated = !!session;

    const login = () => {
        signIn();
    };

    return { isAuthenticated, session, login };
}
