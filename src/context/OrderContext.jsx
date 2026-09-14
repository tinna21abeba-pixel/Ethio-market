import {
  createContext,
  useContext,
  useState,
} from "react";

const OrderContext = createContext();

function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("ethioOrders");

    return savedOrders
      ? JSON.parse(savedOrders)
      : [];
  });

  const createOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: Date.now(),
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    setOrders((currentOrders) => {
      const updatedOrders = [
        ...currentOrders,
        newOrder,
      ];

      localStorage.setItem(
        "ethioOrders",
        JSON.stringify(updatedOrders)
      );

      return updatedOrders;
    });

    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((currentOrders) => {
      const updatedOrders = currentOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      );

      localStorage.setItem(
        "ethioOrders",
        JSON.stringify(updatedOrders)
      );

      return updatedOrders;
    });
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}

export default OrderProvider;