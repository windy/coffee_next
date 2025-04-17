"use client";

import React from 'react';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Product } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Cart item interface extending product
export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemove: (productId: string) => void;
  className?: string;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

const CartItemComponent = ({ item, onUpdateQuantity, onRemove, className }: CartItemProps) => {
  const { product, quantity } = item;
  const subtotal = product.price * quantity;
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      onUpdateQuantity(product.id, newQuantity);
    }
  };

  const incrementQuantity = () => {
    onUpdateQuantity(product.id, quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      onUpdateQuantity(product.id, quantity - 1);
    }
  };

  const handleRemove = () => {
    onRemove(product.id);
  };

  return (
    <div className={cn(
      "flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 border-b",
      className
    )}>
      {/* Product Image */}
      <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>
      
      {/* Product Details */}
      <div className="flex-grow space-y-1">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-1">
          {product.origin && `Origin: ${product.origin}`} 
          {product.roastLevel && ` • ${product.roastLevel} Roast`}
        </p>
        <div className="text-sm font-medium">
          {formatPrice(product.price)} each
        </div>
      </div>
      
      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8" 
          onClick={decrementQuantity}
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
          <span className="sr-only">Decrease quantity</span>
        </Button>
        
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="h-8 w-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8" 
          onClick={incrementQuantity}
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Increase quantity</span>
        </Button>
      </div>
      
      {/* Subtotal and Remove */}
      <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:ml-4 sm:min-w-[100px] w-full sm:w-auto justify-between">
        <div className="font-medium">
          {formatPrice(subtotal)}
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 text-red-500 hover:text-red-600 hover:bg-red-50 p-0 px-2"
          onClick={handleRemove}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          <span className="text-sm">Remove</span>
        </Button>
      </div>
    </div>
  );
};

export default CartItemComponent;