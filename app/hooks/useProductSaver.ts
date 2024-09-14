import { useState } from "react";
import { useSession } from "next-auth/react";

export default function useProductSaver() {
    const { data: session } = useSession();
    const [error, setError] = useState("");

    const saveProduct = async (product: any) => {
        try {
            const response = await fetch("/api/saveProduct", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    product,
                    userEmail: session?.user?.email,
                }),
            });

            if (response.ok) {
                const savedProduct = await response.json();
                console.log("Product saved:", savedProduct);
                return true;
            } else {
                console.error("Failed to save product");
                setError("Failed to save product");
                return false;
            }
        } catch (error) {
            console.error("Error saving product:", error);
            setError(error);
            return false;
        }
    };

    return { saveProduct, error };
}
