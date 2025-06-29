"use client";

import Cart from "./Cart";
import SearchBar from "./SearchBar";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-[#045ca4] border-b border-gray-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 h-16 lg:h-20">
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                width={40}
                height={40}
                alt="logo"
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg"
              />
            </div>
          </div>

          <div className="flex-1 mx-2 sm:mx-4 lg:mx-8 max-w-2xl">
            <SearchBar />
          </div>
          <div className="flex-shrink-0">
            <Cart />
          </div>
        </div>
      </div>
    </header>
  );
}
