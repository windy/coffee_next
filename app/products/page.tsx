"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Coffee, Filter } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ProductList from '@/components/product-list';
import { Product } from '@/components/product-card';
import { getAllProducts, ProductCategory } from '@/lib/data/products';
import useCart from '@/lib/store/cart';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const { addToCart, isLoaded } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 100]);
  
  useEffect(() => {
    // Get all products
    const allProducts = getAllProducts();
    
    // Check if there's a category filter in URL params
    const categoryParam = searchParams.get('category');
    
    let filteredProducts = allProducts;
    
    if (categoryParam) {
      filteredProducts = allProducts.filter(
        product => product.category === categoryParam
      );
    }
    
    setProducts(filteredProducts);
    setIsLoading(false);
    
    // Calculate min and max prices for the slider
    if (filteredProducts.length > 0) {
      const prices = filteredProducts.map(p => p.price);
      const minPrice = Math.floor(Math.min(...prices));
      const maxPrice = Math.ceil(Math.max(...prices));
      setPriceRange([minPrice, maxPrice]);
    }
  }, [searchParams]);

  const handleAddToCart = (product: Product) => {
    if (isLoaded) {
      addToCart(product);
      toast.success(`${product.name} added to cart`, {
        description: 'Item has been added to your shopping cart',
      });
    } else {
      toast.error('Cart is not available', {
        description: 'Please try again in a moment',
      });
    }
  };
  
  // Group products by category for the sidebar
  const productCategories: Record<string, number> = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Group products by roast level for the sidebar
  const roastLevels: Record<string, number> = products.reduce((acc, product) => {
    if (product.roastLevel) {
      acc[product.roastLevel] = (acc[product.roastLevel] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  // Calculate price ranges for the sidebar
  const getCountForPriceRange = (min: number, max: number): number => {
    return products.filter(p => p.price >= min && p.price <= max).length;
  };

  return (
    <>
      <Navbar />
      <main className="container px-4 sm:px-6 py-8">
        {/* Page Header */}
        <div className="py-6 md:py-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Coffee Products</h1>
          <p className="text-muted-foreground">
            Browse our selection of premium coffees and brewing equipment
          </p>
        </div>
        
        {/* Mobile Filters */}
        <div className="md:hidden mb-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full flex items-center justify-center">
                <Filter className="mr-2 h-4 w-4" />
                Filter Products
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
                <SheetDescription>
                  Narrow down your search with these filters
                </SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                {/* Categories */}
                <div className="space-y-3">
                  <h3 className="font-medium">Categories</h3>
                  <ul className="space-y-2">
                    <li>
                      <a 
                        href="/products" 
                        className="text-muted-foreground hover:text-foreground"
                      >
                        All Products ({products.length})
                      </a>
                    </li>
                    {Object.entries(productCategories).map(([category, count]) => (
                      <li key={category}>
                        <a 
                          href={`/products?category=${category}`}
                          className={`${
                            searchParams.get('category') === category
                              ? 'text-primary font-medium'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)} ({count})
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Separator />
                
                {/* Roast Levels */}
                <div className="space-y-3">
                  <h3 className="font-medium">Roast Level</h3>
                  <ul className="space-y-2">
                    {Object.entries(roastLevels).map(([roast, count]) => (
                      <li key={roast}>
                        <a 
                          href={`/products?roast=${roast}`}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          {roast} ({count})
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Separator />
                
                {/* Price Range */}
                <div className="space-y-3">
                  <h3 className="font-medium">Price</h3>
                  <ul className="space-y-2">
                    <li>
                      <a 
                        href={`/products?price=0-15`}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        Under $15 ({getCountForPriceRange(0, 15)})
                      </a>
                    </li>
                    <li>
                      <a 
                        href={`/products?price=15-20`}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        $15 - $20 ({getCountForPriceRange(15, 20)})
                      </a>
                    </li>
                    <li>
                      <a 
                        href={`/products?price=20-100`}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        Over $20 ({getCountForPriceRange(20, 100)})
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 space-y-6">
            {/* Categories */}
            <div className="space-y-3">
              <h3 className="font-medium">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="/products" 
                    className="text-muted-foreground hover:text-foreground"
                  >
                    All Products ({products.length})
                  </a>
                </li>
                {Object.entries(productCategories).map(([category, count]) => (
                  <li key={category}>
                    <a 
                      href={`/products?category=${category}`}
                      className={`${
                        searchParams.get('category') === category
                          ? 'text-primary font-medium'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)} ({count})
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <Separator />
            
            {/* Roast Levels */}
            <div className="space-y-3">
              <h3 className="font-medium">Roast Level</h3>
              <ul className="space-y-2">
                {Object.entries(roastLevels).map(([roast, count]) => (
                  <li key={roast}>
                    <a 
                      href={`/products?roast=${roast}`}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {roast} ({count})
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <Separator />
            
            {/* Price Range */}
            <div className="space-y-3">
              <h3 className="font-medium">Price</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href={`/products?price=0-15`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Under $15 ({getCountForPriceRange(0, 15)})
                  </a>
                </li>
                <li>
                  <a 
                    href={`/products?price=15-20`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    $15 - $20 ({getCountForPriceRange(15, 20)})
                  </a>
                </li>
                <li>
                  <a 
                    href={`/products?price=20-100`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Over $20 ({getCountForPriceRange(20, 100)})
                  </a>
                </li>
              </ul>
            </div>
            
            <Separator />
            
            {/* Featured Banner */}
            <div className="mt-8">
              <Card className="overflow-hidden">
                <div className="relative h-40">
                  <Image
                    src="https://images.unsplash.com/photo-1516440523425-51d549118dbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MTF9&auto=format&fit=crop&w=300&q=80"
                    alt="Featured Coffee"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
                    <Badge className="w-fit mb-2">Featured</Badge>
                    <h3 className="font-medium">Midnight Express</h3>
                    <p className="text-sm opacity-80">Our best-selling dark roast</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <p>Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Coffee className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No products found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            ) : (
              <ProductList 
                products={products} 
                onAddToCart={(product) => handleAddToCart(product)}
                className="mb-8"
                showFilters={true}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
