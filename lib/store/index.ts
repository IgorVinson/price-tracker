import { create } from "zustand";
import { Product } from "@/types";

// Define the State type
type ProductState = {
    products: Product[];
    savedProducts: Product[]; // Added savedProducts array to the state
};

// Define the Actions type
type ProductActions = {
    addProduct: (product: Product) => void;
    saveProduct: (product: Product) => void; // Action to save a product
    clearProducts: () => void;
    updateProductPrice: (productId: string, newPrice: number) => void;
};

// Create the Zustand store
const useProductStore = create<ProductState & ProductActions>((set) => ({
    products: [],
    savedProducts: [],

    // Action to add a product to the product list
    addProduct: (product) =>
        set((state) => ({
            products: [...state.products, product],
        })),

    // Action to save a product to savedProducts array
    saveProduct: (product) =>
        set((state) => ({
            savedProducts: [...state.savedProducts, product],
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
