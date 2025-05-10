export interface AdminUser {
  email: string;
  isAuthenticated: boolean;
}

// Static admin credentials (in a real app, this would be server-side)
const ADMIN_EMAIL = "Reporting@rbfc.us";
const ADMIN_PASSWORD = "Boostmobile!23";

// Local Storage key for auth state
const AUTH_STORAGE_KEY = "rbfc_auth_state";

// Get current authentication state 
export function getAuthState(): AdminUser | null {
  try {
    const authData = localStorage.getItem(AUTH_STORAGE_KEY);
    if (authData) {
      return JSON.parse(authData) as AdminUser;
    }
  } catch (error) {
    console.error("Error getting auth state:", error);
  }
  return null;
}

// Set authentication state
export function setAuthState(user: AdminUser | null): void {
  try {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch (error) {
    console.error("Error setting auth state:", error);
  }
}

// Login function
export async function login(email: string, password: string): Promise<AdminUser> {
  // In a real application, this would be a server API call
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      // Make email comparison case-insensitive
      if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
        const user: AdminUser = { 
          email: ADMIN_EMAIL, // Always store the properly cased email
          isAuthenticated: true 
        };
        
        console.log('Login successful:', email.toLowerCase(), ADMIN_EMAIL.toLowerCase());
        setAuthState(user);
        resolve(user);
      } else {
        console.log('Login failed. Provided:', email.toLowerCase(), 'Expected:', ADMIN_EMAIL.toLowerCase());
        console.log('Password match:', password === ADMIN_PASSWORD);
        reject(new Error("Invalid email or password"));
      }
    }, 500);
  });
}

// Logout function
export function logout(): void {
  setAuthState(null);
}

// Check if user is admin
export function isAuthenticated(): boolean {
  const user = getAuthState();
  return !!user?.isAuthenticated;
}