"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star, StarHalf } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Define the product interface
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  origin?: string;
  roastLevel?: string;
  rating: number;
  reviewCount: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  className?: string;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

const ProductCard = ({ product, onAddToCart, className }: ProductCardProps) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  // Improved handleAddToCart with click prevention and feedback
  const handleAddToCart = () => {
    // Prevent multiple rapid clicks
    if (isAddingToCart) return;
    
    if (onAddToCart) {
      setIsAddingToCart(true);
      
      // Call the provided callback
      onAddToCart(product);
      
      // Show visual feedback through button state change
      setTimeout(() => {
        setIsAddingToCart(false);
      }, 500);
    }
  };

  // Render rating stars
  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-primary text-primary" />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 fill-primary text-primary" />);
    }
    
    // Add empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-muted-foreground" />);
    }
    
    return stars;
  };

  return (
    <Card className={cn('overflow-hidden flex flex-col h-full', className)}>
      <div className="relative h-48 w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.roastLevel && (
          <Badge 
            variant="secondary" 
            className="absolute top-2 right-2"
          >
            {product.roastLevel} Roast
          </Badge>
        )}
      </div>
      
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <div className="font-semibold text-lg">
            {formatPrice(product.price)}
          </div>
        </div>
        {product.origin && (
          <div className="text-xs text-muted-foreground mt-1">
            Origin: {product.origin}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="p-4 pt-0 flex-grow">
        <CardDescription className="line-clamp-2 mb-2">
          {product.description}
        </CardDescription>
        
        <div className="flex items-center space-x-1 mt-auto">
          {renderRating(product.rating)}
          <span className="text-xs text-muted-foreground ml-1">
            ({product.reviewCount})
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          asChild
          className="w-full"
        >
          <Link href={`/products/${product.id}`}>
            View Details
          </Link>
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          onClick={handleAddToCart}
          className="w-full"
          disabled={isAddingToCart}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isAddingToCart ? "Adding..." : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;