import { create } from "zustand";
import { Product } from "@/types";

// Define the State type
type ProductState = {
    products: Product[];
};

// Define the Actions type
type ProductActions = {
    addProduct: (product: Product) => void;
    clearProducts: () => void;
    updateProductPrice: (productId: string, newPrice: number) => void;
};

// Create the Zustand store
const useProductStore = create<ProductState & ProductActions>((set) => ({
    products: [],

    // Action to add a product
    addProduct: (product) =>
        set((state) => ({
            products: [...state.products, product],
        })),

    // Action to clear all products
    clearProducts: () =>
        set(() => ({
            products: [],
        })),

    // Action to update the price of a product
    updateProductPrice: (productId, newPrice) =>
        set((state) => ({
            products: state.products.map((product) =>
                product._id === productId
                    ? { ...product, currentPrice: newPrice }
                    : product,
            ),
        })),
}));

export default useProductStore;
