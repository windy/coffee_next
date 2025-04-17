import { Product } from '@/components/product-card';
import { CartItem } from '@/components/cart-item';
import { Address } from '@/lib/data/users';
import { getProductById } from '@/lib/data/products';

// Order status types
export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

// Order item representing products in an order
export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  imageUrl: string;
}

// Payment method interface
export interface PaymentMethod {
  type: 'credit_card' | 'paypal' | 'bank_transfer';
  lastFourDigits?: string;
  expiryDate?: string;
  cardholderName?: string;
}

// Order interface
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  createdAt: Date;
  updatedAt: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
}

// Sample order data
const orders: Order[] = [
  {
    id: 'ORD-1001',
    userId: '1',
    items: [
      {
        productId: 'ethiopian-yirgacheffe',
        name: 'Ethiopian Yirgacheffe',
        quantity: 2,
        unitPrice: 16.99,
        imageUrl: 'https://images.unsplash.com/photo-1559525839-b184a4d1dc44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MTF9&auto=format&fit=crop&w=600&q=80',
      },
      {
        productId: 'french-press-kit',
        name: 'French Press Kit',
        quantity: 1,
        unitPrice: 59.99,
        imageUrl: 'https://images.unsplash.com/photo-1519082274554-1ca27038140f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MTF9&auto=format&fit=crop&w=600&q=80',
      }
    ],
    status: 'delivered',
    total: 93.97,
    shippingAddress: {
      street: '123 Main St',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'USA',
    },
    billingAddress: {
      street: '123 Main St',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'USA',
    },
    paymentMethod: {
      type: 'credit_card',
      lastFourDigits: '4242',
      expiryDate: '09/25',
      cardholderName: 'John Doe',
    },
    createdAt: new Date('2023-09-15'),
    updatedAt: new Date('2023-09-15'),
    shippedAt: new Date('2023-09-16'),
    deliveredAt: new Date('2023-09-18'),
  },
  {
    id: 'ORD-1002',
    userId: '1',
    items: [
      {
        productId: 'midnight-express',
        name: 'Midnight Express',
        quantity: 3,
        unitPrice: 15.99,
        imageUrl: 'https://images.unsplash.com/photo-1516440523425-51d549118dbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MTF9&auto=format&fit=crop&w=600&q=80',
      }
    ],
    status: 'shipped',
    total: 47.97,
    shippingAddress: {
      street: '123 Main St',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'USA',
    },
    billingAddress: {
      street: '123 Main St',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'USA',
    },
    paymentMethod: {
      type: 'paypal',
    },
    createdAt: new Date('2023-10-10'),
    updatedAt: new Date('2023-10-10'),
    shippedAt: new Date('2023-10-12'),
  },
  {
    id: 'ORD-1003',
    userId: '2',
    items: [
      {
        productId: 'espresso-classico',
        name: 'Espresso Classico',
        quantity: 2,
        unitPrice: 16.49,
        imageUrl: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MTF9&auto=format&fit=crop&w=600&q=80',
      },
      {
        productId: 'colombia-supremo',
        name: 'Colombian Supremo',
        quantity: 1,
        unitPrice: 15.49,
        imageUrl: 'https://images.unsplash.com/photo-1572286258217-215cf8e910f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MTF9&auto=format&fit=crop&w=600&q=80',
      }
    ],
    status: 'processing',
    total: 48.47,
    shippingAddress: {
      street: '456 Park Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    billingAddress: {
      street: '456 Park Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    paymentMethod: {
      type: 'credit_card',
      lastFourDigits: '5678',
      expiryDate: '11/24',
      cardholderName: 'Jane Doe',
    },
    createdAt: new Date('2023-10-20'),
    updatedAt: new Date('2023-10-20'),
  },
];

/**
 * Gets all stored orders from localStorage or returns sample data
 */
const getStoredOrders = (): Order[] => {
  if (typeof window === 'undefined') return orders;
  
  try {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      // Parse dates properly from JSON
      const parsedOrders = JSON.parse(storedOrders, (key, value) => {
        // Convert date strings back to Date objects
        if (key === 'createdAt' || key === 'updatedAt' || key === 'shippedAt' || key === 'deliveredAt') {
          return value ? new Date(value) : undefined;
        }
        return value;
      });
      return parsedOrders;
    }
  } catch (error) {
    console.error('Error parsing orders from localStorage:', error);
  }
  
  // If no stored orders or error, return sample data
  return orders;
};

