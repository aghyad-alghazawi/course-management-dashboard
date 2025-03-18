"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

interface LogoutButtonProps {
  onLogout: () => void;
}

export function LogoutButton({ onLogout }: LogoutButtonProps) {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged out successfully");
    onLogout();
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleLogout}
      aria-label="Logout"
    >
      <LogOut className="h-5 w-5" />
    </Button>
  );
} 