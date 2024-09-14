import React, { useState, useEffect } from "react";
import DialogLayout from "./DialogLayout";
import useAuth from "../../app/hooks/useAuth";
import useProductSaver from "../../app/hooks/useProductSaver";

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    data: {
        title: string;
        description: string;
        image: string;
        currentPrice: number;
        originalPrice: number;
    };
}

export default function Dialog({
    isOpen,
    onClose,
    data: product,
}: DialogProps) {
    const { isAuthenticated } = useAuth();
    const { saveProduct } = useProductSaver();
    const [showLoginDialog, setShowLoginDialog] = useState(false);

    const { title, description, image, currentPrice, originalPrice } = product;

    const handleSave = async () => {
        if (!isAuthenticated) {
            setShowLoginDialog(true);
            return;
        }
        const success = await saveProduct(product);
        if (success) {
            onClose();
        }
    };

    useEffect(() => {
        if (isAuthenticated && showLoginDialog) {
            setShowLoginDialog(false);
            handleSave();
        }
    }, [isAuthenticated]);

    return (
        <DialogLayout
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            description={description}
            image={image}
            currentPrice={currentPrice}
            originalPrice={originalPrice}
            onSave={handleSave}
            saveButtonText="Track in table"
        />
    );
}
