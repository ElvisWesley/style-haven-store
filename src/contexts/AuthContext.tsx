import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContextType, User } from "@/types/auth";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  const handleAuthError = async (response: Response) => {
    const data = await response.json();
    throw new Error(data.message || "Authentication failed");
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        await handleAuthError(response);
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      
      toast({
        title: "Success",
        description: "Signed in successfully!",
      });
      
      navigate("/");
    } catch (error) {
      let errorMessage = "Failed to sign in. Please check your credentials.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        await handleAuthError(response);
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
      
      navigate("/");
    } catch (error) {
      let errorMessage = "Failed to create account. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    }
  };

  const signOut = () => {
    return new Promise<void>((resolve) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      
      toast({
        title: "Success",
        description: "Signed out successfully!",
      });
      
      navigate("/");
      resolve();
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};