import { AiOutlineSearch } from "react-icons/ai";
import { BsBell, BsCart } from "react-icons/bs";

import { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
    }
  };
  return (
    <header>
      <div className="flex flex-row items-center justify-between bg-slate-300 py-3 px-4">
        <Link to="/">
          <h1 className="text-lg font-bold">LOGO</h1>
        </Link>
        <Form
          onSubmit={handleSubmit}
          method="post"
          action="/search"
          className="flex flex-row items-center gap-0"
        >
          <input
            type="search"
            name="searchTerm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="search"
            className="h-7 w-80 rounded-l-md border border-black bg-slate-100 py-4 indent-2 outline-none"
          />
          <button className="flex h-7 items-center rounded-r-md border-y border-r border-black bg-slate-100 px-2 py-4">
            <AiOutlineSearch className="cursor-pointer" size={17} />
          </button>
        </Form>
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-row items-center gap-2">
            <span>
              <BsBell size={18} className="cursor-pointer" />
            </span>
            <span>
              <BsCart size={18} className="cursor-pointer" />
            </span>
          </div>
          <h2 className="font-bold">Username</h2>
        </div>
      </div>
      <nav>
        <ul className="flex flex-row">
          <li className="cursor-pointer border px-2 font-bold hover:bg-slate-300">
            Categories
          </li>
          <li className="cursor-pointer border px-2 font-bold hover:bg-slate-300">
            New Offers
          </li>
          <li className="cursor-pointer border px-2 font-bold hover:bg-slate-300">
            Most Searched
          </li>
          <li className="cursor-pointer border px-2 font-bold hover:bg-slate-300">
            Category X
          </li>
          <li className="cursor-pointer border px-2 font-bold hover:bg-slate-300">
            Category Y
          </li>
          <li className="cursor-pointer border px-2 font-bold hover:bg-slate-300">
            Daily Offer
          </li>
        </ul>
      </nav>
    </header>
  );
}
