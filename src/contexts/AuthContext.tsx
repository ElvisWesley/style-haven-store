import React, { createContext, useContext, useState } from "react";
import { AuthContextType, User } from "@/types/auth";
import { useToast } from "@/components/ui/use-toast";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const signIn = async (email: string, password: string) => {
    try {
      // TODO: Implement actual authentication logic here
      setUser({ id: "1", email });
      toast({
        title: "Signed in successfully",
        description: "Welcome back!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error signing in",
        description: "Please check your credentials and try again.",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // TODO: Implement actual sign up logic here
      setUser({ id: "1", email, name });
      toast({
        title: "Account created successfully",
        description: "Welcome to Interior Haven!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error creating account",
        description: "Please try again later.",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // TODO: Implement actual sign out logic here
      setUser(null);
      toast({
        title: "Signed out successfully",
        description: "See you soon!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: "Please try again later.",
      });
      throw error;
    }
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