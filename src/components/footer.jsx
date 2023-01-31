import {
  BsChatDots,
  BsTelephone,
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsLinkedin,
  BsYoutube,
} from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";

export default function Footer() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <footer className="bg-slate-200 p-2 flex flex-col gap-2">
      <div className="flex flex-row items-center gap-4 justify-center">
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
            className="indent-2 py-3"
          />
          <input
            type="text"
            name="newsEmail"
            id="newsEmail"
            placeholder="Email"
            className="indent-2 py-3"
          />
          <button className="border bg-slate-300 px-2 rounded border-black">
            Register
          </button>
        </form>
      </div>
      <div className="flex flex-row gap-11 justify-center items-start pt-2 border-t border-gray-400">
        <div>
          <h2 className="font-bold">Institutional</h2>
          <ul>
            <li>About us</li>
            <li>Purchasing policies</li>
            <li>Cookie policies</li>
            <li>Privacy policies</li>
            <li>About us</li>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold">Customer Service</h2>
          <ul>
            <li className="flex flex-row gap-2 items-center">
              <BsChatDots /> Chat
            </li>
            <li className="flex flex-row gap-2 items-center">
              <AiOutlineMail />
              customer@shop.com
            </li>
            <li className="flex flex-row gap-2 items-center">
              <BsTelephone />
              (870) 423-3303
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold">Our Medias</h2>
          <ul>
            <li className="flex flex-row gap-2 items-center">
              <BsTwitter /> Twitter
            </li>
            <li className="flex flex-row gap-2 items-center">
              <BsInstagram /> Instagram
            </li>
            <li className="flex flex-row gap-2 items-center">
              <BsFacebook /> Facebook
            </li>
            <li className="flex flex-row gap-2 items-center">
              <BsYoutube /> YouTube
            </li>
            <li className="flex flex-row gap-2 items-center">
              <BsLinkedin /> LinkedIn
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
