import React, { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FaRegKissWinkHeart, FaApple, FaLeaf, FaFeatherAlt, FaSpa } from 'react-icons/fa';
import { Menu, Transition, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { Link } from 'react-router-dom';

export default function DropDownMenu() {
  const data = [
    { icon: <FaRegKissWinkHeart className="text-pink-500" />, name: 'Maybelline', link: 'maybelline' },
    { icon: <FaApple className="text-green-500" />, name: 'The Body Shop', link: 'the_body_shop' },
    { icon: <FaLeaf className="text-lime-500" />, name: 'Herbivore', link: 'herbivore' },
    { icon: <FaFeatherAlt className="text-purple-500" />, name: 'Fenty Beauty', link: 'fenty_beauty' },
    { icon: <FaSpa className="text-rose-400" />, name: 'Lush', link: 'lush' },
  ];

  return (
    <Menu as="div" className="relative w-full">
      {({ open }) => (
        <>
          <MenuButton className=" p-2 px-15 bg-white shadow-md rounded-md gap-2 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors">
            <h1 className="text-lg font-semibold">Brand</h1>
            {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </MenuButton>
          
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <MenuItems className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md py-1 focus:outline-none">
              {data.map(({icon, name,link}, index) => (
               <Link to={link}>
                <MenuItem key={index}>
                  {({ active }) => (
                    <div className={`${active ? 'bg-pink-50 text-pink-600' : 'text-gray-900'} flex items-center px-4 py-2 space-x-2 cursor-pointer`}>
                      {icon}
                      <span>{name}</span>
                    </div>
                  )}
                </MenuItem>
               </Link>
              ))}
            </MenuItems>
          </Transition>
        </>
      )}
    </Menu>
  );
}