"use client";

import { useState, useEffect } from "react";
import { CourseProvider } from "@/lib/context/course-context";
import { Dashboard } from "@/components/dashboard";
import { LoginForm } from "@/components/login-form";
import { LogoutButton } from "@/components/logout-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(sessionStatus === "true");
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <CourseProvider>
      <div className="container h-16 mx-auto mt-12 px-4 sm:px-6 lg:px-8 flex flex-row justify-between items-center gap-6">
        <Card className="h-full flex flex-1 justify-between items-center px-6 py-4">
          <h1 className="text-2xl text-center font-bold">Tech Academy</h1>
          <LogoutButton onLogout={handleLogout} />
        </Card>
        <Card className="h-full flex place-content-center px-6 py-4">
          <ThemeToggle />
        </Card>
      </div>
      <Dashboard />
    </CourseProvider>
  );
}
