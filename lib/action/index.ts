"use server";
import scrapeAmazonProduct from "@/lib/scraper";

export async function scrapeAndStoreProduct(productUrl: string) {
    if (!productUrl) return;

    try {
        const scrapedProduct = await scrapeAmazonProduct(productUrl);
    } catch (error: any) {
        throw new Error(`Failed to scrape and store product: ${error.message}`);
    }

    return [
        {
            _id: 1,
            name: "Product 1",
            price: 100,
        },
    ];
}