/**
 * Saves orders to localStorage
 */
const saveOrders = (ordersToSave: Order[]): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('orders', JSON.stringify(ordersToSave));
    } catch (error) {
      console.error('Error saving orders to localStorage:', error);
    }
  }
};

/**
 * Generates a unique order ID
 */
const generateOrderId = (): string => {
  const orders = getStoredOrders();
  const lastOrderNum = orders.length > 0 
    ? parseInt(orders[orders.length - 1].id.split('-')[1], 10) 
    : 1000;
  return `ORD-${lastOrderNum + 1}`;
};

/**
 * Creates a new order from cart items
 */
export const createOrder = (
  userId: string,
  cartItems: CartItem[],
  shippingAddress: Address,
  billingAddress: Address,
  paymentMethod: PaymentMethod
): Order => {
  const orderItems: OrderItem[] = cartItems.map(item => ({
    productId: item.product.id,
    name: item.product.name,
    quantity: item.quantity,
    unitPrice: item.product.price,
    imageUrl: item.product.imageUrl,
  }));
  
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 
    0
  );
  
  const newOrder: Order = {
    id: generateOrderId(),
    userId,
    items: orderItems,
    status: 'processing',
    total,
    shippingAddress,
    billingAddress,
    paymentMethod,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  const orders = getStoredOrders();
  orders.push(newOrder);
  saveOrders(orders);
  
  return newOrder;
};

/**
 * Gets all orders
 */
export const getAllOrders = (): Order[] => {
  return getStoredOrders();
};

/**
 * Gets orders by user ID
 */
export const getOrdersByUserId = (userId: string): Order[] => {
  const orders = getStoredOrders();
  return orders.filter(order => order.userId === userId);
};

/**
 * Gets a single order by ID
 */
export const getOrderById = (orderId: string): Order | undefined => {
  const orders = getStoredOrders();
  return orders.find(order => order.id === orderId);
};

/**
 * Updates an order's status
 */
export const updateOrderStatus = (orderId: string, status: OrderStatus): Order | null => {
  const orders = getStoredOrders();
  const orderIndex = orders.findIndex(order => order.id === orderId);
  
  if (orderIndex === -1) {
    return null;
  }
  
  const updatedOrder = { ...orders[orderIndex], status, updatedAt: new Date() };
  
  // Update date fields based on status
  if (status === 'shipped' && !updatedOrder.shippedAt) {
    updatedOrder.shippedAt = new Date();
  }
  
  if (status === 'delivered' && !updatedOrder.deliveredAt) {
    updatedOrder.deliveredAt = new Date();
  }
  
  orders[orderIndex] = updatedOrder;
  saveOrders(orders);
  
  return updatedOrder;
};

/**
 * Cancels an order
 */
export const cancelOrder = (orderId: string): boolean => {
  const orders = getStoredOrders();
  const orderIndex = orders.findIndex(order => order.id === orderId);
  
  if (orderIndex === -1 || orders[orderIndex].status === 'delivered') {
    return false;
  }
  
  orders[orderIndex].status = 'cancelled';
  orders[orderIndex].updatedAt = new Date();
  saveOrders(orders);
  
  return true;
};

/**
 * Converts cart items to order items
 */
export const cartItemsToOrderItems = (cartItems: CartItem[]): OrderItem[] => {
  return cartItems.map(item => ({
    productId: item.product.id,
    name: item.product.name,
    quantity: item.quantity,
    unitPrice: item.product.price,
    imageUrl: item.product.imageUrl,
  }));
};

/**
 * Calculate total price for an order
 */
export const calculateOrderTotal = (orderItems: OrderItem[]): number => {
  return orderItems.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
};

/**
 * Gets recent orders for a user
 */
export const getRecentOrders = (userId: string, limit = 5): Order[] => {
  const userOrders = getOrdersByUserId(userId);
  return userOrders
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
};

/**
 * Recreates an order (for reordering)
 */
export const reorder = (orderId: string, userId: string): Order | null => {
  const oldOrder = getOrderById(orderId);
  
  if (!oldOrder) {
    return null;
  }
  
  const newOrder: Order = {
    ...oldOrder,
    id: generateOrderId(),
    userId, // Use current user ID
    status: 'processing',
    createdAt: new Date(),
    updatedAt: new Date(),
    shippedAt: undefined,
    deliveredAt: undefined,
  };
  
  const orders = getStoredOrders();
  orders.push(newOrder);
  saveOrders(orders);
  
  return newOrder;
};