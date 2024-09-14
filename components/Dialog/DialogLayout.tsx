import React, { useRef } from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    AlertDialogCloseButton,
    Image,
    Box,
    Text,
} from "@chakra-ui/react";

interface DialogLayoutProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    image?: string;
    currentPrice?: number;
    originalPrice?: number;
    onSave: () => void;
    saveButtonText: string;
}

export default function DialogLayout({
    isOpen,
    onClose,
    title,
    description,
    image,
    currentPrice,
    originalPrice,
    onSave,
    saveButtonText,
}: DialogLayoutProps) {
    const cancelRef = useRef(null);

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {title}
                    </AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        {image && (
                            <Image
                                src={image}
                                alt={title}
                                boxSize="150px"
                                objectFit="cover"
                                mb={4}
                            />
                        )}
                        {description && (
                            <Text>{description?.substring(0, 200)}</Text>
                        )}

                        {currentPrice !== undefined && (
                            <Box mt={4}>
                                <Text as="span" fontWeight="bold">
                                    Current Price:
                                </Text>{" "}
                                <Text as="span" color="green.500">
                                    ${currentPrice?.toFixed(2)}
                                </Text>
                            </Box>
                        )}

                        {originalPrice !== undefined &&
                            originalPrice > currentPrice!! && (
                                <Box mt={2}>
                                    <Text as="span" fontWeight="bold">
                                        Original Price:
                                    </Text>{" "}
                                    <Text
                                        as="span"
                                        textDecoration="line-through"
                                        color="red.500"
                                    >
                                        ${originalPrice?.toFixed(2)}
                                    </Text>
                                </Box>
                            )}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="green" onClick={onSave} ml={3}>
                            {saveButtonText}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}
