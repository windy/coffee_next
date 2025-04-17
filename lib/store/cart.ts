"use client";

import { useEffect, useState } from 'react';
import { Product } from '@/components/product-card';
import { CartItem } from '@/components/cart-item';
import { getProductById } from '@/lib/data/products';

// Cart state interface
export interface CartState {
  items: CartItem[];
  itemCount: number;
  total: number;
}

// Initial empty cart state
const initialCartState: CartState = {
  items: [],
  itemCount: 0,
  total: 0,
};

/**
 * Loads cart data from localStorage
 */
const loadCartFromStorage = (): CartState => {
  if (typeof window === 'undefined') return initialCartState;
  
  try {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsed = JSON.parse(storedCart);
      // Validate basic structure
      if (parsed.items && Array.isArray(parsed.items) && typeof parsed.itemCount === 'number' && typeof parsed.total === 'number') {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  
  return initialCartState;
};

/**
 * Saves cart data to localStorage
 */
const saveCartToStorage = (cart: CartState): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart:', error);
      // Attempt to clear corrupted data
      try {
        localStorage.removeItem('cart');
      } catch (cleanupError) {
        console.error('Failed to clear cart storage:', cleanupError);
      }
    }
  }
};

/**
 * Calculate cart totals (item count and price)
 */
const calculateCartTotals = (items: CartItem[]): { itemCount: number; total: number } => {
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  return {
    itemCount,
    total,
  };
};

/**
 * Format price as currency
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

/**
 * Custom hook for cart functionality
 */
export const useCart = () => {
  const [cart, setCart] = useState<CartState>(initialCartState);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Load cart data from localStorage on initial render
  useEffect(() => {
    try {
      const loadedCart = loadCartFromStorage();
      setCart(loadedCart);
    } catch (error) {
      console.error('Failed to initialize cart:', error);
      setCart(initialCartState);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      saveCartToStorage(cart);
    }
  }, [cart, isLoaded]);

  /**
   * Add a product to the cart
   */
  const addToCart = (product: Product, quantity = 1): boolean => {
    if (!isLoaded) {
      console.error('Cart is not initialized yet');
      return false;
    }
    
    if (!product?.id || !Number.isInteger(quantity) || quantity <= 0) {
      console.error('Invalid product or quantity');
      return false;
    }

    try {
      setCart(prevCart => {
        const existingItemIndex = prevCart.items.findIndex(
          item => item.product.id === product.id
        );
        
        let updatedItems: CartItem[];
        
        if (existingItemIndex >= 0) {
          updatedItems = [...prevCart.items];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + quantity,
          };
        } else {
          updatedItems = [...prevCart.items, { product, quantity }];
        }
        
        const { itemCount, total } = calculateCartTotals(updatedItems);
        
        return {
          items: updatedItems,
          itemCount,
          total,
        };
      });
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  };

  /**
   * Remove a product from the cart
   */
  const removeFromCart = (productId: string): void => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(
        item => item.product.id !== productId
      );
      
      const { itemCount, total } = calculateCartTotals(updatedItems);
      
      return {
        items: updatedItems,
        itemCount,
        total,
      };
    });
  };

  /**
   * Update product quantity in cart
   */
  const updateQuantity = (productId: string, quantity: number): void => {
    if (quantity < 1) return;
    
    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      );
      
      const { itemCount, total } = calculateCartTotals(updatedItems);
      
      return {
        items: updatedItems,
        itemCount,
        total,
      };
    });
  };

  /**
   * Clear all items from cart
   */
  const clearCart = (): void => {
    setCart(initialCartState);
  };
  
  /**
   * Check if a product is in the cart
   */
  const isInCart = (productId: string): boolean => {
    return cart.items.some(item => item.product.id === productId);
  };

  /**
   * Get quantity of a product in cart (0 if not in cart)
   */
  const getQuantity = (productId: string): number => {
    const item = cart.items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getQuantity,
    formatPrice,
    isLoaded,
    error: null, // Can be enhanced to track error states
  };
};

// Default export for modules that need direct access to cart functions
export default useCart;
