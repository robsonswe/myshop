import { Mail, MessageCircle, Phone, Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 bg-gray-800 rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold">Newsletter</h2>
              <p className="text-gray-300">Receive our latest offers</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-4 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                name="newsName"
                id="newsName"
                placeholder="Name"
                className="py-2 px-4 rounded bg-gray-700 text-white placeholder-gray-400 w-full sm:w-auto"
              />
              <input
                type="email"
                name="newsEmail"
                id="newsEmail"
                placeholder="Email"
                className="py-2 px-4 rounded bg-gray-700 text-white placeholder-gray-400 w-full sm:w-auto"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-bold mb-4">Institutional</h2>
            <ul className="space-y-2">
              {["About us", "Purchasing policies", "Cookie policies", "Privacy policies", "Careers"].map((item) => (
                <li key={item} className="hover:text-blue-400 cursor-pointer transition duration-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">Customer Service</h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer transition duration-300">
                <MessageCircle className="w-4 h-4" /> Chat
              </li>
              <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer transition duration-300">
                <Mail className="w-4 h-4" /> customer@shop.com
              </li>
              <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer transition duration-300">
                <Phone className="w-4 h-4" /> (870) 423-3303
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">Our Media</h2>
            <ul className="space-y-2">
              {[
                { icon: Twitter, name: "Twitter" },
                { icon: Instagram, name: "Instagram" },
                { icon: Facebook, name: "Facebook" },
                { icon: Youtube, name: "YouTube" },
                { icon: Linkedin, name: "LinkedIn" },
              ].map(({ icon: Icon, name }) => (
                <li
                  key={name}
                  className="flex items-center gap-2 hover:text-blue-400 cursor-pointer transition duration-300"
                >
                  <Icon className="w-4 h-4" /> {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-950 py-4 text-center text-sm">
        <p>&copy; 2023 Your Company Name. All rights reserved.</p>
      </div>
    </footer>
  )
}

