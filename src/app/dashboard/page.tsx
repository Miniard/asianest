"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import type { Property, Inquiry } from "@/lib/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import Link from "next/link";
import { Loader2, Home, Heart, MessageSquare, PlusCircle, User, Settings, Trash2, Eye, EyeOff } from "lucide-react";

type Tab = "properties" | "favorites" | "inquiries" | "profile";

export default function DashboardPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const [tab, setTab] = useState<Tab>("properties");
  const [myProperties, setMyProperties] = useState<Property[]>([]);
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileForm, setProfileForm] = useState({ full_name: "", phone: "", bio: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      fetchData();
      if (profile) {
        setProfileForm({
          full_name: profile.full_name || "",
          phone: profile.phone || "",
          bio: profile.bio || "",
        });
      }
    }
  }, [user, profile]);

  useEffect(() => {
    if (window.location.hash === "#favorites") setTab("favorites");
  }, []);

  const fetchData = async () => {
    const supabase = createClient();

    const [propsRes, favsRes, inqRes] = await Promise.all([
      supabase.from("properties").select("*").eq("owner_id", user!.id).order("created_at", { ascending: false }),
      supabase.from("favorites").select("property_id").eq("user_id", user!.id),
      supabase.from("inquiries").select("*").eq("user_id", user!.id).order("created_at", { ascending: false }),
    ]);

    setMyProperties(propsRes.data || []);
    setInquiries(inqRes.data || []);

    if (favsRes.data && favsRes.data.length > 0) {
      const ids = favsRes.data.map((f: { property_id: string }) => f.property_id);
      const { data: favProps } = await supabase.from("properties").select("*").in("id", ids);
      setFavorites(favProps || []);
    }

    setLoading(false);
  };

  const deleteProperty = async (id: string) => {
    const supabase = createClient();
    await supabase.from("properties").delete().eq("id", id);
    setMyProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const togglePropertyStatus = async (id: string, currentStatus: string) => {
    const supabase = createClient();
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    await supabase.from("properties").update({ status: newStatus }).eq("id", id);
    setMyProperties((prev) => prev.map((p) => p.id === id ? { ...p, status: newStatus as Property["status"] } : p));
  };

  const updateProfile = async () => {
    setSaving(true);
    const supabase = createClient();
    await supabase.from("profiles").update(profileForm).eq("id", user!.id);
    setSaving(false);
  };

  if (authLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Sign in Required</h1>
            <Link href="/auth" className="px-6 py-3 bg-primary text-white rounded-xl font-semibold">Sign In</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const tabs = [
    { id: "properties" as Tab, label: "My Properties", icon: Home, count: myProperties.length },
    { id: "favorites" as Tab, label: "Favorites", icon: Heart, count: favorites.length },
    { id: "inquiries" as Tab, label: "Inquiries", icon: MessageSquare, count: inquiries.length },
    { id: "profile" as Tab, label: "Profile", icon: User, count: null },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-20 lg:pt-24 pb-20 bg-surface min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-text-primary">Dashboard</h1>
              <p className="text-text-secondary text-sm">Welcome back, {profile?.full_name || user.email?.split("@")[0]}</p>
            </div>
            <Link href="/add-property" className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-light text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary/20">
              <PlusCircle className="w-4 h-4" /> Add Property
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-white rounded-xl border border-gray-100 mb-8 overflow-x-auto">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${tab === t.id ? "bg-primary text-white shadow-sm" : "text-text-secondary hover:text-primary"}`}>
                <t.icon className="w-4 h-4" />
                {t.label}
                {t.count !== null && (
                  <span className={`px-1.5 py-0.5 text-xs rounded-md ${tab === t.id ? "bg-white/20" : "bg-surface-alt"}`}>{t.count}</span>
                )}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : (
            <>
              {/* My Properties */}
              {tab === "properties" && (
                myProperties.length > 0 ? (
                  <div className="space-y-4">
                    {myProperties.map((p) => (
                      <div key={p.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden shrink-0">
                          {p.images?.[0] ? (
                            <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-text-secondary text-sm">No Image</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-text-primary truncate">{p.title}</h3>
                              <p className="text-sm text-text-secondary">{p.location}</p>
                            </div>
                            <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                              p.status === "active" ? "bg-green-100 text-green-700" :
                              p.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                              "bg-gray-100 text-gray-600"
                            }`}>{p.status}</span>
                          </div>
                          <p className="text-lg font-bold text-primary mt-2">{p.price_label}</p>
                          <div className="flex items-center gap-3 mt-3">
                            <span className="text-xs text-text-secondary">{p.views || 0} views</span>
                            <button onClick={() => togglePropertyStatus(p.id, p.status)}
                              className="flex items-center gap-1 text-xs text-text-secondary hover:text-primary">
                              {p.status === "active" ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              {p.status === "active" ? "Deactivate" : "Activate"}
                            </button>
                            <button onClick={() => deleteProperty(p.id)}
                              className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700">
                              <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                    <Home className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-text-secondary mb-4">You haven't listed any properties yet.</p>
                    <Link href="/add-property" className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-medium">Add Your First Property</Link>
                  </div>
                )
              )}

              {/* Favorites */}
              {tab === "favorites" && (
                favorites.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((p) => (
                      <PropertyCard key={p.id} property={p} isFavorited={true} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                    <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-text-secondary mb-4">No favorites yet. Browse properties and save your favorites!</p>
                    <Link href="/#properties" className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-medium">Browse Properties</Link>
                  </div>
                )
              )}

              {/* Inquiries */}
              {tab === "inquiries" && (
                inquiries.length > 0 ? (
                  <div className="space-y-4">
                    {inquiries.map((inq) => (
                      <div key={inq.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                            inq.status === "new" ? "bg-blue-100 text-blue-700" :
                            inq.status === "contacted" ? "bg-yellow-100 text-yellow-700" :
                            "bg-green-100 text-green-700"
                          }`}>{inq.status}</span>
                          <span className="text-xs text-text-secondary">{new Date(inq.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-text-primary font-medium">{inq.inquiry_type}</p>
                        {inq.message && <p className="text-sm text-text-secondary mt-1">{inq.message}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                    <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-text-secondary">No inquiries yet.</p>
                  </div>
                )
              )}

              {/* Profile */}
              {tab === "profile" && (
                <div className="max-w-lg bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                  <h2 className="text-lg font-bold text-text-primary">Edit Profile</h2>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Full Name</label>
                    <input type="text" value={profileForm.full_name}
                      onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                      className="w-full px-4 py-3 bg-surface rounded-xl border border-gray-200 text-sm outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Phone</label>
                    <input type="tel" value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-surface rounded-xl border border-gray-200 text-sm outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Bio</label>
                    <textarea value={profileForm.bio} rows={3}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                      className="w-full px-4 py-3 bg-surface rounded-xl border border-gray-200 text-sm outline-none focus:border-primary resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Email</label>
                    <input type="email" value={user.email || ""} disabled
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm text-text-secondary" />
                  </div>
                  <button onClick={updateProfile} disabled={saving}
                    className="px-6 py-3 bg-primary hover:bg-primary-light disabled:opacity-50 text-white font-semibold rounded-xl transition-all">
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
