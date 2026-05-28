export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: "user" | "agent" | "admin";
  verified: boolean;
  rating: number;
  deals_closed: number;
  bio: string | null;
  languages: string[];
  created_at: string;
}

export interface Property {
  id: string;
  owner_id: string | null;
  title: string;
  description: string | null;
  location: string;
  country: "Thailand" | "Vietnam";
  city: string;
  type: "Villa" | "Apartment" | "Condo" | "House" | "Penthouse" | "Land";
  listing_type: "buy" | "rent";
  price: number;
  currency: string;
  price_label: string | null;
  beds: number;
  baths: number;
  area: number;
  images: string[];
  amenities: string[];
  verified: boolean;
  featured: boolean;
  status: "pending" | "active" | "sold" | "rented" | "inactive";
  views: number;
  created_at: string;
  updated_at: string;
  // Joined
  owner?: Profile;
}

export interface Favorite {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
}

export interface Inquiry {
  id: string;
  property_id: string | null;
  user_id: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  inquiry_type: string;
  message: string | null;
  status: "new" | "contacted" | "resolved";
  created_at: string;
}
