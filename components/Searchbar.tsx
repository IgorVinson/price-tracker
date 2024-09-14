"use client";
import React, { useState } from "react";
import Spinner from "./Spinner";
import useProductFetcher from "../app/hooks/useProductFetcher";
import { Dialog } from "./Dialog";
import useProductStore from "../libs/store";
import { Product } from "../types"; // Import zustand store

function Searchbar() {
    const [inputValue, setInputValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const { fetchProduct, loading } = useProductFetcher();
    const { products, addProduct } = useProductStore();
    const [product, setProduct] = useState<Product>();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const existingProduct = products.find((p) => p.url === inputValue);

        if (existingProduct) {
            setProduct(existingProduct);
            setIsOpen(true);
        } else {
            try {
                const productData = await fetchProduct(inputValue);

                const alreadyInStore = products.find(
                    (p) => p.url === productData?.url,
                );
                if (!alreadyInStore) {
                    // @ts-ignore
                    addProduct(productData);
                }

                setProduct(productData);
                setIsOpen(true);
            } catch (error) {
                console.error("Error fetching product", error);
            }
        }
    };

    return (
        <>
            <form
                className="flex flex-wrap gap-4 mt-12"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    className="searchbar-input border-2 border-gray-900 rounded-lg px-4 py-2 w-full"
                    placeholder="Enter a product link"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button className="searchbar-btn" type="submit">
                    Search
                    {loading && <Spinner />}
                </button>
            </form>

            {/* Show dialog if the product is available */}
            {product && (
                <Dialog
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    data={product}
                />
            )}
        </>
    );
}

export default Searchbar;
