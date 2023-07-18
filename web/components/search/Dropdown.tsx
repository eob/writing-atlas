import React, { FC } from "react";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import { useRef } from 'react';
import { useOutsideAlerter } from './OutsideAlerter'

type DropdownTypes = {
  /**
   * Function to call when it changes
   */
  onChange: any;
  /**
   * Values
   */
  values: string[];
  /**
   * Keys (optional)
   */
  keys?: string[];
  /**
   * Optional initial value
   */
  initial?: string;
};

export const Dropdown: FC<DropdownTypes> = ({
  // eslint-disable-next-line react/prop-types
  onChange,
  // eslint-disable-next-line react/prop-types
  keys,
  // eslint-disable-next-line react/prop-types
  values,
  // eslint-disable-next-line react/prop-types
  initial,
}) => {
  if (!keys) {
    keys = values;
  }
  if (!initial) {
    initial = values[0];
  }

  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(initial);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    setIsOpen(false);
  });

  return (
    <div ref={wrapperRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 whitespace-nowrap"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
      >
        {currentValue}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div
            ref={ref}
            className="z-10 origin-top-right absolute left-0 md:right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          >
            <div
              className="py-1 max-h-64 overflow-y-scroll overflow-x-hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {values.map((x) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 whitespace-nowrap overflow-x-hidden"
                    role="menuitem"
                    onClick={() => {
                      setIsOpen(false);
                      setCurrentValue(x);
                      if (onChange) {
                        onChange(x);
                      }
                    }}
                  >
                    {x}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
};
