"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShoppingCart, 
  User, 
  Menu, 
  Coffee 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// This would typically come from a global state management solution
// For now we're mocking this functionality
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    // Check localStorage for user data on client-side
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setIsLoggedIn(true);
        setUser(parsedUser);
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  return { isLoggedIn, user, logout };
};

// Mock cart functionality
const useCart = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Check localStorage for cart data on client-side
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      try {
        const parsedCart = JSON.parse(cartData);
        const count = parsedCart.reduce(
          (total: number, item: { quantity: number }) => total + item.quantity,
          0
        );
        setCartCount(count);
      } catch (e) {
        localStorage.removeItem("cart");
      }
    }
  }, []);

  return { cartCount };
};

const Navbar = () => {
  const pathname = usePathname();
  const { isLoggedIn, user, logout } = useAuth();
  const { cartCount } = useCart();
  
  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/"
    },
    {
      href: "/products",
      label: "Products",
      active: pathname === "/products"
    }
  ];
  
  // Desktop navigation items
  const NavItems = () => (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-black font-semibold dark:text-white" : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
  
  // Mobile navigation items (for sidebar)
  const MobileNavItems = () => (
    <div className="space-y-4 py-4">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "block px-2 py-1 text-lg font-medium transition-colors hover:text-primary",
            route.active ? "text-black font-semibold dark:text-white" : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );

  return (
    <header className="border-b bg-background sticky top-0 z-40">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        {/* Mobile Navigation Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <div className="flex items-center gap-2 mb-6">
              <Coffee className="h-6 w-6" />
              <span className="font-bold text-xl">Coffee Shop</span>
            </div>
            <MobileNavItems />
          </SheetContent>
        </Sheet>
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 ml-4 md:ml-0">
          <Coffee className="h-6 w-6" />
          <span className="font-bold text-xl hidden sm:inline-block">Coffee Shop</span>
        </Link>
        
        {/* Desktop Navigation */}
        <NavItems />
        
        <div className="flex items-center ml-auto gap-4">
          {/* Cart */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          
          {/* User Menu */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarFallback>
                      {user?.name ? user.name.substring(0, 2).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/login">Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/register">Register</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;