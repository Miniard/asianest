export interface Property {
  id: string;
  title: string;
  location: string;
  country: "Thailand" | "Vietnam";
  city: string;
  type: "Villa" | "Apartment" | "Condo" | "House" | "Penthouse" | "Land";
  listingType: "buy" | "rent";
  price: number;
  currency: string;
  priceLabel: string;
  beds: number;
  baths: number;
  area: number;
  image: string;
  images: string[];
  verified: boolean;
  featured: boolean;
  description: string;
  amenities: string[];
  agent: {
    name: string;
    avatar: string;
    verified: boolean;
    rating: number;
    deals: number;
  };
}

export const properties: Property[] = [
  {
    id: "th-001",
    title: "Luxury Beachfront Villa with Infinity Pool",
    location: "Koh Samui, Surat Thani",
    country: "Thailand",
    city: "Koh Samui",
    type: "Villa",
    listingType: "buy",
    price: 12500000,
    currency: "THB",
    priceLabel: "฿12,500,000",
    beds: 4,
    baths: 5,
    area: 450,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
    ],
    verified: true,
    featured: true,
    description: "Stunning beachfront villa with panoramic ocean views, private infinity pool, and direct beach access. Fully furnished with premium materials throughout. Perfect for luxury living or high-yield vacation rental investment.",
    amenities: ["Infinity Pool", "Ocean View", "Beach Access", "Smart Home", "Private Garden", "Gym", "Wine Cellar"],
    agent: { name: "Somporn Kittisak", avatar: "SK", verified: true, rating: 4.9, deals: 127 }
  },
  {
    id: "th-002",
    title: "Modern Condo in Sukhumvit with Sky Garden",
    location: "Sukhumvit Soi 24, Bangkok",
    country: "Thailand",
    city: "Bangkok",
    type: "Condo",
    listingType: "rent",
    price: 45000,
    currency: "THB",
    priceLabel: "฿45,000/mo",
    beds: 2,
    baths: 2,
    area: 85,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
    ],
    verified: true,
    featured: true,
    description: "Beautifully designed 2-bedroom condo in the heart of Sukhumvit. Walking distance to BTS Phrom Phong. Building features rooftop sky garden, co-working space, and 24/7 security.",
    amenities: ["Sky Garden", "Co-working Space", "24/7 Security", "BTS Nearby", "Fitness Center", "Pool"],
    agent: { name: "Nattaya Prem", avatar: "NP", verified: true, rating: 4.8, deals: 89 }
  },
  {
    id: "vn-001",
    title: "Heritage Penthouse with Saigon River Views",
    location: "District 1, Ho Chi Minh City",
    country: "Vietnam",
    city: "Ho Chi Minh City",
    type: "Penthouse",
    listingType: "buy",
    price: 8500000000,
    currency: "VND",
    priceLabel: "₫8.5B",
    beds: 3,
    baths: 3,
    area: 220,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80"
    ],
    verified: true,
    featured: true,
    description: "Exclusive penthouse in the most prestigious building of District 1. 360° views of the Saigon River and city skyline. Premium Italian marble finishes and Bulthaup kitchen. Includes 2 parking spots.",
    amenities: ["River View", "Rooftop Terrace", "Private Elevator", "Concierge", "Wine Room", "Spa"],
    agent: { name: "Nguyen Minh Duc", avatar: "ND", verified: true, rating: 4.9, deals: 203 }
  },
  {
    id: "vn-002",
    title: "Charming French Colonial Apartment in Old Quarter",
    location: "Hoan Kiem, Hanoi",
    country: "Vietnam",
    city: "Hanoi",
    type: "Apartment",
    listingType: "rent",
    price: 18000000,
    currency: "VND",
    priceLabel: "₫18M/mo",
    beds: 2,
    baths: 1,
    area: 95,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80"
    ],
    verified: true,
    featured: false,
    description: "Beautifully restored French colonial apartment with original hardwood floors and high ceilings. Located steps from Hoan Kiem Lake. Perfect blend of heritage charm and modern comfort.",
    amenities: ["Lake View", "Heritage Building", "Furnished", "Balcony", "Air Conditioning"],
    agent: { name: "Tran Thi Mai", avatar: "TM", verified: true, rating: 4.7, deals: 64 }
  },
  {
    id: "th-003",
    title: "Tropical Pool Villa in Chiang Mai Hills",
    location: "Hang Dong, Chiang Mai",
    country: "Thailand",
    city: "Chiang Mai",
    type: "Villa",
    listingType: "buy",
    price: 8900000,
    currency: "THB",
    priceLabel: "฿8,900,000",
    beds: 3,
    baths: 3,
    area: 280,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
    ],
    verified: true,
    featured: false,
    description: "Serene hillside villa surrounded by lush tropical gardens. Features a private salt water pool, outdoor sala, and mountain views. Ideal retreat for digital nomads or retirees.",
    amenities: ["Private Pool", "Mountain View", "Garden", "Outdoor Sala", "Parking", "Maid Quarter"],
    agent: { name: "Krit Wattana", avatar: "KW", verified: true, rating: 4.6, deals: 52 }
  },
  {
    id: "vn-003",
    title: "Oceanfront Resort Villa in Da Nang",
    location: "My Khe Beach, Da Nang",
    country: "Vietnam",
    city: "Da Nang",
    type: "Villa",
    listingType: "buy",
    price: 15000000000,
    currency: "VND",
    priceLabel: "₫15B",
    beds: 5,
    baths: 6,
    area: 520,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
    ],
    verified: true,
    featured: true,
    description: "Magnificent oceanfront villa on the famous My Khe Beach. Resort-style living with private pool, tropical garden, and direct beach access. Excellent rental income potential.",
    amenities: ["Beachfront", "Private Pool", "Tropical Garden", "Home Theater", "Staff Quarters", "Garage"],
    agent: { name: "Le Van Thanh", avatar: "LT", verified: true, rating: 4.8, deals: 91 }
  },
  {
    id: "th-004",
    title: "Luxury Penthouse at The Ritz-Carlton Residences",
    location: "Mahanakhon, Bangkok",
    country: "Thailand",
    city: "Bangkok",
    type: "Penthouse",
    listingType: "buy",
    price: 95000000,
    currency: "THB",
    priceLabel: "฿95,000,000",
    beds: 4,
    baths: 5,
    area: 380,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
    ],
    verified: true,
    featured: true,
    description: "Ultra-luxury penthouse at one of Bangkok's most iconic addresses. Floor-to-ceiling windows with unobstructed city views. Ritz-Carlton hotel services including butler, spa, and fine dining.",
    amenities: ["City View", "Butler Service", "Spa Access", "Fine Dining", "Private Elevator", "Valet Parking"],
    agent: { name: "Somporn Kittisak", avatar: "SK", verified: true, rating: 4.9, deals: 127 }
  },
  {
    id: "vn-004",
    title: "Modern Studio in Thao Dien Expat Area",
    location: "Thao Dien, District 2, HCMC",
    country: "Vietnam",
    city: "Ho Chi Minh City",
    type: "Apartment",
    listingType: "rent",
    price: 12000000,
    currency: "VND",
    priceLabel: "₫12M/mo",
    beds: 1,
    baths: 1,
    area: 48,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
    ],
    verified: true,
    featured: false,
    description: "Stylish fully-furnished studio in the heart of Thao Dien, the most popular expat neighborhood. Walking distance to international restaurants, cafes, and the riverside promenade.",
    amenities: ["Fully Furnished", "Pool", "Gym", "Security", "Near Restaurants", "Laundry"],
    agent: { name: "Nguyen Minh Duc", avatar: "ND", verified: true, rating: 4.9, deals: 203 }
  },
  {
    id: "th-005",
    title: "Beachfront Land Plot in Phuket",
    location: "Natai Beach, Phang Nga",
    country: "Thailand",
    city: "Phuket",
    type: "Land",
    listingType: "buy",
    price: 25000000,
    currency: "THB",
    priceLabel: "฿25,000,000",
    beds: 0,
    baths: 0,
    area: 1600,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"
    ],
    verified: true,
    featured: false,
    description: "Rare beachfront land plot with Chanote title. 1,600 sqm with 40m beach frontage. Ideal for luxury villa development or boutique resort project. All utilities available.",
    amenities: ["Beachfront", "Chanote Title", "Utilities Available", "Road Access"],
    agent: { name: "Krit Wattana", avatar: "KW", verified: true, rating: 4.6, deals: 52 }
  },
  {
    id: "vn-005",
    title: "Luxury Apartment in Vinhomes Central Park",
    location: "Binh Thanh, Ho Chi Minh City",
    country: "Vietnam",
    city: "Ho Chi Minh City",
    type: "Condo",
    listingType: "rent",
    price: 25000000,
    currency: "VND",
    priceLabel: "₫25M/mo",
    beds: 3,
    baths: 2,
    area: 120,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80"
    ],
    verified: true,
    featured: false,
    description: "Premium 3-bedroom apartment in Vinhomes Central Park, the most sought-after residential complex in HCMC. Includes access to Vincom Mega Mall, international school, and Central Park.",
    amenities: ["Park View", "Mall Access", "International School", "Pool", "Tennis Court", "BBQ Area"],
    agent: { name: "Tran Thi Mai", avatar: "TM", verified: true, rating: 4.7, deals: 64 }
  },
  {
    id: "th-006",
    title: "Sea View Condo in Pattaya",
    location: "Wongamat Beach, Pattaya",
    country: "Thailand",
    city: "Pattaya",
    type: "Condo",
    listingType: "rent",
    price: 25000,
    currency: "THB",
    priceLabel: "฿25,000/mo",
    beds: 1,
    baths: 1,
    area: 52,
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80"
    ],
    verified: true,
    featured: false,
    description: "Fully furnished sea view condo on Wongamat Beach. Modern design with high-end appliances. Building features infinity pool, gym, and direct beach access. Great rental yield.",
    amenities: ["Sea View", "Furnished", "Pool", "Beach Access", "Gym", "24/7 Security"],
    agent: { name: "Nattaya Prem", avatar: "NP", verified: true, rating: 4.8, deals: 89 }
  },
  {
    id: "vn-006",
    title: "Traditional House with Garden in Hoi An",
    location: "Cam Thanh, Hoi An",
    country: "Vietnam",
    city: "Hoi An",
    type: "House",
    listingType: "buy",
    price: 3200000000,
    currency: "VND",
    priceLabel: "₫3.2B",
    beds: 3,
    baths: 2,
    area: 200,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80"
    ],
    verified: true,
    featured: false,
    description: "Beautifully restored traditional Vietnamese house near the iconic Hoi An Ancient Town. Lush garden with mature fruit trees, koi pond, and outdoor dining area. Perfect as a boutique homestay or private residence.",
    amenities: ["Garden", "Koi Pond", "Near Ancient Town", "Furnished", "Parking", "Kitchen Garden"],
    agent: { name: "Le Van Thanh", avatar: "LT", verified: true, rating: 4.8, deals: 91 }
  }
];
