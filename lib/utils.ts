export default function extractPrice(...elements: any) {
    for (const element of elements) {
        const priceText = element.text().trim();

        console.log("raw price", priceText);

        if (priceText) {
            const cleanPrice = priceText.replace(/[^\d.]/g, "");

            let firstPrice;

            if (cleanPrice) {
                firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];
            }

            console.log(firstPrice || cleanPrice);
            // return firstPrice || cleanPrice;
        }
    }
}
