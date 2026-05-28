"use client";
import { useState } from "react";
import { Search, MapPin, Home, DollarSign, ChevronDown, Shield, Star, TrendingUp } from "lucide-react";

export default function Hero() {
  const [tab, setTab] = useState<"buy" | "rent">("buy");

  return (
    <section className="relative min-h-[92vh] flex items-center gradient-hero overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 border border-white/30 rounded-full" />
        <div className="absolute bottom-20 right-10 w-96 h-96 border border-white/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-8 animate-fade-in-up">
            <Shield className="w-4 h-4 text-accent" />
            <span>Verified & Scam-Free Properties</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6 animate-fade-in-up animate-delay-100">
            Your Trusted Home
            <br />
            <span className="text-accent">in Southeast Asia</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 max-w-xl mb-10 leading-relaxed animate-fade-in-up animate-delay-200">
            Buy, rent, or invest in verified properties across Thailand and Vietnam. We act as your trusted middleman — every listing is verified, every transaction is secure.
          </p>

          {/* Search Card */}
          <div className="glass-card rounded-2xl p-2 max-w-2xl animate-fade-in-up animate-delay-300">
            <div className="flex gap-1 mb-2 p-1 bg-gray-100 rounded-xl">
              <button
                onClick={() => setTab("buy")}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${tab === "buy" ? "bg-white text-primary shadow-sm" : "text-text-secondary hover:text-primary"}`}
              >
                Buy
              </button>
              <button
                onClick={() => setTab("rent")}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${tab === "rent" ? "bg-white text-primary shadow-sm" : "text-text-secondary hover:text-primary"}`}
              >
                Rent
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 p-2">
              <div className="flex items-center gap-2 flex-1 px-4 py-3 bg-white rounded-xl border border-gray-100">
                <MapPin className="w-4 h-4 text-text-secondary shrink-0" />
                <select className="w-full bg-transparent text-sm text-text-primary outline-none appearance-none cursor-pointer">
                  <option>All Locations</option>
                  <option>Bangkok, Thailand</option>
                  <option>Phuket, Thailand</option>
                  <option>Chiang Mai, Thailand</option>
                  <option>Koh Samui, Thailand</option>
                  <option>Pattaya, Thailand</option>
                  <option>Ho Chi Minh City, Vietnam</option>
                  <option>Hanoi, Vietnam</option>
                  <option>Da Nang, Vietnam</option>
                  <option>Hoi An, Vietnam</option>
                </select>
                <ChevronDown className="w-4 h-4 text-text-secondary shrink-0" />
              </div>

              <div className="flex items-center gap-2 flex-1 px-4 py-3 bg-white rounded-xl border border-gray-100">
                <Home className="w-4 h-4 text-text-secondary shrink-0" />
                <select className="w-full bg-transparent text-sm text-text-primary outline-none appearance-none cursor-pointer">
                  <option>All Types</option>
                  <option>Villa</option>
                  <option>Apartment</option>
                  <option>Condo</option>
                  <option>House</option>
                  <option>Penthouse</option>
                  <option>Land</option>
                </select>
                <ChevronDown className="w-4 h-4 text-text-secondary shrink-0" />
              </div>

              <button className="flex items-center justify-center gap-2 px-8 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl transition-all shadow-lg shadow-accent/30">
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-8 sm:gap-12 mt-14 animate-fade-in-up animate-delay-400">
          {[
            { icon: Shield, label: "Verified Properties", value: "2,400+" },
            { icon: Star, label: "Satisfied Clients", value: "8,500+" },
            { icon: TrendingUp, label: "Successful Deals", value: "$120M+" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">{stat.value}</p>
                <p className="text-white/50 text-xs">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
