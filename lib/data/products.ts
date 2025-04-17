import { Product } from '@/components/product-card';

// Define product categories
export type ProductCategory = 'single-origin' | 'blend' | 'espresso' | 'decaf' | 'equipment';

// Define roast levels
export type RoastLevel = 'Light' | 'Medium' | 'Medium-Dark' | 'Dark';

// Sample product data
export const products: Product[] = [
  {
    id: 'ethiopian-yirgacheffe',
    name: 'Ethiopian Yirgacheffe',
    description: 'A delicate, tea-like coffee from Ethiopia with bright acidity, and complex flavor notes of lemon, bergamot and blueberry. This light roast brings out the floral and citrus characteristics that Yirgacheffe is known for.',
    price: 16.99,
    imageUrl: 'https://images.unsplash.com/photo-1559525839-b184a4d1dc44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MTF9&auto=format&fit=crop&w=600&q=80',
    category: 'single-origin',
    origin: 'Ethiopia',
    roastLevel: 'Light',
    rating: 4.7,
    reviewCount: 124,
  },
  {
    id: 'colombian-supremo',
    name: 'Colombian Supremo',
    description: 'A classic Colombian coffee with a rich, full body and prominent caramel sweetness. Notes of toasted nuts, chocolate and a hint of cherry create a perfectly balanced cup with a smooth, clean finish.',
    price: 15.49,
    imageUrl: 'https://images.unsplash.com/photo-1572286258217-215cf8e910f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MTF9&auto=format&fit=crop&w=600&q=80',
    category: 'single-origin',
    origin: 'Colombia',
    roastLevel: 'Medium',
    rating: 4.5,
    reviewCount: 98,
  },
  {
    id: 'sumatra-mandheling',
    name: 'Sumatra Mandheling',
    description: 'A full-bodied, earthy Indonesian coffee with low acidity and complex flavors of dark chocolate, cedar, and a subtle spice finish. The unique processing method gives this coffee its characteristic richness and depth.',
    price: 17.99,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MTF9&auto=format&fit=crop&w=600&q=80',
    category: 'single-origin',
    origin: 'Indonesia',
    roastLevel: 'Dark',
    rating: 4.6,
    reviewCount: 86,
  },
  {
    id: 'guatemala-antigua',
    name: 'Guatemala Antigua',
    description: 'From the high valleys surrounded by volcanoes comes this elegant coffee with a crisp acidity, medium body and complex flavors of cocoa, cinnamon, and orange zest. The rich volcanic soil gives this coffee its distinctive character.',
    price: 16.49,
    imageUrl: 'https://images.unsplash.com/photo-1542879568-4f6eda4e3cff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MTF9&auto=format&fit=crop&w=600&q=80',
    category: 'single-origin',
    origin: 'Guatemala',
    roastLevel: 'Medium',
    rating: 4.3,
    reviewCount: 65,
  },
  {
    id: 'costa-rica-tarrazu',
    name: 'Costa Rica Tarrazu',
    description: 'A well-balanced coffee from the Tarrazu region, known for producing some of Costa Rica\'s finest beans. Bright, clean acidity with notes of honey, citrus, and a smooth chocolate finish.',
    price: 16.99,
    imageUrl: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MTF9&auto=format&fit=crop&w=600&q=80',
    category: 'single-origin',
    origin: 'Costa Rica',
    roastLevel: 'Medium',
    rating: 4.4,
    reviewCount: 72,
  },
  {
    id: 'morning-blend',
    name: 'Morning Blend',
    description: 'Start your day with this smooth, balanced blend combining Central and South American coffees. Light to medium roasted to create a bright, crisp cup with notes of caramel, citrus, and milk chocolate. Perfect for your morning routine.',
    price: 14.99,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MTF9&auto=format&fit=crop&w=600&q=80',
    category: 'blend',
    origin: 'Central & South America',
    roastLevel: 'Medium',
    rating: 4.2,
    reviewCount: 112,
  },
  {
    id: 'midnight-express',
    name: 'Midnight Express',
    description: 'A bold, dark roasted blend of Indonesian and African coffees that delivers a rich, intense cup with robust flavors of dark chocolate, smoke, and a hint of spice. The perfect choice for those who love a strong, full-bodied coffee.',
    price: 15.99,
    imageUrl: 'https://images.unsplash.com/photo-1516440523425-51d549118dbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MTF9&auto=format&fit=crop&w=600&q=80',
    category: 'blend',
    origin: 'Indonesia & Africa',
    roastLevel: 'Dark',
    rating: 4.8,
    reviewCount: 136,
  },
  {
    id: 'espresso-classico',
    name: 'Espresso Classico',
    description: 'A traditional Italian-style espresso blend with a perfect balance of sweetness, acidity, and bitterness. This medium-dark roast produces a rich crema and delivers notes of dark chocolate, caramelized sugar, and a nuanced fruit finish.',
    price: 16.49,
    imageUrl: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MTF9&auto=format&fit=crop&w=600&q=80',
    category: 'espresso',
    origin: 'South America & Africa',
    roastLevel: 'Medium-Dark',
    rating: 4.9,
    reviewCount: 184,
  },
  {
    id: 'swiss-water-decaf',
    name: 'Swiss Water Decaf',
    description: 'A naturally decaffeinated coffee using the chemical-free Swiss Water Process that preserves the coffee\'s original flavors. This Colombian medium roast offers a smooth body with notes of caramel, cocoa, and subtle nutty undertones.',
    price: 17.49,
    imageUrl: 'https://images.unsplash.com/photo-1442975631115-c4f7b05b8a2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MTF9&auto=format&fit=crop&w=600&q=80',
    category: 'decaf',
    origin: 'Colombia',
    roastLevel: 'Medium',
    rating: 4.0,
    reviewCount: 58,
  },
  {
    id: 'brazil-santos',
    name: 'Brazil Santos',
    description: 'A smooth, mild coffee from Brazil\'s most famous coffee-growing region. Medium body with low acidity and pleasing notes of milk chocolate, nuts and a slight sweetness reminiscent of caramel or honey.',
    price: 14.99,
    imageUrl: 'https://images.unsplash.com/photo-1535403418759-d458c4a43a59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MTF9&auto=format&fit=crop&w=600&q=80',
    category: 'single-origin',
    origin: 'Brazil',
    roastLevel: 'Medium',
    rating: 4.2,
    reviewCount: 76,
  },
  {
    id: 'kenya-aa',
    name: 'Kenya AA',
    description: 'A bright and vibrant coffee from Kenya with a full body and distinctive wine-like acidity. Complex flavors include black currant, cranberry, and a sweet tomato-like note with a clean, lingering finish.',
    price: 18.99,
    imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MTF9&auto=format&fit=crop&w=600&q=80',
    category: 'single-origin',
    origin: 'Kenya',
    roastLevel: 'Medium',
    rating: 4.7,
    reviewCount: 92,
  },
  {
    id: 'french-press-kit',
    name: 'French Press Kit',
    description: 'Complete coffee brewing kit including a 34oz French press with durable glass carafe and stainless steel frame, a manual coffee grinder with adjustable settings, and a 12oz bag of our Midnight Express blend.',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1519082274554-1ca27038140f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MTF9&auto=format&fit=crop&w=600&q=80',
    category: 'equipment',
    rating: 4.6,
    reviewCount: 43,
  }
];

/**
 * Returns all products
 */
export const getAllProducts = (): Product[] => {
  return products;
};

/**
 * Returns products by category
 */
export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter(product => product.category === category);
};

/**
 * Returns a single product by ID
 */
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

/**
 * Returns products by search term (matches against name and description)
 */
export const searchProducts = (term: string): Product[] => {
  const searchTerm = term.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) || 
    product.description.toLowerCase().includes(searchTerm)
  );
};

/**
 * Returns featured products (top rated products)
 */
export const getFeaturedProducts = (limit = 4): Product[] => {
  return [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};