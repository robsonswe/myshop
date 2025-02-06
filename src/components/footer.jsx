import { AiOutlineMail } from "react-icons/ai"
import { BsChatDots, BsFacebook, BsInstagram, BsLinkedin, BsTelephone, BsTwitter, BsYoutube } from "react-icons/bs"

export default function Footer() {
  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 bg-gray-700 rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold">Newsletter</h2>
              <p className="text-gray-300">Receive our latest offers</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-4 w-full md:w-auto" onSubmit={handleSubmit}>
              <input
                type="text"
                name="newsName"
                id="newsName"
                placeholder="Name"
                className="py-2 px-4 rounded bg-gray-600 text-white placeholder-gray-400 w-full sm:w-auto"
              />
              <input
                type="email"
                name="newsEmail"
                id="newsEmail"
                placeholder="Email"
                className="py-2 px-4 rounded bg-gray-600 text-white placeholder-gray-400 w-full sm:w-auto"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
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
                <BsChatDots /> Chat
              </li>
              <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer transition duration-300">
                <AiOutlineMail /> customer@shop.com
              </li>
              <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer transition duration-300">
                <BsTelephone /> (870) 423-3303
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">Our Media</h2>
            <ul className="space-y-2">
              {[
                { icon: BsTwitter, name: "Twitter" },
                { icon: BsInstagram, name: "Instagram" },
                { icon: BsFacebook, name: "Facebook" },
                { icon: BsYoutube, name: "YouTube" },
                { icon: BsLinkedin, name: "LinkedIn" },
              ].map(({ icon: Icon, name }) => (
                <li
                  key={name}
                  className="flex items-center gap-2 hover:text-blue-400 cursor-pointer transition duration-300"
                >
                  <Icon /> {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-4 text-center text-sm">
        <p>&copy; 2023 Your Company Name. All rights reserved.</p>
      </div>
    </footer>
  )
}

