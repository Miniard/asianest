"use client";
import { use, useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import type { Property, Profile } from "@/lib/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  ArrowLeft, Shield, Bed, Bath, Maximize, MapPin, Heart, Share2, Phone,
  Mail, MessageCircle, CheckCircle2, Star, ChevronLeft, ChevronRight, Calendar, FileCheck, Users, Loader2
} from "lucide-react";

export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [owner, setOwner] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImg, setCurrentImg] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [fav, setFav] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryLoading, setInquiryLoading] = useState(false);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  useEffect(() => {
    if (user && property) checkFavorite();
  }, [user, property]);

  const fetchProperty = async () => {
    const supabase = createClient();

    // Increment views
    try { await supabase.rpc("increment_views", { prop_id: id }); } catch {}

    const { data } = await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .single();

    if (data) {
      setProperty(data);
      if (data.owner_id) {
        const { data: ownerData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.owner_id)
          .single();
        if (ownerData) setOwner(ownerData);
      }
    }
    setLoading(false);
  };

  const checkFavorite = async () => {
    if (!user || !property) return;
    const supabase = createClient();
    const { data } = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", user.id)
      .eq("property_id", property.id)
      .maybeSingle();
    setFav(!!data);
  };

  const toggleFavorite = async () => {
    if (!user) { window.location.href = "/auth"; return; }
    if (!property) return;
    const supabase = createClient();
    if (fav) {
      await supabase.from("favorites").delete().eq("user_id", user.id).eq("property_id", property.id);
      setFav(false);
    } else {
      await supabase.from("favorites").insert({ user_id: user.id, property_id: property.id });
      setFav(true);
    }
  };

  const handleInquiry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInquiryLoading(true);
    const form = new FormData(e.currentTarget);
    const supabase = createClient();
    await supabase.from("inquiries").insert({
      property_id: property?.id,
      user_id: user?.id || null,
      first_name: form.get("name") as string,
      last_name: "",
      email: form.get("email") as string,
      phone: form.get("phone") as string,
      inquiry_type: "property_inquiry",
      message: `Inquiry about: ${property?.title}`,
    });
    setInquirySent(true);
    setInquiryLoading(false);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </>
    );
  }

  if (!property) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
            <Link href="/" className="text-primary hover:underline">Back to listings</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const images = property.images || [];

  return (
    <>
      <Navbar />
      <main className="pt-20 lg:pt-24 pb-20 bg-surface min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/#properties" className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to listings
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-gray-100">
                {images.length > 0 ? (
                  <img src={images[currentImg]} alt={property.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-secondary">No Images</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {images.length > 1 && (
                  <>
                    <button onClick={() => setCurrentImg((prev) => (prev - 1 + images.length) % images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={() => setCurrentImg((prev) => (prev + 1) % images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                <div className="absolute top-4 left-4 flex gap-2">
                  {property.verified && (
                    <span className="flex items-center gap-1 px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg">
                      <Shield className="w-3.5 h-3.5" /> Verified
                    </span>
                  )}
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase ${property.listing_type === "buy" ? "bg-emerald-500 text-white" : "bg-blue-500 text-white"}`}>
                    {property.listing_type === "buy" ? "For Sale" : "For Rent"}
                  </span>
                </div>

                <div className="absolute top-4 right-4 flex gap-2">
                  <button onClick={toggleFavorite}
                    className={`w-10 h-10 rounded-full backdrop-blur flex items-center justify-center hover:scale-110 transition-all ${fav ? "bg-red-500 text-white" : "bg-white/90 text-gray-600"}`}>
                    <Heart className={`w-5 h-5 ${fav ? "fill-white" : ""}`} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, i) => (
                      <button key={i} onClick={() => setCurrentImg(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentImg ? "bg-white w-6" : "bg-white/50"}`} />
                    ))}
                  </div>
                )}
              </div>

              {/* Property Info */}
              <div className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-text-secondary text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{property.location}</span>
                      <span className="px-2 py-0.5 rounded bg-surface-alt text-xs font-semibold">
                        {property.country === "Thailand" ? "🇹🇭 Thailand" : "🇻🇳 Vietnam"}
                      </span>
                    </div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-text-primary">{property.title}</h1>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-2xl lg:text-3xl font-black text-primary">
                      {property.price_label || `${property.currency} ${property.price.toLocaleString()}`}
                    </p>
                    <p className="text-xs text-text-secondary">{property.type} · {property.listing_type === "buy" ? "For Sale" : "For Rent"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 py-4 border-y border-gray-100 mb-6">
                  {property.beds > 0 && (
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Bed className="w-5 h-5" />
                      <span className="text-sm"><strong className="text-text-primary">{property.beds}</strong> Bedrooms</span>
                    </div>
                  )}
                  {property.baths > 0 && (
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Bath className="w-5 h-5" />
                      <span className="text-sm"><strong className="text-text-primary">{property.baths}</strong> Bathrooms</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Maximize className="w-5 h-5" />
                    <span className="text-sm"><strong className="text-text-primary">{property.area}</strong> m²</span>
                  </div>
                  <div className="ml-auto text-xs text-text-secondary">{property.views || 0} views</div>
                </div>

                <h2 className="text-lg font-bold text-text-primary mb-3">Description</h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-8">{property.description}</p>

                <h2 className="text-lg font-bold text-text-primary mb-4">Amenities & Features</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                  {(property.amenities || []).map((a) => (
                    <div key={a} className="flex items-center gap-2 px-3 py-2.5 bg-surface rounded-xl">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm text-text-primary">{a}</span>
                    </div>
                  ))}
                </div>

                {property.verified && (
                  <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="w-6 h-6 text-emerald-600" />
                      <h3 className="text-base font-bold text-emerald-900">AsiaNest Verified</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { icon: FileCheck, label: "Title deed verified" },
                        { icon: Calendar, label: "Inspected on-site" },
                        { icon: Users, label: "Owner identity confirmed" },
                      ].map((v) => (
                        <div key={v.label} className="flex items-center gap-2">
                          <v.icon className="w-4 h-4 text-emerald-600" />
                          <span className="text-xs text-emerald-800">{v.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
                {owner && (
                  <>
                    <h3 className="text-base font-bold text-text-primary mb-4">Listed by</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center text-lg font-bold">
                        {owner.full_name?.charAt(0)?.toUpperCase() || "A"}
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary flex items-center gap-1.5">
                          {owner.full_name || "Agent"}
                          {owner.verified && <Shield className="w-4 h-4 text-primary" />}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-text-secondary">
                          <span className="flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-accent text-accent" /> {owner.rating || "N/A"}
                          </span>
                          <span>·</span>
                          <span>{owner.deals_closed || 0} deals</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-3 mb-6">
                  <button onClick={() => setShowContact(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary-light text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary/20">
                    <Phone className="w-4 h-4" /> Request a Call
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-primary/20 text-primary font-semibold rounded-xl hover:bg-primary/5 transition-all">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 text-text-secondary font-medium rounded-xl hover:bg-surface-alt transition-all">
                    <Mail className="w-4 h-4" /> Email Agent
                  </button>
                </div>

                {showContact && !inquirySent && (
                  <div className="p-4 bg-surface rounded-xl border border-gray-100">
                    <p className="text-xs text-text-secondary mb-3">Fill in your details and we will get back to you within 1 hour.</p>
                    <form onSubmit={handleInquiry} className="space-y-3">
                      <input name="name" type="text" placeholder="Your name" required className="w-full px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm outline-none focus:border-primary" />
                      <input name="phone" type="tel" placeholder="Phone number" className="w-full px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm outline-none focus:border-primary" />
                      <input name="email" type="email" placeholder="Email" required className="w-full px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm outline-none focus:border-primary" />
                      <button type="submit" disabled={inquiryLoading}
                        className="w-full py-2.5 bg-accent hover:bg-accent-dark disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-all">
                        {inquiryLoading ? "Sending..." : "Submit Request"}
                      </button>
                    </form>
                  </div>
                )}

                {inquirySent && (
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-center">
                    <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-green-800">Inquiry sent!</p>
                    <p className="text-xs text-green-600">We'll contact you within 1 hour.</p>
                  </div>
                )}

                <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <p className="text-xs text-amber-800 leading-relaxed">
                    <strong>Safety Tip:</strong> Never transfer money directly to a seller. All transactions should go through AsiaNest's escrow service for your protection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
