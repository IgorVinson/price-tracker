import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";

export async function GET() {
    try {
        // Отримуємо всі продукти з бази даних
        const products = await prisma.product.findMany();

        return NextResponse.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 },
        );
    }
}
