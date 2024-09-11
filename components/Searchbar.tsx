"use client";
import React from "react";
import { scrapeAndStoreProduct } from "@/lib/action";
import useProductStore from "@/lib/store";
import DialogWindow from "@/components/DialogWindow";
import Spinner from "@/components/Spinner";

function Searchbar() {
    const [inputValue, setInputValue] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const product = await scrapeAndStoreProduct(String(inputValue));
            useProductStore.getState().addProduct(product!);
            setIsOpen(true);
        } catch (error) {
            console.error("Error fetching product", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
            <input
                type="text"
                className="searchbar-input"
                placeholder="Enter a product link"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />

            <button className="searchbar-btn" type="submit">
                Search
                {loading && <Spinner />}
            </button>
            <DialogWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </form>
    );
}

export default Searchbar;
