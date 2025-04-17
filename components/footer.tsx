import React from 'react';
import Link from 'next/link';
import { Coffee, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Footer sections for site map
  const sections = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', href: '/products' },
        { label: 'Single Origin', href: '/products?category=single-origin' },
        { label: 'Blends', href: '/products?category=blends' },
        { label: 'Coffee Equipment', href: '/products?category=equipment' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Our Story', href: '/story' },
        { label: 'Locations', href: '/locations' },
        { label: 'Careers', href: '/careers' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'FAQ', href: '/faq' },
        { label: 'Shipping & Returns', href: '/shipping' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' },
      ],
    },
  ];
  
  // Social media links
  const socialLinks = [
    { icon: <Instagram className="h-5 w-5" />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <Facebook className="h-5 w-5" />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <Twitter className="h-5 w-5" />, href: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <footer className="bg-background border-t">
      <div className="container px-4 sm:px-6 py-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Coffee className="h-6 w-6" />
              <span className="font-bold text-xl">Coffee Shop</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Premium coffee sourced from the finest farms around the world, 
              carefully roasted to bring out unique flavors and aromas.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  <span className="sr-only">{social.label}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Site Map / Sections */}
          {sections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-semibold text-md">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <Separator className="my-8" />
        
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-start space-x-3">
            <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold">Email</h4>
              <a href="mailto:hello@coffeeshop.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                hello@coffeeshop.com
              </a>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold">Phone</h4>
              <a href="tel:+15551234567" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                +1 (555) 123-4567
              </a>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold">Address</h4>
              <address className="text-sm text-muted-foreground not-italic">
                123 Brew Street, Coffee Town<br />
                Beansville, CA 90210
              </address>
            </div>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-8 gap-4">
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-md mb-1">Subscribe to our newsletter</h3>
            <p className="text-sm text-muted-foreground">Stay up to date with new coffees and promotions</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input 
              type="email" 
              placeholder="Your email" 
              className="px-3 py-2 border rounded-md text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        {/* Copyright / Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            © {currentYear} Coffee Shop. All rights reserved.
          </p>
          <div className="flex space-x-4 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;