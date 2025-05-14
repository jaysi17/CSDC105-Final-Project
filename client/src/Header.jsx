import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="w-full bg-gradient-to-r from-[#1746a2] via-[#2563eb] to-[#1746a2] shadow-lg py-3 px-2 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white font-extrabold text-2xl tracking-tight hover:scale-105 transition-transform">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8 drop-shadow-lg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
          <span className="shadow text-blue-100">StayConnect</span>
        </Link>

        {/* Search bar */}
        <form
          className="hidden md:flex items-center gap-2 bg-white bg-opacity-90 border-2 border-blue-400 rounded-full px-4 py-2 shadow-md focus-within:ring-2 focus-within:ring-blue-300 transition"
          onSubmit={e => {
            e.preventDefault();
            const query = e.target.elements.search?.value.trim();
            if (query) window.location.href = `/search?query=${encodeURIComponent(query)}`;
          }}
        >
          <input
            name="search"
            type="text"
            placeholder="Search destinations"
            className="bg-transparent outline-none text-blue-700 placeholder-blue-400 w-32 md:w-44"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow transition"
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.2-5.2M16.5 15.8a7.5 7.5 0 1 0-1.3 1.3L21 21Z" />
            </svg>
          </button>
        </form>

        {/* User Menu */}
        <Link
          to={user ? "/account" : "/login"}
          className="flex items-center gap-2 bg-white bg-opacity-90 border-2 border-blue-400 rounded-full px-4 py-2 shadow-md hover:bg-blue-600 hover:text-white transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-blue-600 group-hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <div className="bg-blue-500 text-white rounded-full p-1 shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0ZM3.75 20.1a8.25 8.25 0 0116.5 0 .75.75 0 01-.437.695A18.7 18.7 0 0112 22.5a18.7 18.7 0 01-7.813-1.705.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {user && <span className="text-sm font-semibold text-blue-700 group-hover:text-white">{user.name}</span>}
        </Link>
      </div>
    </header>
  );
}
