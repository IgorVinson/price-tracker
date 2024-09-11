import axios from "axios";
import * as cheerio from "cheerio";
import extractPrice from "@/lib/utils";

export default async function scrapeAmazonProduct(productUrl: string) {
    if (!productUrl) return;
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;

    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: "proxy brd.superproxy.io",
        port,
        rejectUnauthorized: false,
    };

    try {
        //Fetch product page
        const response = await axios.get(productUrl, options);
        const $ = cheerio.load(response.data);
        const title = $("#productTitle").text().trim();
        const price = extractPrice($(".a-price.a-text-price"));
    } catch (err: any) {
        throw new Error(`Failed to scrape product: ${err.message}`);
    }
}
