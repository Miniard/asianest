import { Shield } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <span className="text-lg font-bold">AsiaNest</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              Your trusted partner for verified real estate in Thailand and Vietnam. Protecting foreign buyers since 2020.
            </p>
            <div className="flex gap-3">
              <span className="px-2.5 py-1 rounded-md bg-white/10 text-xs text-white/60">🇹🇭 Thailand</span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 text-xs text-white/60">🇻🇳 Vietnam</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Properties</h4>
            <ul className="space-y-2.5 text-sm text-white/50">
              <li><Link href="#" className="hover:text-accent transition-colors">Buy in Thailand</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Buy in Vietnam</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Rent in Thailand</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Rent in Vietnam</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Investment Properties</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-white/50">
              <li><Link href="#" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Our Team</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Press</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm text-white/50">
              <li><Link href="#" className="hover:text-accent transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Safety Guide</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Foreign Buyer FAQ</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Legal Resources</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Report a Scam</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">&copy; 2024 AsiaNest. All rights reserved. Licensed real estate broker in Thailand and Vietnam.</p>
          <div className="flex gap-6 text-xs text-white/30">
            <Link href="#" className="hover:text-white/60">Privacy</Link>
            <Link href="#" className="hover:text-white/60">Terms</Link>
            <Link href="#" className="hover:text-white/60">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
