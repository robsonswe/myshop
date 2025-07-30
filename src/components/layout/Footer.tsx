import ScrollToTopLink from "@/components/ui/ScrollToTopLink"
import logo from "@/assets/logo.svg" // Using your new logo
import {
  Mail,
  MessageCircle,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  MapPin,
  Clock,
  Send,
} from "lucide-react"

export default function Footer() {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    console.log("Newsletter subscription")
  }

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* Newsletter Section */}
      <div className="bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 py-12 md:py-16 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Send className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-indigo-100 mb-8 md:mb-10 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Get exclusive deals, new arrivals, and insider updates delivered straight to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-14 pl-6 pr-4 rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder:text-indigo-100 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-200 text-base md:text-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="h-14 px-8 bg-white text-indigo-600 hover:bg-indigo-50 font-bold rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2 text-base md:text-lg"
              >
                <span>Subscribe</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
            <div className="mt-6 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-indigo-200 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>50,000+ subscribers</span>
              </div>
              <span>•</span>
              <span>No spam, ever</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 md:py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 md:gap-x-12 divide-y divide-slate-700 md:divide-y-0">
          {/* Section 1: Company Info */}
          <div className="text-center md:text-left py-10 md:py-0">
            {/* --- UPDATED: Logo with Text --- */}
            <ScrollToTopLink
              to="/"
              className="group flex items-center space-x-3 mb-6 justify-center md:justify-start"
            >
              <img src={logo} alt="MyShop Logo" className="h-10 w-auto" />
              <span className="text-2xl font-bold text-white">MyShop</span>
            </ScrollToTopLink>

            <p className="text-gray-400 mb-6 leading-relaxed">
              Your destination for quality products, great service, and unbeatable prices.
            </p>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span>123 Commerce St, Online</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Clock className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span>Support: 24/7</span>
              </div>
            </div>
          </div>

          {/* Section 2: Quick Links */}
          <div className="text-center md:text-left py-10 md:py-0">
            <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {["About", "Contact", "Shipping", "Returns", "Track Order"].map((item) => (
                <li key={item}>
                  <ScrollToTopLink to="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                    {item}
                  </ScrollToTopLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Customer Service */}
          <div className="text-center md:text-left py-10 md:py-0">
            <h4 className="text-xl font-bold mb-6 text-white">Get Help</h4>
            <ul className="space-y-4">
              {[
                { icon: MessageCircle, title: "Live Chat", value: "Available 24/7", href: "#" },
                { icon: Mail, title: "Email Us", value: "support@shop.com", href: "mailto:support@shop.com" },
                { icon: Phone, title: "Call Us", value: "(870) 423-3303", href: "tel:+18704233303" },
              ].map(({ icon: Icon, title, value, href }) => (
                <li key={title}>
                  <ScrollToTopLink
                    to={href}
                    className="flex items-center gap-4 group transition-colors hover:text-blue-400 justify-center md:justify-start"
                  >
                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white">{title}</div>
                      <div className="text-sm text-gray-400">{value}</div>
                    </div>
                  </ScrollToTopLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Follow Us */}
          <div className="text-center md:text-left pt-10 md:pt-0">
            <h4 className="text-xl font-bold mb-6 text-white">Follow Us</h4>
            <p className="text-gray-400 mb-6 leading-relaxed">Stay connected for the latest updates and deals.</p>
            <div className="flex justify-center md:justify-start gap-3">
              {[
                { icon: Facebook, name: "Facebook", color: "hover:bg-blue-600" },
                { icon: Instagram, name: "Instagram", color: "hover:bg-pink-600" },
                { icon: Twitter, name: "Twitter", color: "hover:bg-sky-500" },
                { icon: Youtube, name: "YouTube", color: "hover:bg-red-600" },
                { icon: Linkedin, name: "LinkedIn", color: "hover:bg-blue-700" },
              ].map(({ icon: Icon, name, color }) => (
                <ScrollToTopLink
                  key={name}
                  to="#"
                  className={`w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 ${color} transform hover:scale-110`}
                  aria-label={name}
                >
                  <Icon className="w-6 h-6" />
                </ScrollToTopLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700 bg-black/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} MyShop. All Rights Reserved.
            </p>
            <div className="flex items-center gap-x-6 text-sm text-gray-400">
              <ScrollToTopLink to="#" className="hover:text-white transition-colors">
                Privacy
              </ScrollToTopLink>
              <ScrollToTopLink to="#" className="hover:text-white transition-colors">
                Terms
              </ScrollToTopLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}