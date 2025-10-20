// This file demonstrates different ways to get current user information
// You can use these patterns in your components

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Method 1: Using useState and useEffect (most common)
export function UserExample1() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth event:', event);
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>No user logged in</div>;

  return (
    <div>
      <h3>Current User:</h3>
      <p>Email: {user.email}</p>
      <p>ID: {user.id}</p>
      <p>Created: {new Date(user.created_at).toLocaleDateString()}</p>
    </div>
  );
}

// Method 2: Custom hook (reusable)
export function useCurrentUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}

// Method 3: Using the custom hook
export function UserExample2() {
  const { user, loading } = useCurrentUser();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>No user logged in</div>;

  return (
    <div>
      <h3>User from Hook:</h3>
      <p>Email: {user.email}</p>
    </div>
  );
}

// Method 4: One-time check (not reactive)
export async function getCurrentUserOnce() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error getting session:', error);
    return null;
  }
  return session?.user || null;
}

// Method 5: Check if user is authenticated (boolean)
export function useIsAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session?.user);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session?.user);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { isAuthenticated, loading };
}

// Method 6: Sign out function
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
    return false;
  }
  return true;
}

// Method 7: Get user metadata (if you add custom fields)
export function getUserMetadata(user: any) {
  return {
    email: user.email,
    id: user.id,
    created_at: user.created_at,
    last_sign_in_at: user.last_sign_in_at,
    email_confirmed_at: user.email_confirmed_at,
    // Custom metadata (if you add it later)
    user_metadata: user.user_metadata || {},
    app_metadata: user.app_metadata || {},
  };
}

// Example usage in a component:
/*
function MyComponent() {
  const { user, loading } = useCurrentUser();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in</div>;
  
  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
*/
