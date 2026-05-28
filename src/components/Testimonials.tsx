import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "James R.",
    role: "Bought a villa in Phuket",
    avatar: "JR",
    rating: 5,
    text: "I was about to wire $200K to a 'developer' in Phuket when a friend recommended AsiaNest. Turns out the project didn't even have proper permits. AsiaNest found me a legitimate beachfront villa instead. Can't thank them enough.",
  },
  {
    name: "Marie-Claire D.",
    role: "Renting in Ho Chi Minh City",
    avatar: "MD",
    rating: 5,
    text: "As a French expat, navigating Vietnamese rental contracts was a nightmare. AsiaNest translated everything, negotiated fair terms, and their agent even attended the move-in inspection with me. Incredible service.",
  },
  {
    name: "David & Sarah K.",
    role: "Invested in Bangkok condos",
    avatar: "DK",
    rating: 5,
    text: "We've purchased 3 investment condos through AsiaNest over 2 years. Their market knowledge is unmatched, and the escrow service gives us total peace of mind. Average ROI of 8.2% so far.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">Testimonials</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">Trusted by Thousands</h2>
          <p className="text-text-secondary max-w-lg mx-auto">Real stories from real clients who found their perfect property through AsiaNest.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="relative p-6 lg:p-8 bg-surface rounded-2xl border border-gray-100">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">{t.text}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                  <p className="text-xs text-text-secondary">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
