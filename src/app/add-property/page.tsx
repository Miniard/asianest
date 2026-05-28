"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Upload, Plus, X, Loader2 } from "lucide-react";

const AMENITY_OPTIONS = [
  "Pool", "Gym", "Garden", "Parking", "Security", "Furnished", "Air Conditioning",
  "Balcony", "Sea View", "Mountain View", "City View", "Beach Access", "Smart Home",
  "Elevator", "Concierge", "Spa", "Tennis Court", "BBQ Area", "Pet Friendly",
  "Laundry", "Storage", "Maid Quarter", "Home Theater", "Wine Cellar",
];

export default function AddPropertyPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([""]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

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
            <p className="text-text-secondary mb-4">You need to be signed in to list a property.</p>
            <Link href="/auth" className="px-6 py-3 bg-primary text-white rounded-xl font-semibold">Sign In</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const price = parseInt(form.get("price") as string);
    const country = form.get("country") as string;
    const listingType = form.get("listing_type") as string;
    const currency = country === "Thailand" ? "THB" : "VND";

    let priceLabel = "";
    if (country === "Thailand") {
      priceLabel = `฿${price.toLocaleString()}${listingType === "rent" ? "/mo" : ""}`;
    } else {
      if (price >= 1000000000) {
        priceLabel = `₫${(price / 1000000000).toFixed(1)}B${listingType === "rent" ? "/mo" : ""}`;
      } else if (price >= 1000000) {
        priceLabel = `₫${(price / 1000000).toFixed(0)}M${listingType === "rent" ? "/mo" : ""}`;
      } else {
        priceLabel = `₫${price.toLocaleString()}${listingType === "rent" ? "/mo" : ""}`;
      }
    }

    const images = imageUrls.filter((url) => url.trim() !== "");

    const supabase = createClient();
    const { error: insertError } = await supabase.from("properties").insert({
      owner_id: user.id,
      title: form.get("title"),
      description: form.get("description"),
      location: form.get("location"),
      country,
      city: form.get("city"),
      type: form.get("type"),
      listing_type: listingType,
      price,
      currency,
      price_label: priceLabel,
      beds: parseInt(form.get("beds") as string) || 0,
      baths: parseInt(form.get("baths") as string) || 0,
      area: parseInt(form.get("area") as string),
      images,
      amenities: selectedAmenities,
      status: "pending",
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 lg:pt-24 pb-20 bg-surface min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>

          <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">List Your Property</h1>
          <p className="text-text-secondary mb-8">Fill in the details below. Our team will verify your property within 48 hours before it goes live.</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-4">
              <h2 className="text-lg font-bold text-text-primary">Basic Information</h2>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">Property Title *</label>
                <input name="title" type="text" required placeholder="e.g. Luxury Beachfront Villa with Pool"
                  className="w-full px-4 py-3 bg-surface rounded-xl border border-gray-200 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">Description *</label>
                <textarea name="description" required rows={4} placeholder="Describe your property in detail..."
                  className="w-full px-4 py-3 bg-surface rounded-xl border border-gray-200 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Country *</label>
                  <select name="country" required className="w-full px-4 py-3 bg-surface rounded-xl border border-gray-200 text-sm outline-none focus:border-primary">
                    <option value="Thailand">🇹🇭 Thailand</option>
                    <option value="Vietnam">🇻🇳 Vietnam</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">City *</label>
                  <input name="city" type="text" required placeholder="e.g. Bangkok"
                    className="w-full px-4 py-3 bg-surface rounded-xl border border-gray-200 text-sm outline-none focus:border-primary" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">Full Address / Location *</label>
                <input name="location" type="text" required placeholder="e.g. Sukhumvit Soi 24, Bangkok"
                  className="w-full px-4 py-3 bg-surface rounded-xl border border-gray-200 text-sm outline-none focus:border-primary" />
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-4">
              <h2 className="text-lg font-bold text-text-primary">Property Details</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Type *</label>
                  <select name="type" required className="w-full px-4 py-3 bg-surface rounded-xl border border-gray-200 text-sm outline-none focus:border-primary">
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Condo">Condo</option>
                    <option value="House">House</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Land">Land</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Listing Type *</label>
                  <select name="listing_type" required className="w-full px-4 py-3 bg-surface rounded-xl border border-gray-200 text-sm outline-none focus:border-primary">
                    <option value="buy">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Price *</label>
                  <input name="price" type="number" required min="0" placeholder="12500000"
                    className="w-full px-4 py-3 bg-surface rounded-xl border border-gray-200 text-sm outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Bedrooms</label>
                  <input name="beds" type="number" min="0" defaultValue="0"
                    className="w-full px-4 py-3 bg-surface rounded-xl border border-gray-200 text-sm outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Bathrooms</label>
                  <input name="baths" type="number" min="0" defaultValue="0"
                    className="w-full px-4 py-3 bg-surface rounded-xl border border-gray-200 text-sm outline-none focus:border-primary" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">Area (m²) *</label>
                <input name="area" type="number" required min="1" placeholder="120"
                  className="w-full px-4 py-3 bg-surface rounded-xl border border-gray-200 text-sm outline-none focus:border-primary" />
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-4">
              <h2 className="text-lg font-bold text-text-primary">Images</h2>
              <p className="text-xs text-text-secondary">Add image URLs for your property photos.</p>

              {imageUrls.map((url, i) => (
                <div key={i} className="flex gap-2">
                  <input type="url" value={url} onChange={(e) => {
                    const newUrls = [...imageUrls];
                    newUrls[i] = e.target.value;
                    setImageUrls(newUrls);
                  }} placeholder="https://..." className="flex-1 px-4 py-3 bg-surface rounded-xl border border-gray-200 text-sm outline-none focus:border-primary" />
                  {imageUrls.length > 1 && (
                    <button type="button" onClick={() => setImageUrls(imageUrls.filter((_, j) => j !== i))}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-xl"><X className="w-4 h-4" /></button>
                  )}
                </div>
              ))}

              <button type="button" onClick={() => setImageUrls([...imageUrls, ""])}
                className="flex items-center gap-2 text-sm text-primary font-medium hover:underline">
                <Plus className="w-4 h-4" /> Add another image
              </button>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-4">
              <h2 className="text-lg font-bold text-text-primary">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {AMENITY_OPTIONS.map((a) => (
                  <button key={a} type="button" onClick={() => {
                    setSelectedAmenities((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);
                  }}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${selectedAmenities.includes(a) ? "bg-primary text-white" : "bg-surface text-text-secondary hover:bg-primary/10 hover:text-primary"}`}>
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/" className="px-6 py-3.5 border border-gray-200 text-text-secondary font-medium rounded-xl hover:bg-surface-alt transition-all">Cancel</Link>
              <button type="submit" disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-light disabled:opacity-50 text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary/20">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {loading ? "Submitting..." : "Submit for Review"}
              </button>
            </div>

            <p className="text-xs text-text-secondary text-center">
              Your listing will be reviewed and verified by our team within 48 hours before going live.
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
