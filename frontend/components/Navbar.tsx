"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { isAuthenticated, logoutUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // run only on client after mount
    const checkAuth = async () => {
      const auth = await isAuthenticated();
      setLoggedIn(auth);
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    logoutUser();
    setLoggedIn(false);
    router.push("/auth/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            🛡️
          </div>
          <div>
            <p className="font-serif text-lg font-bold">ScholarSync</p>
            <p className="text-xs text-gray-500">TRUST-AWARE DISCOVERY</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/discover" className="hover:text-blue-600">
            Discover
          </Link>
          <Link href="/statistics" className="hover:text-blue-600">
            Statistics
          </Link>

          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/auth/login" className="hover:text-blue-600">
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>

        {/* Mobile */}
        <button className="md:hidden p-2 rounded hover:bg-gray-100">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </header>
  );
}
