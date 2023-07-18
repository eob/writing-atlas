import React, { FC } from "react";

const Top_CustomTabCommon =
  "block cursor-pointer ml-4 px-3 py-2 text-sm focus:outline-none focus:bg-gray-300";
const Top_CustomTabSelected = `${Top_CustomTabCommon} text-black border-solid border-black border-b-2 font-regular`
const Top_CustomTabUnSelected = `${Top_CustomTabCommon} text-gray-600 font-regular`;

const Side_CustomTabSelected =
  "group bg-gray-50 rounded-md px-3 py-2 flex items-center text-sm font-medium text-indigo-700 hover:text-indigo-700 hover:bg-white";
const Side_CustomTabUnSelected =
  "group rounded-md px-3 py-2 flex items-center text-sm font-medium text-gray-900 hover:text-gray-900 hover:bg-gray-50";

type TabType = {
  /**
   * Label of the tag
   */
  label: string;
  /**
   * The NEXT Link as value
   */
  asLink?: string;
  /**
   * The href the tag links to
   */
  href?: string | any;
  /**
   * Is the tab selected?
   */
  isSelected?: boolean;
  /**
   * Is the tab on the side?
   */
  side?: boolean;
  /**
   * Tab icon
   */
  icon?: any;
  /**
   * Next Link class. For some reason this is required
   * for the bundled class to work.
   */
  Link?: any;
};

export const Tab: React.FC<TabType> = ({
  href = "#",
  isSelected = false,
  label = "Some Tab",
  asLink = null,
  side = false,
  icon = null,
  Link = null,
}) => {
  const SelectedStyle = side ? Side_CustomTabSelected : Top_CustomTabSelected;
  const UnselectedStyle = side
    ? Side_CustomTabUnSelected
    : Top_CustomTabUnSelected;
  const LabelStyle = side ? "truncate" : null;

  if (Link) {
    return (
      <Link href={href} as={asLink}>
        <a className={isSelected ? SelectedStyle : UnselectedStyle}>
          {icon} <span className={LabelStyle}>{label}</span>
        </a>
      </Link>
    );
  } else {
    return (
      <a className={isSelected ? SelectedStyle : UnselectedStyle}>
        {icon} <span className={LabelStyle}>{label}</span>
      </a>
    );
  }
};

export default Tab;
