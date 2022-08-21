import { useUIContext } from "../context/ui";


function useCart(product) {

    const {cart, setCart} = useUIContext();

    const addToCart = () => {
       setCart(c => [...c, product])
    }

    const removeFromCart = () => {
        setCart(cart.filter(c => c.id !== product.id))
        
    }
    return {addToCart, removeFromCart}
}

export default useCart;
