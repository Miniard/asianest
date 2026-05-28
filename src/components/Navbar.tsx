"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Shield, Globe, User, LogOut, Heart, PlusCircle, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const { user, profile, loading, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-primary tracking-tight">AsiaNest</span>
              <span className="hidden sm:block text-[10px] text-text-secondary -mt-1 tracking-wide uppercase">Trusted Real Estate</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <Link href="/#properties" className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary rounded-lg hover:bg-surface-alt transition-all">Properties</Link>
            <Link href="/#how-it-works" className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary rounded-lg hover:bg-surface-alt transition-all">How It Works</Link>
            <Link href="/#trust" className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary rounded-lg hover:bg-surface-alt transition-all">Trust & Safety</Link>
            <Link href="/#contact" className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary rounded-lg hover:bg-surface-alt transition-all">Contact</Link>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {loading ? (
              <div className="w-20 h-10 bg-surface-alt rounded-xl animate-pulse" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-surface-alt transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                    {profile?.full_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span className="text-sm font-medium text-text-primary max-w-[120px] truncate">
                    {profile?.full_name || user.email?.split("@")[0]}
                  </span>
                </button>

                {userMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    <Link href="/dashboard" onClick={() => setUserMenu(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-secondary hover:bg-surface-alt hover:text-primary transition-all">
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link href="/dashboard#favorites" onClick={() => setUserMenu(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-secondary hover:bg-surface-alt hover:text-primary transition-all">
                      <Heart className="w-4 h-4" /> My Favorites
                    </Link>
                    <Link href="/add-property" onClick={() => setUserMenu(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-secondary hover:bg-surface-alt hover:text-primary transition-all">
                      <PlusCircle className="w-4 h-4" /> Add Property
                    </Link>
                    <div className="border-t border-gray-100 my-1" />
                    <button onClick={() => { signOut(); setUserMenu(false); }} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-all w-full text-left">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth" className="px-5 py-2.5 text-sm font-medium text-primary border border-primary/20 rounded-xl hover:bg-primary/5 transition-all">Sign In</Link>
                <Link href="/add-property" className="px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-primary-light transition-all shadow-lg shadow-primary/20">List Property</Link>
              </>
            )}
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg hover:bg-surface-alt">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            <Link href="/#properties" onClick={() => setOpen(false)} className="block px-4 py-3 text-sm font-medium rounded-lg hover:bg-surface-alt">Properties</Link>
            <Link href="/#how-it-works" onClick={() => setOpen(false)} className="block px-4 py-3 text-sm font-medium rounded-lg hover:bg-surface-alt">How It Works</Link>
            <Link href="/#trust" onClick={() => setOpen(false)} className="block px-4 py-3 text-sm font-medium rounded-lg hover:bg-surface-alt">Trust & Safety</Link>
            <Link href="/#contact" onClick={() => setOpen(false)} className="block px-4 py-3 text-sm font-medium rounded-lg hover:bg-surface-alt">Contact</Link>
            {user && (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="block px-4 py-3 text-sm font-medium rounded-lg hover:bg-surface-alt">Dashboard</Link>
                <Link href="/add-property" onClick={() => setOpen(false)} className="block px-4 py-3 text-sm font-medium rounded-lg hover:bg-surface-alt">Add Property</Link>
              </>
            )}
            <div className="pt-3 border-t border-gray-100 flex gap-2">
              {user ? (
                <button onClick={() => { signOut(); setOpen(false); }} className="flex-1 py-2.5 text-sm font-medium text-red-600 border border-red-200 rounded-xl">Sign Out</button>
              ) : (
                <>
                  <Link href="/auth" onClick={() => setOpen(false)} className="flex-1 py-2.5 text-sm font-medium text-primary border border-primary/20 rounded-xl text-center">Sign In</Link>
                  <Link href="/add-property" onClick={() => setOpen(false)} className="flex-1 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl text-center">List Property</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
