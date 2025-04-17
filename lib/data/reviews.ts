import { Product } from '@/components/product-card';
import { PublicUserData } from '@/lib/data/users';
import { getProductById } from '@/lib/data/products';

// Review interface
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string; // User's display name
  rating: number; // 1-5 stars
  comment: string;
  createdAt: Date;
  helpfulCount: number; // Number of users who found this review helpful
  title?: string; // Optional review title
}

// Sample review data
const initialReviews: Review[] = [
  // Ethiopian Yirgacheffe reviews
  {
    id: '101',
    productId: 'ethiopian-yirgacheffe',
    userId: '1',
    userName: 'John Doe',
    rating: 5,
    title: 'Best Light Roast I\'ve Tried',
    comment: 'This coffee has an amazing floral aroma with hints of citrus. The flavor is incredibly bright and clean. I brew it using a pour-over method and it\'s perfect every morning!',
    createdAt: new Date('2023-08-15'),
    helpfulCount: 24,
  },
  {
    id: '102',
    productId: 'ethiopian-yirgacheffe',
    userId: '2',
    userName: 'Jane Doe',
    rating: 4,
    title: 'Delightfully Bright',
    comment: 'I love the citrusy notes in this coffee. It\'s not quite as intense as I expected, hence the 4 stars, but it\'s still one of my favorites for morning brewing.',
    createdAt: new Date('2023-09-02'),
    helpfulCount: 16,
  },
  {
    id: '103',
    productId: 'ethiopian-yirgacheffe',
    userId: '3',
    userName: 'Bob Smith',
    rating: 5,
    title: 'A Tea Lover\'s Coffee',
    comment: 'As someone who typically prefers tea, this coffee was a revelation! The delicate floral notes and subtle sweetness make it approachable even for non-coffee enthusiasts.',
    createdAt: new Date('2023-10-10'),
    helpfulCount: 12,
  },
  
  // Colombian Supremo reviews
  {
    id: '104',
    productId: 'colombian-supremo',
    userId: '3',
    userName: 'Bob Smith',
    rating: 5,
    title: 'Perfect Balance',
    comment: 'This Colombian coffee has the perfect balance of body and acidity. The caramel and chocolate notes are pronounced but not overwhelming. Great for everyday drinking.',
    createdAt: new Date('2023-09-15'),
    helpfulCount: 18,
  },
  {
    id: '105',
    productId: 'colombian-supremo',
    userId: '1',
    userName: 'John Doe',
    rating: 4,
    title: 'Solid Choice',
    comment: 'A very good medium roast with consistent quality. I use it primarily for my daily French press brew and it never disappoints. The cherry notes are subtle but noticeable.',
    createdAt: new Date('2023-08-20'),
    helpfulCount: 9,
  },
  
  // Midnight Express reviews
  {
    id: '106',
    productId: 'midnight-express',
    userId: '2',
    userName: 'Jane Doe',
    rating: 5,
    title: 'Rich and Bold',
    comment: 'If you love dark roast, this is the coffee for you. Incredibly rich flavor with a smoky finish that lingers. Perfect for those mornings when you need a serious caffeine kick!',
    createdAt: new Date('2023-07-25'),
    helpfulCount: 32,
  },
  {
    id: '107',
    productId: 'midnight-express',
    userId: '1',
    userName: 'John Doe',
    rating: 5,
    title: 'My Go-To Dark Roast',
    comment: 'The chocolate notes in this blend are incredible. It makes an amazing espresso with thick crema and deep flavor. Also excellent for cold brew during summer months.',
    createdAt: new Date('2023-08-05'),
    helpfulCount: 21,
  },
  {
    id: '108',
    productId: 'midnight-express',
    userId: '3',
    userName: 'Bob Smith',
    rating: 4,
    title: 'Strong but Not Bitter',
    comment: 'This dark roast manages to be strong and flavorful without the bitterness that often comes with darker coffees. Very impressed with the balance.',
    createdAt: new Date('2023-09-18'),
    helpfulCount: 14,
  },
  
  // Espresso Classico reviews
  {
    id: '109',
    productId: 'espresso-classico',
    userId: '1',
    userName: 'John Doe',
    rating: 5,
    title: 'Barista Quality at Home',
    comment: 'This espresso blend makes me feel like a professional barista. The crema is perfect and the flavor profile is exactly what you\'d expect from a high-end café. Worth every penny!',
    createdAt: new Date('2023-06-12'),
    helpfulCount: 45,
  },
  {
    id: '110',
    productId: 'espresso-classico',
    userId: '2',
    userName: 'Jane Doe',
    rating: 5,
    title: 'Exceptional Espresso',
    comment: 'The balance of this espresso is remarkable. It produces a sweet, rich shot with notes of dark chocolate and a hint of fruit. Makes incredible lattes too!',
    createdAt: new Date('2023-07-30'),
    helpfulCount: 28,
  },
  
  // French Press Kit reviews
  {
    id: '111',
    productId: 'french-press-kit',
    userId: '3',
    userName: 'Bob Smith',
    rating: 4,
    title: 'Great Starter Kit',
    comment: 'This kit has everything you need to get started with French press brewing. The grinder is decent quality and the French press itself is sturdy and well-designed.',
    createdAt: new Date('2023-08-22'),
    helpfulCount: 11,
  },
  {
    id: '112',
    productId: 'french-press-kit',
    userId: '2',
    userName: 'Jane Doe',
    rating: 5,
    title: 'Perfect Gift for Coffee Lovers',
    comment: 'I bought this as a gift for my brother who was looking to upgrade from instant coffee. He absolutely loves it! The included coffee is excellent and the instructions were clear for a beginner.',
    createdAt: new Date('2023-09-05'),
    helpfulCount: 16,
  },
  
  // More reviews for various products
  {
    id: '113',
    productId: 'sumatra-mandheling',
    userId: '1',
    userName: 'John Doe',
    rating: 4,
    title: 'Earthy and Complex',
    comment: 'This Sumatran coffee has a distinctive earthy quality that\'s quite unique. It\'s definitely not for everyone, but if you enjoy full-bodied, low-acid coffees, it\'s excellent.',
    createdAt: new Date('2023-08-30'),
    helpfulCount: 7,
  },
  {
    id: '114',
    productId: 'guatemala-antigua',
    userId: '2',
    userName: 'Jane Doe',
    rating: 5,
    title: 'Wonderful Central American Coffee',
    comment: 'The cinnamon and cocoa notes in this Guatemalan coffee are delightful. It has a clean, crisp acidity that makes it perfect for morning drinking.',
    createdAt: new Date('2023-09-10'),
    helpfulCount: 19,
  },
];

