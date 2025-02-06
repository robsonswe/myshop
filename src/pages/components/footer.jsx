import { AiOutlineMail } from "react-icons/ai";
import {
  BsChatDots,
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTelephone,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";

export default function Footer() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <footer className="flex flex-col bg-slate-200">
      <div className="flex flex-row items-center justify-center gap-4 bg-gray-700">
        <div>
          <h2 className="font-bold">Newsletter</h2>
          <p>Receive our latest offers</p>
        </div>
        <form className="flex flex-row gap-4" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            name="newsName"
            id="newsName"
            placeholder="Name"
            className="py-2 indent-2"
          />
          <input
            type="text"
            name="newsEmail"
            id="newsEmail"
            placeholder="Email"
            className="py-2 indent-2"
          />
          <button className="rounded-sm border border-black bg-slate-300 px-2">
            Register
          </button>
        </form>
      </div>
      <div className="flex flex-row items-start justify-center gap-11 border-t border-gray-400 pt-2">
        <div>
          <h2 className="font-bold">Institutional</h2>
          <ul>
            <li className="cursor-pointer">About us</li>
            <li className="cursor-pointer">Purchasing policies</li>
            <li className="cursor-pointer">Cookie policies</li>
            <li className="cursor-pointer">Privacy policies</li>
            <li className="cursor-pointer">About us</li>
            <li className="cursor-pointer">Careers</li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold">Customer Service</h2>
          <ul>
            <li className="flex cursor-pointer flex-row items-center gap-2">
              <BsChatDots /> Chat
            </li>
            <li className="flex cursor-pointer flex-row items-center gap-2">
              <AiOutlineMail />
              customer@shop.com
            </li>
            <li className="flex cursor-pointer flex-row items-center gap-2">
              <BsTelephone />
              (870) 423-3303
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold">Our Medias</h2>
          <ul>
            <li className="flex cursor-pointer flex-row items-center gap-2">
              <BsTwitter /> Twitter
            </li>
            <li className="flex cursor-pointer flex-row items-center gap-2">
              <BsInstagram /> Instagram
            </li>
            <li className="flex cursor-pointer flex-row items-center gap-2">
              <BsFacebook /> Facebook
            </li>
            <li className="flex cursor-pointer flex-row items-center gap-2">
              <BsYoutube /> YouTube
            </li>
            <li className="flex cursor-pointer flex-row items-center gap-2">
              <BsLinkedin /> LinkedIn
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
