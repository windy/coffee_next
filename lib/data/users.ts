// User related types and mock data

// Address type for user's shipping and billing addresses
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

// User interface
export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string; // In a real app, this would be properly hashed
  firstName: string;
  lastName: string;
  addresses: Address[];
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

// LoginCredentials interface for login form
export interface LoginCredentials {
  email: string;
  password: string;
}

// Registration data interface
export interface RegistrationData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// Public user data (without sensitive information)
export interface PublicUserData {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string; // Full name (for convenience)
}

// Sample user data
const users: User[] = [
  {
    id: '1',
    username: 'johndoe',
    email: 'john.doe@example.com',
    passwordHash: 'password123', // In a real app, this would be properly hashed
    firstName: 'John',
    lastName: 'Doe',
    addresses: [
      {
        street: '123 Main St',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98101',
        country: 'USA',
        isDefault: true,
      },
    ],
    phone: '555-123-4567',
    createdAt: new Date('2022-01-15'),
    updatedAt: new Date('2023-06-10'),
  },
  {
    id: '2',
    username: 'janedoe',
    email: 'jane.doe@example.com',
    passwordHash: 'securepass456', // In a real app, this would be properly hashed
    firstName: 'Jane',
    lastName: 'Doe',
    addresses: [
      {
        street: '456 Park Ave',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        isDefault: true,
      },
    ],
    phone: '555-987-6543',
    createdAt: new Date('2022-03-20'),
    updatedAt: new Date('2023-05-15'),
  },
  {
    id: '3',
    username: 'bobsmith',
    email: 'bob.smith@example.com',
    passwordHash: 'bobpassword789', // In a real app, this would be properly hashed
    firstName: 'Bob',
    lastName: 'Smith',
    addresses: [
      {
        street: '789 Oak St',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105',
        country: 'USA',
        isDefault: true,
      },
    ],
    phone: '555-456-7890',
    createdAt: new Date('2022-05-10'),
    updatedAt: new Date('2023-04-22'),
  },
];

/**
 * Converts a User object to PublicUserData
 */
const sanitizeUser = (user: User): PublicUserData => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    name: `${user.firstName} ${user.lastName}`,
  };
};

/**
 * Simulates user login
 */
export const loginUser = (credentials: LoginCredentials): PublicUserData | null => {
  const { email, password } = credentials;
  
  // Find user by email and check password
  const user = users.find(u => u.email === email && u.passwordHash === password);
  
  if (user) {
    const userData = sanitizeUser(user);
    // In a browser environment, store user data in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(userData));
    }
    return userData;
  }
  
  return null;
};

/**
 * Simulates user registration
 */
export const registerUser = (data: RegistrationData): PublicUserData => {
  // Check if email already exists
  if (users.some(u => u.email === data.email)) {
    throw new Error('Email already in use');
  }
  
  // Check if username already exists
  if (users.some(u => u.username === data.username)) {
    throw new Error('Username already taken');
  }
  
  // Create new user
  const newUser: User = {
    id: (users.length + 1).toString(),
    username: data.username,
    email: data.email,
    passwordHash: data.password, // In a real app, this would be properly hashed
    firstName: data.firstName,
    lastName: data.lastName,
    addresses: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  // Add to users array (in a real app, this would be saved to a database)
  users.push(newUser);
  
  return sanitizeUser(newUser);
};

/**
 * Logs out the current user
 */
export const logoutUser = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};

/**
 * Returns the current logged in user
 */
export const getCurrentUser = (): PublicUserData | null => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (e) {
        return null;
      }
    }
  }
  return null;
};

/**
 * Gets user by ID
 */
export const getUserById = (id: string): PublicUserData | null => {
  const user = users.find(u => u.id === id);
  return user ? sanitizeUser(user) : null;
};

/**
 * Updates user profile information
 */
export const updateUserProfile = (
  userId: string, 
  updateData: Partial<Pick<User, 'firstName' | 'lastName' | 'phone'>>
): PublicUserData | null => {
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return null;
  }
  
  // Update user data
  users[userIndex] = {
    ...users[userIndex],
    ...updateData,
    updatedAt: new Date(),
  };
  
  const updatedUser = sanitizeUser(users[userIndex]);
  
  // Update localStorage if this is the current user
  if (typeof window !== 'undefined') {
    const currentUserData = localStorage.getItem('user');
    if (currentUserData) {
      try {
        const currentUser = JSON.parse(currentUserData);
        if (currentUser.id === userId) {
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      } catch (e) {
        // Handle parse error
      }
    }
  }
  
  return updatedUser;
};

/**
 * Adds a new address for a user
 */
export const addUserAddress = (userId: string, address: Address): boolean => {
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return false;
  }
  
  // If this is the first address or is marked as default, update all other addresses
  if (address.isDefault || users[userIndex].addresses.length === 0) {
    users[userIndex].addresses = users[userIndex].addresses.map(addr => ({
      ...addr,
      isDefault: false,
    }));
    address.isDefault = true;
  }
  
  // Add the new address
  users[userIndex].addresses.push(address);
  users[userIndex].updatedAt = new Date();
  
  return true;
};

/**
 * Gets all addresses for a user
 */
export const getUserAddresses = (userId: string): Address[] => {
  const user = users.find(u => u.id === userId);
  return user ? [...user.addresses] : [];
};

/**
 * Checks if email exists (for registration validation)
 */
export const emailExists = (email: string): boolean => {
  return users.some(u => u.email === email);
};

/**
 * Checks if username exists (for registration validation)
 */
export const usernameExists = (username: string): boolean => {
  return users.some(u => u.username === username);
};