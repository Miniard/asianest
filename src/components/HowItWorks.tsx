import { Search, ShieldCheck, FileCheck, Key } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse & Discover",
    description: "Search through our curated listings of verified properties in Thailand and Vietnam. Filter by location, type, and budget.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: ShieldCheck,
    title: "We Verify Everything",
    description: "Our local agents personally inspect every property, verify ownership documents, and check legal compliance before listing.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: FileCheck,
    title: "Secure Transaction",
    description: "We handle all paperwork, legal checks, and escrow services. Your money is protected until every condition is met.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Key,
    title: "Move In with Confidence",
    description: "Get the keys to your new property with full peace of mind. We provide post-sale support and property management services.",
    color: "bg-purple-50 text-purple-600",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">How It Works</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">Your Safe Path to Property Ownership</h2>
          <p className="text-text-secondary max-w-lg mx-auto">We eliminate the risks of buying or renting in Southeast Asia. Here's how we protect you at every step.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-px bg-gray-200 z-0" />
              )}
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-2xl ${step.color} flex items-center justify-center`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span className="text-4xl font-black text-gray-100">0{i + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
