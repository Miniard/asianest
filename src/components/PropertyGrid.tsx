"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import type { Property } from "@/lib/types";
import PropertyCard from "./PropertyCard";

type Filter = "all" | "buy" | "rent";
type Country = "all" | "Thailand" | "Vietnam";
type PropertyType = "all" | "Villa" | "Apartment" | "Condo" | "House" | "Penthouse" | "Land";

export default function PropertyGrid() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [country, setCountry] = useState<Country>("all");
  const [propType, setPropType] = useState<PropertyType>("all");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("status", "active")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (data) setProperties(data);
    setLoading(false);
  };

  const filtered = properties.filter((p) => {
    if (filter !== "all" && p.listing_type !== filter) return false;
    if (country !== "all" && p.country !== country) return false;
    if (propType !== "all" && p.type !== propType) return false;
    return true;
  });

  return (
    <section id="properties" className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">Browse Properties</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">Explore Verified Listings</h2>
          <p className="text-text-secondary max-w-lg mx-auto">Every property on AsiaNest is personally verified by our local team. No scams, no surprises.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <div className="flex gap-1 p-1 bg-white rounded-xl border border-gray-100">
            {(["all", "buy", "rent"] as Filter[]).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${filter === f ? "bg-primary text-white shadow-sm" : "text-text-secondary hover:text-primary"}`}>
                {f === "all" ? "All" : f === "buy" ? "For Sale" : "For Rent"}
              </button>
            ))}
          </div>

          <div className="flex gap-1 p-1 bg-white rounded-xl border border-gray-100">
            {(["all", "Thailand", "Vietnam"] as Country[]).map((c) => (
              <button key={c} onClick={() => setCountry(c)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${country === c ? "bg-primary text-white shadow-sm" : "text-text-secondary hover:text-primary"}`}>
                {c === "all" ? "All Countries" : c === "Thailand" ? "🇹🇭 Thailand" : "🇻🇳 Vietnam"}
              </button>
            ))}
          </div>

          <select value={propType} onChange={(e) => setPropType(e.target.value as PropertyType)}
            className="px-4 py-2.5 text-sm bg-white rounded-xl border border-gray-100 text-text-secondary outline-none cursor-pointer">
            <option value="all">All Types</option>
            <option value="Villa">Villa</option>
            <option value="Apartment">Apartment</option>
            <option value="Condo">Condo</option>
            <option value="House">House</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Land">Land</option>
          </select>

          <span className="ml-auto text-sm text-text-secondary">{filtered.length} properties found</span>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                <div className="aspect-[4/3] bg-gray-100 animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-gray-100 rounded animate-pulse w-2/3" />
                  <div className="h-4 bg-gray-100 rounded animate-pulse" />
                  <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-text-secondary text-lg">No properties match your filters.</p>
            <button onClick={() => { setFilter("all"); setCountry("all"); setPropType("all"); }} className="mt-4 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-medium">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
