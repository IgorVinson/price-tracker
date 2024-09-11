"use client";
import React from "react";
import { scrapeAndStoreProduct } from "@/lib/action";

function Searchbar() {
    const [inputValue, setInputValue] = React.useState("");
    console.log(inputValue);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        scrapeAndStoreProduct(String(inputValue));
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
            </button>
        </form>
    );
}

export default Searchbar;
