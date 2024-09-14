import { create } from "zustand";
import zukeeper from "zukeeper";
import { Product } from "../../types";

type ProductState = {
    products: Product[];
    isLoading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
};

type ProductActions = {
    addProduct: (product: Product) => void;
    clearProducts: () => void;
    updateProductPrice: (productId: string, newPrice: number) => void;
};

const useProductStore = create<ProductState & ProductActions>(
    zukeeper((set) => ({
        products: [],
        isLoading: false,
        error: null,

        fetchProducts: async () => {
            set({ isLoading: true, error: null });
            try {
                const response = await fetch("/api/products");
                const data = await response.json();
                set({ products: data, isLoading: false });
            } catch (error) {
                set({ error: error.message, isLoading: false });
            }
        },

        addProduct: (product) =>
            set((state) => ({
                products: [...state.products, product],
            })),

        clearProducts: () =>
            set(() => ({
                products: [],
            })),

        updateProductPrice: (productId, newPrice) =>
            set((state) => ({
                products: state.products.map((product) =>
                    product._id === productId
                        ? { ...product, currentPrice: newPrice }
                        : product,
                ),
            })),
    })),
);

export default useProductStore;
