import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import useProductStore from "../lib/store";

export default function DialogWindow({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const products = useProductStore((state) => state.products);
    const product = products[products.length - 1];
    const saveProduct = useProductStore((state) => state.saveProduct);

    const handleSave = () => {
        if (product) {
            saveProduct(product); // Save the product to the store
            onClose(); // Close the dialog after saving
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-neutral-black opacity-50 fixed inset-0" />
                <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white-200 p-[25px] shadow-[0_2px_10px_rgba(0,0,0,0.1)] focus:outline-none">
                    <Dialog.Title className="text-gray-900 text-[17px] font-medium">
                        {product?.title.trim().slice(0, 100) + "..."}
                    </Dialog.Title>

                    <img
                        className="w-full h-[200px] mt-6 rounded-[6px] object-contain"
                        src={product?.image}
                        alt={product?.title}
                    />

                    <Dialog.Description className="text-gray-500 mt-[10px] mb-5 text-[15px] leading-normal">
                        {product?.description.trim().slice(0, 300) + "..."}
                    </Dialog.Description>

                    {product && (
                        <div className="flex justify-between">
                            <p className="text-gray-900 text-[16px] font-medium">
                                Current Price
                            </p>
                            <p className="text-gray-900 text-[16px] font-medium">
                                {product?.currentPrice} $
                            </p>
                        </div>
                    )}

                    {product && (
                        <div className="flex justify-between">
                            <p className="text-gray-900 text-[16px] font-medium">
                                Original Price
                            </p>
                            <p className="text-gray-900 text-[16px] font-medium">
                                {product?.originalPrice} $
                            </p>
                        </div>
                    )}

                    <div className="mt-[25px] flex justify-end">
                        <Dialog.Close asChild>
                            <button
                                className="bg-primary-green text-white-100 hover:bg-green focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                                onClick={handleSave}
                            >
                                Save changes
                            </button>
                        </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                        <button
                            className="text-primary hover:bg-primary-orange focus:shadow-orange absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                            aria-label="Close"
                        >
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
