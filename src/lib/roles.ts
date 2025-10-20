// Role-based access control system

export type UserRole = 'franchise_owner' | 'marketing_manager' | 'restaurant_owner';

export interface RoleConfig {
  email: string;
  role: UserRole;
  allowedPages: string[];
  displayName: string;
}

// Define user roles and their allowed pages
export const ROLE_CONFIGS: RoleConfig[] = [
  {
    email: 'franchise_director@gmail.com',
    role: 'franchise_owner',
    allowedPages: ['/', '/franchise'],
    displayName: 'Franchise Director'
  },
  {
    email: 'franchise_owner@gmail.com',
    role: 'franchise_owner',
    allowedPages: ['/', '/franchise'],
    displayName: 'Franchise Owner'
  },
  {
    email: 'marketing_manager@gmail.com',
    role: 'marketing_manager',
    allowedPages: ['/', '/marketing'],
    displayName: 'Marketing Manager'
  },
  {
    email: 'restaurant_owner@gmail.com',
    role: 'restaurant_owner',
    allowedPages: ['/', '/owner'],
    displayName: 'Restaurant Owner'
  }
];

// Get user role by email
export function getUserRole(email: string): UserRole | null {
  const config = getRoleConfig(email);
  return config ? config.role : null;
}

// Get role config by email
export function getRoleConfig(email: string): RoleConfig | null {
  // Normalize email for comparison (lowercase, trim)
  const normalizedEmail = email.toLowerCase().trim();
  return ROLE_CONFIGS.find(config => config.email.toLowerCase().trim() === normalizedEmail) || null;
}

// Check if user has access to a specific page
export function hasAccessToPage(email: string, pagePath: string): boolean {
  const config = getRoleConfig(email);
  if (!config) return false;
  return config.allowedPages.includes(pagePath);
}

// Get allowed pages for a user
export function getAllowedPages(email: string): string[] {
  const config = getRoleConfig(email);
  return config ? config.allowedPages : [];
}

// Get user's display name
export function getUserDisplayName(email: string): string {
  const config = getRoleConfig(email);
  return config ? config.displayName : 'User';
}
