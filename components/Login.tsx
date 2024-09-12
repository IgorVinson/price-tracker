"use client";
import { signIn } from "next-auth/react";

export default function Login() {
    const handleLogin = async () => {
        await signIn("google");
    };
    return (
        <div>
            <button onClick={handleLogin}>login</button>
        </div>
    );
}