/**
 * Gets all stored reviews from localStorage or returns sample data
 */
const getStoredReviews = (): Review[] => {
  if (typeof window === 'undefined') return initialReviews;
  
  try {
    const storedReviews = localStorage.getItem('reviews');
    if (storedReviews) {
      // Parse dates properly from JSON
      const parsedReviews = JSON.parse(storedReviews, (key, value) => {
        if (key === 'createdAt') {
          return new Date(value);
        }
        return value;
      });
      return parsedReviews;
    }
  } catch (error) {
    console.error('Error parsing reviews from localStorage:', error);
  }
  
  // If no stored reviews or error, return sample data
  return initialReviews;
};

/**
 * Saves reviews to localStorage
 */
const saveReviews = (reviewsToSave: Review[]): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('reviews', JSON.stringify(reviewsToSave));
    } catch (error) {
      console.error('Error saving reviews to localStorage:', error);
    }
  }
};

/**
 * Generates a unique review ID
 */
const generateReviewId = (): string => {
  const reviews = getStoredReviews();
  const lastReviewId = reviews.length > 0 
    ? parseInt(reviews[reviews.length - 1].id, 10)
    : 100;
  return (lastReviewId + 1).toString();
};

/**
 * Gets all reviews
 */
export const getAllReviews = (): Review[] => {
  return getStoredReviews();
};

/**
 * Gets reviews for a specific product
 */
export const getReviewsByProductId = (productId: string): Review[] => {
  const reviews = getStoredReviews();
  return reviews.filter(review => review.productId === productId);
};

/**
 * Gets reviews by user ID
 */
