"use client";
import React, { useEffect } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Spinner,
    Box,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import useProductStore from "../libs/store";

export default function TableComponent() {
    const { products, fetchProducts, isLoading, error } = useProductStore();
    const { data: session } = useSession();

    const borderColor = useColorModeValue("gray.300", "gray.600");
    const hoverBg = useColorModeValue("gray.200", "gray.600");

    // Fetch products on component mount
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const shortenTitle = (title: string) => {
        return title.length > 100 ? `${title.substring(0, 50)}...` : title;
    };

    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="200px"
            >
                <Spinner size="lg" />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="200px"
            >
                <Text color="red.500">Error loading products: {error}</Text>
            </Box>
        );
    }

    return (
        <TableContainer
            maxW="100%"
            overflowX="auto"
            p={4}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
        >
            <Table variant="simple" size="md">
                <TableCaption
                    placement="top"
                    fontSize={["md", "2xl"]}
                    textAlign="left"
                    width={"100%"}
                >
                    Your products
                </TableCaption>
                <Thead>
                    <Tr>
                        <Th>Product Image</Th>
                        <Th>Product Title</Th>
                        <Th isNumeric>Current Price</Th>
                        <Th isNumeric>Original Price</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {session &&
                        products.map((product, index) => (
                            <Tr
                                key={index}
                                _hover={{
                                    backgroundColor: hoverBg,
                                }}
                            >
                                <Td>
                                    <Box
                                        boxSize="70px"
                                        overflow="hidden"
                                        rounded="md"
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="object-contain"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        />
                                    </Box>
                                </Td>
                                <Td>{shortenTitle(product.title)}</Td>
                                <Td isNumeric>{product.currentPrice} $</Td>
                                <Td isNumeric>{product.originalPrice} $</Td>
                            </Tr>
                        ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
