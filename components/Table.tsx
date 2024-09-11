"use client";
import React from "react";
import { Table } from "@radix-ui/themes";
import useProductStore from "@/lib/store";

export default function TableComponent() {
    const savedProducts = useProductStore((state) => state.savedProducts); // Get saved products from Zustand store

    const shortenTitle = (title: string) => {
        if (title.length > 100) {
            return title.substring(0, 50) + "...";
        }
        return title;
    };

    return (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>
                        Product Image
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>
                        Product Title
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>
                        Current Price
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>
                        Original Price
                    </Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {savedProducts.map((product, index) => (
                    <Table.Row key={index}>
                        <Table.Cell>
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-24 h-24 object-contain rounded"
                            />
                        </Table.Cell>
                        <Table.RowHeaderCell>
                            {shortenTitle(product.title)}
                        </Table.RowHeaderCell>
                        <Table.Cell>{product.currentPrice} $</Table.Cell>
                        <Table.Cell>{product.originalPrice} $</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
}
