import {
  createContext,
  useContext,
  useState,
} from "react";

import initialProducts from "../data/Product";

const ProductContext = createContext();

function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("ethioProducts");
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        // If savedProducts only has the old initial list (< 20 items), upgrade to full 20 products
        if (Array.isArray(parsed) && parsed.length >= initialProducts.length) {
          return parsed;
        }
      } catch (e) {
        console.error("Error loading products from localStorage", e);
      }
    }
    return initialProducts;
  });

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
    };

    setProducts((currentProducts) => {
      const updatedProducts = [
        ...currentProducts,
        newProduct,
      ];

      localStorage.setItem(
        "ethioProducts",
        JSON.stringify(updatedProducts)
      );

      return updatedProducts;
    });
  };

  const deleteProduct = (productId) => {
    setProducts((currentProducts) => {
      const updatedProducts = currentProducts.filter(
        (product) => product.id !== productId
      );

      localStorage.setItem(
        "ethioProducts",
        JSON.stringify(updatedProducts)
      );

      return updatedProducts;
    });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}

export default ProductProvider;