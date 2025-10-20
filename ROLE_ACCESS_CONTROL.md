# Role-Based Access Control

This application implements role-based access control where users can only access specific pages based on their email address.

## User Roles and Access

### Franchise Director/Owner
- **Email**: `franchise_director@gmail.com` or `franchise_owner@gmail.com`
- **Access**: Home page (`/`) + Franchise dashboard (`/franchise`)
- **Navigation**: Shows only "Home" and "Franchise" menu items
- **Role Cards**: Shows only the "Franquicia" card on the home page

### Marketing Manager
- **Email**: `marketing_manager@gmail.com`
- **Access**: Home page (`/`) + Marketing dashboard (`/marketing`)
- **Navigation**: Shows only "Home" and "Marketing" menu items
- **Role Cards**: Shows only the "Marketing" card on the home page

### Restaurant Owner
- **Email**: `restaurant_owner@gmail.com`
- **Access**: Home page (`/`) + Owner dashboard (`/owner`)
- **Navigation**: Shows only "Home" and "Owner" menu items
- **Role Cards**: Shows only the "Dueño (Owner)" card on the home page

## How It Works

### 1. Role Configuration
Roles are defined in `src/lib/roles.ts`:
```typescript
export const ROLE_CONFIGS: RoleConfig[] = [
  {
    email: 'franchise_owner@gmail.com',
    role: 'franchise_owner',
    allowedPages: ['/', '/franchise'],
    displayName: 'Franchise Owner'
  },
  // ... other roles
];
```

### 2. Protected Routes
All pages (except `/auth`) are wrapped with `ProtectedRoute` component that:
- Checks if user is authenticated
- Verifies if user has access to the requested page
- Shows "Access Denied" page if user doesn't have permission

### 3. Dynamic Navigation
The navigation menu automatically filters to show only the pages the user can access.

### 4. Dynamic Role Cards
The home page shows only the role cards for pages the user has access to.

## Testing

1. **Sign up/Sign in** with one of the test emails:
   - `franchise_director@gmail.com` (or `franchise_owner@gmail.com`)
   - `marketing_manager@gmail.com`
   - `restaurant_owner@gmail.com`

2. **Verify access**:
   - Check that only allowed menu items appear in navigation
   - Check that only allowed role cards appear on home page
   - Try to access restricted pages directly via URL - should show "Access Denied"

3. **Role Information**:
   - The home page shows a "Role-Based Access Control" card with current user permissions
   - User info section shows the assigned role

## Adding New Roles

To add a new role:

1. **Add to role configuration** in `src/lib/roles.ts`:
```typescript
{
  email: 'new_user@gmail.com',
  role: 'new_role',
  allowedPages: ['/', '/new-page'],
  displayName: 'New Role Name'
}
```

2. **Create the new page** (if needed)
3. **Add route** to `src/App.tsx` with `ProtectedRoute` wrapper
4. **Add navigation item** to `navItems` in `src/components/Navigation.tsx`
5. **Add role card** to `allRoleCards` in `src/pages/Index.tsx`

## Security Notes

- Access control is enforced on both the frontend (UI filtering) and routing level
- Users cannot access restricted pages even by typing URLs directly
- All authentication is handled by Supabase
- Role assignments are based on email addresses (can be extended to use database roles)
