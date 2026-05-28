"use client";
import { useState } from "react";
import { Shield, Bed, Bath, Maximize, MapPin, Heart } from "lucide-react";
import type { Property } from "@/lib/types";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function PropertyCard({ property, isFavorited = false }: { property: Property; isFavorited?: boolean }) {
  const [fav, setFav] = useState(isFavorited);
  const [favLoading, setFavLoading] = useState(false);
  const { user } = useAuth();
  const image = property.images?.[0] || "";

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      window.location.href = "/auth";
      return;
    }
    setFavLoading(true);
    const supabase = createClient();
    if (fav) {
      await supabase.from("favorites").delete().eq("user_id", user.id).eq("property_id", property.id);
      setFav(false);
    } else {
      await supabase.from("favorites").insert({ user_id: user.id, property_id: property.id });
      setFav(true);
    }
    setFavLoading(false);
  };

  return (
    <Link href={`/property/${property.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
        <div className="relative aspect-[4/3] overflow-hidden">
          {image ? (
            <img src={image} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-text-secondary">No Image</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <div className="absolute top-3 left-3 flex gap-2">
            {property.verified && (
              <span className="flex items-center gap-1 px-2.5 py-1 bg-primary text-white text-xs font-semibold rounded-lg">
                <Shield className="w-3 h-3" /> Verified
              </span>
            )}
            {property.featured && (
              <span className="px-2.5 py-1 bg-accent text-white text-xs font-semibold rounded-lg">Featured</span>
            )}
          </div>

          <div className="absolute top-3 right-3">
            <button onClick={toggleFavorite} disabled={favLoading}
              className={`w-9 h-9 rounded-full backdrop-blur flex items-center justify-center hover:scale-110 transition-all ${fav ? "bg-red-500 text-white" : "bg-white/90 text-gray-600 hover:bg-white"}`}>
              <Heart className={`w-4 h-4 ${fav ? "fill-white" : ""}`} />
            </button>
          </div>

          <div className="absolute bottom-3 left-3">
            <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${property.listing_type === "buy" ? "bg-emerald-500 text-white" : "bg-blue-500 text-white"}`}>
              {property.listing_type === "buy" ? "For Sale" : "For Rent"}
            </span>
          </div>

          <div className="absolute bottom-3 right-3">
            <span className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur text-white text-sm font-bold">
              {property.price_label || `${property.currency} ${property.price.toLocaleString()}`}
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-1.5 text-text-secondary text-xs mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>{property.location}</span>
            <span className="ml-auto px-2 py-0.5 rounded bg-surface-alt text-[10px] font-semibold uppercase tracking-wider">
              {property.country === "Thailand" ? "🇹🇭 TH" : "🇻🇳 VN"}
            </span>
          </div>

          <h3 className="font-semibold text-text-primary text-sm leading-snug mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {property.title}
          </h3>

          <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
            {property.beds > 0 && (
              <div className="flex items-center gap-1.5 text-text-secondary text-xs">
                <Bed className="w-3.5 h-3.5" /><span>{property.beds} Beds</span>
              </div>
            )}
            {property.baths > 0 && (
              <div className="flex items-center gap-1.5 text-text-secondary text-xs">
                <Bath className="w-3.5 h-3.5" /><span>{property.baths} Baths</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-text-secondary text-xs">
              <Maximize className="w-3.5 h-3.5" /><span>{property.area} m²</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
