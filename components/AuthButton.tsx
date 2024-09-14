"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import Spinner from "./Spinner";

export default function AuthButton() {
    const [loading, setLoading] = React.useState(false);

    const handleSignIn = () => {
        setLoading(true);
        signIn("google");
    };

    const { data: session } = useSession();

    if (session) {
        return (
            <>
                {session?.user?.name} <br />
                <button
                    className="flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 py-2 px-4 transition-all"
                    onClick={() => signOut()}
                >
                    Sign out
                </button>
            </>
        );
    }
    return (
        <>
            <button
                className="flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 py-2 px-4 transition-all"
                onClick={handleSignIn}
                disabled={loading}
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                    alt="Google Logo"
                    className="w-5 h-5 mr-3"
                />
                Sign in {loading && <Spinner />}
            </button>
        </>
    );
}
