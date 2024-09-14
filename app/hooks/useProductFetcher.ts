import { useState } from "react";
import { scrapeAndStoreProduct } from "../../libs/action";

export default function useProductFetcher() {
    const [loading, setLoading] = useState(false);

    const fetchProduct = async (url: string) => {
        setLoading(true);
        try {
            const product = await scrapeAndStoreProduct(url);
            return product;
        } catch (error) {
            console.error("Error fetching product", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { fetchProduct, loading };
}
