import { Shield, Scale, Eye, Users, FileWarning, Lock, CheckCircle2, AlertTriangle } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "On-Site Inspections",
    description: "Every property is physically inspected by our local team. We check structural integrity, utilities, and compare reality to listing photos.",
  },
  {
    icon: Scale,
    title: "Legal Verification",
    description: "We verify ownership titles (Chanote, Nor Sor 3, Red Book), check for liens, and ensure foreign ownership compliance.",
  },
  {
    icon: Lock,
    title: "Escrow Protection",
    description: "Your funds are held in a secure escrow account until all conditions are met and both parties are satisfied.",
  },
  {
    icon: FileWarning,
    title: "Scam Detection",
    description: "Our AI-powered system and experienced team flag suspicious listings, fake agents, and common fraud patterns before they reach you.",
  },
  {
    icon: Users,
    title: "Bilingual Support",
    description: "Our agents speak English, Thai, and Vietnamese. No miscommunication, no hidden clauses in contracts you can't read.",
  },
  {
    icon: CheckCircle2,
    title: "Money-Back Guarantee",
    description: "If a property doesn't match its listing or if we miss a critical issue during verification, you get a full refund.",
  },
];

const scamStats = [
  { value: "37%", label: "of foreign buyers in SEA encounter fraud" },
  { value: "$2.1B", label: "lost to real estate scams annually in the region" },
  { value: "0", label: "scam incidents through AsiaNest verified listings" },
];

export default function TrustSection() {
  return (
    <section id="trust" className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Warning banner */}
        <div className="mb-16 p-6 lg:p-8 rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-900 mb-2">Real Estate Fraud is Rampant in Southeast Asia</h3>
              <p className="text-sm text-red-800/70 leading-relaxed mb-4">
                Fake ownership documents, phantom properties, illegal builds, visa scams disguised as property deals — foreign buyers are prime targets. 
                AsiaNest exists to solve this problem. Every listing goes through our rigorous 47-point verification process.
              </p>
              <div className="flex flex-wrap gap-6">
                {scamStats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-black text-red-700">{stat.value}</p>
                    <p className="text-xs text-red-600/70 max-w-[180px]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">Trust & Safety</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">Why AsiaNest is Different</h2>
          <p className="text-text-secondary max-w-lg mx-auto">We don't just list properties — we guarantee them. Here's how we protect every transaction.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="p-6 bg-white rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-bold text-text-primary mb-2">{feature.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
