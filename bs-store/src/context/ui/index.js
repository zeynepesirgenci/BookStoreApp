import { createContext, useContext, useState } from "react";


export const UIContext = createContext();
export const useUIContext = () => useContext(UIContext);

export const UIProvider = ({children}) => {

    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const value = {
        cart,
        setCart,
        showCart,
        setShowCart,
    }

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>

}