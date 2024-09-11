"use server";

import { scrapeAmazonProduct } from "@/lib/scraper";

export async function scrapeAndStoreProduct(productUrl: string) {
    if (!productUrl) return;

    try {
        return await scrapeAmazonProduct(productUrl);
    } catch (error: any) {
        throw new Error(`Failed to scrape and store product: ${error.message}`);
    }
}
