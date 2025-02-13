"use client";
import Image from "next/image";
import CountryMap from "./CountryMap";
import { useState } from "react";
import { Dropdown } from "./ui/Dropdown";
import { DropdownItem } from "./ui/DropdownItem";
import { MoreVertical } from "lucide-react"; // Added Lucide icon

export default function DemographicCard() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="md:w-[40vw] rounded-2xl border border-gray-800 bg-black p-5 sm:p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            <span className="mr-2 inline-block rounded-full bg-[#106a2e] p-1.5">
              🌍 {/* Globe icon */}
            </span>
            Customers Demographic
          </h3>
          <p className="mt-1 text-gray-300 text-theme-sm">
            Number of customer based on country
          </p>
        </div>

        <div className="relative inline-block">
          <button 
            onClick={toggleDropdown}
            className="text-gray-300 hover:text-[#106a2e] transition-colors"
          >
            <MoreVertical className="h-5 w-5" /> {/* Replaced with Lucide icon */}
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2 bg-gray-900 border border-gray-800"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-300 rounded-lg hover:bg-[#106a2e]/20 hover:text-[#106a2e]"
            >
              View More
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-300 rounded-lg hover:bg-[#106a2e]/20 hover:text-[#106a2e]"
            >
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
      <div className="px-4 py-6 my-6 overflow-hidden border border-gray-800 rounded-2xl bg-gray-900 sm:px-6">
        <div
          id="mapOne"
          className="mapOne map-btn -mx-4 -my-6 h-[212px] w-[252px] 2xsm:w-[307px] xsm:w-[358px] sm:-mx-6 md:w-[668px] lg:w-[634px] xl:w-[393px] 2xl:w-[554px]"
        >
          <CountryMap mapColor="#1a1a1a" />
        </div>
      </div>

      <div className="space-y-5">
        {/* USA Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="items-center w-full rounded-full max-w-8 border border-[#106a2e] p-1">
              <Image
                width={48}
                height={48}
                src="/images/country-01.svg"
                alt="usa"
                className="w-full rounded-full"
              />
            </div>
            <div>
              <p className="font-semibold text-white text-theme-sm">
                USA
              </p>
              <span className="block text-gray-300 text-theme-xs">
                2,379 Customers
              </span>
            </div>
          </div>

          <div className="flex w-full max-w-[140px] items-center gap-3">
            <div className="relative block h-2 w-full max-w-[100px] rounded bg-gray-800">
              <div className="absolute left-0 top-0 flex h-full w-[79%] items-center justify-center rounded bg-[#106a2e]"></div>
            </div>
            <p className="font-medium text-[#106a2e] text-theme-sm">
              79%
            </p>
          </div>
        </div>

        {/* France Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="items-center w-full rounded-full max-w-8 border border-[#106a2e] p-1">
              <Image
                width={48}
                height={48}
                className="w-full rounded-full"
                src="/images/country-02.svg"
                alt="france"
              />
            </div>
            <div>
              <p className="font-semibold text-white text-theme-sm">
                France
              </p>
              <span className="block text-gray-300 text-theme-xs">
                589 Customers
              </span>
            </div>
          </div>

          <div className="flex w-full max-w-[140px] items-center gap-3">
            <div className="relative block h-2 w-full max-w-[100px] rounded bg-gray-800">
              <div className="absolute left-0 top-0 flex h-full w-[23%] items-center justify-center rounded bg-[#106a2e]"></div>
            </div>
            <p className="font-medium text-[#106a2e] text-theme-sm">
              23%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}