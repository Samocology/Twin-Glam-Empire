
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  isSupabaseConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [supabaseConfigured] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!supabaseConfigured) {
      return;
    }

    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name || '',
        });
        setIsAuthenticated(true);
        console.log("Session found:", session.user.email);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state change:", event, session?.user?.email);
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name || '',
        });
        setIsAuthenticated(true);

        if (event === 'SIGNED_IN') {
          toast({
            title: "Welcome to Twin Glam Empire!",
            description: "You've successfully logged in.",
          });
          navigate('/');
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
        if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You've been successfully logged out.",
          });
          navigate('/login');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast, supabaseConfigured]);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!supabaseConfigured) {
      toast({
        title: "Authentication not available",
        description: "Supabase is not configured. Please connect your project to Supabase first.",
        variant: "destructive",
      });
      return false;
    }

    try {
      console.log("Attempting login with:", email);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message);
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    if (!supabaseConfigured) {
      toast({
        title: "Authentication not available",
        description: "Supabase is not configured. Please connect your project to Supabase first.",
        variant: "destructive",
      });
      return false;
    }

    try {
      console.log("Registering user:", email);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) {
        console.error("Registration error:", error.message);
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Welcome to Twin Glam Empire!",
        description: "Please check your email to verify your account, then log in.",
      });
      
      // Redirect to login page after successful registration
      setTimeout(() => navigate('/login'), 2000);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = async () => {
    if (!supabaseConfigured) {
      toast({
        title: "Authentication not available",
        description: "Supabase is not configured. Please connect your project to Supabase first.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Logout failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    if (!supabaseConfigured) {
      toast({
        title: "Authentication not available",
        description: "Supabase is not configured. Please connect your project to Supabase first.",
        variant: "destructive",
      });
      return false;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({
          title: "Password reset failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Password reset email sent",
        description: "Please check your email for the password reset link.",
      });

      return true;
    } catch (error) {
      console.error('Reset password error:', error);
      toast({
        title: "Password reset failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        resetPassword,
        isSupabaseConfigured: supabaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
