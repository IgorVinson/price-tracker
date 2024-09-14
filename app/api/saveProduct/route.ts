import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";

export async function POST(req: Request) {
    // Отримуємо product та userEmail з body запиту
    const { product, userEmail } = await req.json();

    if (!userEmail) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        // Шукаємо користувача в базі за email
        let user = await prisma.user.findUnique({
            where: { email: userEmail },
        });

        // Якщо користувача немає, повертаємо помилку
        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: userEmail,
                    name: product.userName ?? "Unnamed User", // Можна передати ім'я, якщо є
                    image: product.userImage ?? "", // Якщо є зображення, додаємо
                },
            });
        }

        const savedProduct = await prisma.product.upsert({
            where: { url: product.url }, // Використовуємо унікальне поле `url`
            update: {
                currentPrice: product.currentPrice,
                originalPrice: product.originalPrice,
                priceHistory: product.priceHistory,
                highestPrice: product.highestPrice,
                lowestPrice: product.lowestPrice,
                averagePrice: product.averagePrice,
                discountRate: product.discountRate,
                description: product.description,
                category: product.category,
                reviewsCount: product.reviewsCount,
                stars: product.stars,
                isOutOfStock: product.isOutOfStock,
            },
            create: {
                ...product,
                users: {
                    connect: { id: user.id },
                },
            },
        });

        return NextResponse.json(savedProduct);
    } catch (error) {
        console.error("Error saving product:", error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 },
        );
    }
}
