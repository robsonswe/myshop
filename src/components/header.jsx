import { AiOutlineSearch } from "react-icons/ai";
import { BsCart, BsBell } from "react-icons/bs";

export default function Header() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <header>
      <div className="flex flex-row justify-between items-center py-3 px-4 bg-slate-300">
        <h1 className="font-bold text-lg">LOGO</h1>
        <form
          className="flex flex-row gap-0 items-center"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="search"
            name="Search"
            id="search"
            className="border border-black rounded-l-md outline-none indent-2 h-7 py-4 w-80 bg-slate-100"
          />
          <button className="border-r border-y rounded-r-md h-7 px-2 py-4 flex items-center border-black bg-slate-100">
            <AiOutlineSearch className="cursor-pointer" size={17} />
          </button>
        </form>
        <div className="flex flex-row gap-4 items-center">
          <div className="flex flex-row gap-2 items-center">
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
    </header>
  );
}
