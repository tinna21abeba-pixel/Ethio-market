import { createContext, useContext, useState } from "react";
const cartContext=createContext();

function   CartProvider({children}){
    const [cart,setCart]=useState([]);

    const addToCart=(product)=>{
        setCart((currentCart)=>[...currentCart, product]);

    };

 const removeFromCart=(productId)=>{
    setCart((currentCart)=>currentCart.filter((item)=>item.id!==productId))
 }
return(
    <cartContext.Provider value={{cart,addToCart,removeFromCart}}>
{children}
    </cartContext.Provider>
)

}
export function useCart() {
  return useContext(cartContext);
}
export default   CartProvider;