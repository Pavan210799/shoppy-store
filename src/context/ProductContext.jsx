import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getProducts } from "../api/products";
import { useAuth } from "./AuthContext";

const ProductContext = createContext();

function listsKey(userId) {
  return `shoppy-lists-${userId || "guest"}`;
}

function readLists(userId) {
  try {
    const parsed = JSON.parse(
      localStorage.getItem(listsKey(userId)) || "{}"
    );

    return {
      wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : [],
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
    };
  } catch {
    return { wishlist: [], cart: [] };
  }
}

function writeLists(userId, lists) {
  try {
    localStorage.setItem(
      listsKey(userId),
      JSON.stringify({
        wishlist: lists.wishlist,
        cart: lists.cart,
      })
    );
  } catch {
    // Ignore storage failures.
  }
}

export function ProductProvider({ children }) {
  const { currentUser } = useAuth();
  const userKey = currentUser?.id || "guest";
  const skipSaveRef = useRef(true);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        const data = await getProducts();

        setProducts(data.products || []);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    skipSaveRef.current = true;
  }, [userKey]);

  useEffect(() => {
    const stored = readLists(userKey);
    setWishlist(stored.wishlist);
    setCart(stored.cart);
  }, [userKey]);

  useEffect(() => {
    if (skipSaveRef.current) {
      skipSaveRef.current = false;
      return;
    }

    writeLists(userKey, { wishlist, cart });
  }, [userKey, wishlist, cart]);

  const toggleWishlist = (productId) => {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  };

  const removeFromWishlist = (productId) => {
    setWishlist((current) =>
      current.filter((id) => id !== productId)
    );
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const toggleCart = (productId) => {
    setCart((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  };

  const removeFromCart = (productId) => {
    setCart((current) =>
      current.filter((id) => id !== productId)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        wishlist,
        cart,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        toggleCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
