"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Lock } from "lucide-react";

interface LoginFormProps {
  onLogin: () => void;
}

/**
 * LoginForm Component
 * 
 * A form component for user authentication. It provides a simple interface
 * for users to enter their credentials and handles the login process.
 * 
 * Features:
 * - Username and password input fields
 * - Form validation
 * - Success/error toast notifications
 * - Responsive design
 * - Accessibility support
 * 
 * @example
 * ```tsx
 * <LoginForm onLogin={handleSuccessfulLogin} />
 * ```
 */
export function LoginForm({ onLogin }: LoginFormProps) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username === "admin" && credentials.password === "admin") {
      toast.success("Login successful");
      onLogin();
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/20">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label 
                htmlFor="username"
                className="text-sm font-medium"
              >
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                required
                className="w-full transition-all focus-visible:ring-2 focus-visible:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label 
                htmlFor="password"
                className="text-sm font-medium"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                required
                className="w-full transition-all focus-visible:ring-2 focus-visible:ring-primary/20"
              />
            </div>
            <Button 
              type="submit"
              className="w-full"
            >
              Sign In
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-4">
              Use admin/admin to login
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 