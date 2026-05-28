"use client";
import { Send, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

export default function ContactCTA() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const supabase = createClient();

    await supabase.from("inquiries").insert({
      user_id: user?.id || null,
      first_name: form.get("first_name") as string,
      last_name: form.get("last_name") as string,
      email: form.get("email") as string,
      inquiry_type: form.get("inquiry_type") as string,
      message: form.get("message") as string,
    });

    setSent(true);
    setLoading(false);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-20 -right-20 w-96 h-96 border border-white/20 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 border border-white/30 rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-wider mb-6">Get In Touch</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Find Your Dream Property?</h2>
            <p className="text-white/60 leading-relaxed mb-8">
              Whether you're looking to buy your first vacation home, invest in rental property, or find a long-term rental — our team is here to guide you every step of the way. Free consultation, no obligations.
            </p>
            <div className="space-y-4">
              {[
                { icon: Phone, label: "+66 2 123 4567 (Thailand)", sub: "+84 28 3456 7890 (Vietnam)" },
                { icon: Mail, label: "hello@asianest.com", sub: "Response within 2 hours" },
                { icon: MapPin, label: "Bangkok · Ho Chi Minh City · Phuket · Hanoi", sub: "4 offices across 2 countries" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{item.label}</p>
                    <p className="text-white/50 text-xs">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 lg:p-8">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Message Sent!</h3>
                <p className="text-sm text-text-secondary">We'll get back to you within 2 hours during business hours.</p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-text-primary mb-6">Send us a message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input name="first_name" type="text" placeholder="First Name" required className="px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
                    <input name="last_name" type="text" placeholder="Last Name" required className="px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
                  </div>
                  <input name="email" type="email" placeholder="Email Address" required className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
                  <select name="inquiry_type" className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm text-text-secondary outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                    <option value="buy">I want to buy a property</option>
                    <option value="rent">I want to rent a property</option>
                    <option value="list">I want to list my property</option>
                    <option value="invest">I need investment advice</option>
                    <option value="other">Other inquiry</option>
                  </select>
                  <textarea name="message" placeholder="Tell us about what you're looking for..." rows={4} className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none" />
                  <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-light disabled:opacity-50 text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary/30">
                    <Send className="w-4 h-4" />
                    <span>{loading ? "Sending..." : "Send Message"}</span>
                  </button>
                  <p className="text-xs text-text-secondary text-center">Free consultation · No obligations · Response within 2 hours</p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
