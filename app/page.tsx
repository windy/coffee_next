"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Coffee } from 'lucide-react';
import { Product } from '@/components/product-card';
import { toast } from "@/components/ui/sonner";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ProductList from '@/components/product-list';
import { getFeaturedProducts } from '@/lib/data/products';
import useCart from '@/lib/store/cart';

export default function Home() {
  const { addToCart, isLoaded } = useCart();
  const featuredProducts = getFeaturedProducts(4);

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
  
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center">
          <Image 
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MTF9&auto=format&fit=crop&w=1920&q=80"
            alt="Coffee beans being roasted"
            fill
            priority
            className="object-cover brightness-50"
            sizes="100vw"
          />
          <div className="container relative z-10 px-4 sm:px-6 py-10 text-white">
            <div className="max-w-2xl space-y-4">
              <Badge variant="outline" className="border-white text-white">Premium Coffee</Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                Artisanal Coffee for the Perfect Brew
              </h1>
              <p className="text-lg sm:text-xl opacity-90">
                Sourced from the finest farms around the world, our coffee beans are carefully roasted to bring out their unique flavors and aromas.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button size="lg" asChild>
                  <Link href="/products">Shop Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black" asChild>
                  <Link href="/about">Our Story</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="bg-background py-16">
          <div className="container px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Coffees</h2>
                <p className="text-muted-foreground">Our most loved blends and single origin coffees</p>
              </div>
              <Button variant="outline" className="mt-4 sm:mt-0" asChild>
                <Link href="/products" className="flex items-center">
                  View All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <ProductList 
              products={featuredProducts} 
              onAddToCart={(product) => handleAddToCart(product)}
            />
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-muted/50">
          <div className="container px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-[400px]">
                <Image 
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MTF9&auto=format&fit=crop&w=800&q=80"
                  alt="Coffee brewing"
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Our Passion for Coffee</h2>
                <p className="text-muted-foreground">
                  Founded in 2010, our coffee shop has been dedicated to sourcing, roasting, and brewing exceptional coffee. 
                  We work directly with farmers to ensure sustainable practices and fair prices.
                </p>
                <p className="text-muted-foreground">
                  Every bean is carefully selected and roasted in small batches to highlight its unique characteristics. 
                  Our expert roasters bring out the best flavors, from bright and fruity to rich and chocolatey.
                </p>
                <Button asChild>
                  <Link href="/story">Read Our Story</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Coffee Categories */}
        <section className="py-16">
          <div className="container px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Explore Our Collection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  title: 'Single Origin', 
                  description: 'Coffee sourced from specific regions with distinctive flavors',
                  image: 'https://images.unsplash.com/photo-1580933073521-dc51f22e5b31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MTF9&auto=format&fit=crop&w=500&q=80',
                  link: '/products?category=single-origin'
                },
                { 
                  title: 'Blends', 
                  description: 'Carefully crafted combinations for balanced flavor profiles',
                  image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MTF9&auto=format&fit=crop&w=500&q=80',
                  link: '/products?category=blend'
                },
                { 
                  title: 'Espresso', 
                  description: 'Bold and intense options perfect for espresso machines',
                  image: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MTF9&auto=format&fit=crop&w=500&q=80',
                  link: '/products?category=espresso'
                },
                { 
                  title: 'Equipment', 
                  description: 'Tools and accessories for the perfect home brewing experience',
                  image: 'https://images.unsplash.com/photo-1519082274554-1ca27038140f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MTF9&auto=format&fit=crop&w=500&q=80',
                  link: '/products?category=equipment'
                },
              ].map((category, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image 
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-xl mb-2">{category.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={category.link}>Browse {category.title}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-center mb-2">What Our Customers Say</h2>
            <p className="text-center text-muted-foreground mb-12">Join thousands of satisfied coffee enthusiasts</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "The Ethiopian Yirgacheffe is the best light roast I've ever tried. The floral notes are incredible!",
                  author: "Michael T.",
                  role: "Coffee Enthusiast"
                },
                {
                  quote: "I love the subscription service. Fresh coffee delivered to my door every two weeks has changed my mornings.",
                  author: "Sarah L.",
                  role: "Loyal Customer"
                },
                {
                  quote: "Their Midnight Express blend makes the perfect espresso. Rich crema and bold flavor without bitterness.",
                  author: "David R.",
                  role: "Home Barista"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <blockquote className="space-y-2">
                    <p className="text-muted-foreground">"{testimonial.quote}"</p>
                    <footer>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </footer>
                  </blockquote>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container px-4 sm:px-6 text-center">
            <div className="max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl font-bold">Ready to Experience Premium Coffee?</h2>
              <p className="text-primary-foreground/90">
                Join our community of coffee lovers and discover the difference that quality beans and proper roasting can make.
              </p>
              <div className="flex justify-center gap-4 pt-2">
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/products">Shop Now</Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                  <Link href="/story">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
