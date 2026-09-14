import {
  createContext,
  useContext,
  useState,
} from "react";

import initialProducts from "../data/Product";

const ProductContext = createContext();

function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const savedProducts =
      localStorage.getItem("ethioProducts");

    return savedProducts
      ? JSON.parse(savedProducts)
      : initialProducts;
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