export const getReviewsByUserId = (userId: string): Review[] => {
  const reviews = getStoredReviews();
  return reviews.filter(review => review.userId === userId);
};

/**
 * Adds a new review
 */
export const addReview = (
  productId: string, 
  userId: string, 
  userName: string,
  rating: number, 
  comment: string, 
  title?: string
): Review => {
  // Validate rating
  if (rating < 1 || rating > 5) {
    throw new Error('Rating must be between 1 and 5');
  }
  
  const newReview: Review = {
    id: generateReviewId(),
    productId,
    userId,
    userName,
    rating,
    comment,
    title,
    createdAt: new Date(),
    helpfulCount: 0,
  };
  
  const reviews = getStoredReviews();
  reviews.push(newReview);
  saveReviews(reviews);
  
  // Update product rating in real application
  // This would typically be done on the server
  
  return newReview;
};

/**
 * Updates an existing review
 */
export const updateReview = (
  reviewId: string,
  updates: Partial<Pick<Review, 'rating' | 'comment' | 'title'>>
): Review | null => {
  const reviews = getStoredReviews();
  const reviewIndex = reviews.findIndex(review => review.id === reviewId);
  
  if (reviewIndex === -1) {
    return null;
  }
  
  // Update review data
  reviews[reviewIndex] = {
    ...reviews[reviewIndex],
    ...updates,
  };
  
  saveReviews(reviews);
  return reviews[reviewIndex];
};

/**
 * Deletes a review
 */
export const deleteReview = (reviewId: string): boolean => {
  const reviews = getStoredReviews();
  const reviewIndex = reviews.findIndex(review => review.id === reviewId);
  
  if (reviewIndex === -1) {
    return false;
  }
  
  reviews.splice(reviewIndex, 1);
  saveReviews(reviews);
  
  return true;
};

/**
 * Marks a review as helpful
 */
export const markReviewAsHelpful = (reviewId: string): Review | null => {
  const reviews = getStoredReviews();
  const reviewIndex = reviews.findIndex(review => review.id === reviewId);
  
  if (reviewIndex === -1) {
    return null;
  }
  
  reviews[reviewIndex] = {
    ...reviews[reviewIndex],
    helpfulCount: reviews[reviewIndex].helpfulCount + 1,
  };
  
  saveReviews(reviews);
  return reviews[reviewIndex];
};

/**
 * Gets the most helpful reviews for a product
 */
export const getMostHelpfulReviews = (productId: string, limit = 3): Review[] => {
  const productReviews = getReviewsByProductId(productId);
  return [...productReviews]
    .sort((a, b) => b.helpfulCount - a.helpfulCount)
    .slice(0, limit);
};

/**
 * Calculates the average rating for a product
 */
export const calculateAverageRating = (productId: string): number => {
  const reviews = getReviewsByProductId(productId);
  
  if (reviews.length === 0) {
    return 0;
  }
  
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return parseFloat((sum / reviews.length).toFixed(1));
};

/**
 * Gets the rating distribution for a product
 * Returns an array with counts for each rating [1-star, 2-star, 3-star, 4-star, 5-star]
 */
export const getRatingDistribution = (productId: string): number[] => {
  const reviews = getReviewsByProductId(productId);
  const distribution = [0, 0, 0, 0, 0]; // Index 0 = 1 star, index 4 = 5 stars
  
  reviews.forEach(review => {
    distribution[review.rating - 1]++;
  });
  
  return distribution;
};

/**
 * Gets recent reviews for a product
 */
export const getRecentReviews = (productId: string, limit = 5): Review[] => {
  const reviews = getReviewsByProductId(productId);
  return [...reviews]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
};

/**
 * Checks if a user has already reviewed a product
 */
export const hasUserReviewedProduct = (userId: string, productId: string): boolean => {
  const reviews = getStoredReviews();
  return reviews.some(review => review.userId === userId && review.productId === productId);
};

/**
 * Updates product rating and review count based on reviews
 * Note: In a real application, this would be done on the server
 */
export const syncProductReviews = (productId: string): void => {
  // This is a mock function since we can't actually modify the product data in this example
  // In a real application, we would update the product in the database
  console.log(`[Mock] Updated product ${productId} review metrics`);
};