import React, { FC } from "react";
import { Tag } from "../tag";
import { Img } from "react-image";

type ItemRowType = {
  /**
   * Title of the item
   */
  title: string;
  /**
   * Subtitle of the item
   */
  subtitle: string;
  /**
   * Tab icon
   */
  iconHref: any;
  /**
   * Tab icon alternative text
   */
  iconAlt: string;
  /**
   * Pad in the icon space even if no icon present
   */
  iconPad: boolean;
  /**
   * The NEXT Link as value
   */
  asLink?: string;
  /**
   * The href the tag links to
   */
  href?: string;
  /**
   * Name of the author
   */
  author?: string;
  /**
   * URL of the author
   */
  authorHref?: string;
  /**
   * Date or time of the item
   */
  dateTime?: string;
  /**
   * Tags to include
   */
  tags?: typeof Tag[];
};

export const ItemRow: FC<ItemRowType> = ({
  href = "#",
  title = "Some Item",
  subtitle = null,
  asLink = null,
  iconHref = null,
  iconAlt = null,
  iconPad = false,
  author = null,
  authorHref = null,
  dateTime = null,
  tags = null,
}) => {
  const icon =
    iconHref != null ? (
      <Img
        alt={iconAlt}
        className="block h-full object-contain max-h-48"
        src={iconHref}
      />
    ) : null;

  // if (subtitle && subtitle.length && subtitle.length > 200) {
  //   for (let i = 175; i >= 0; i--) {
  //     if (subtitle[i] == ' ') {
  //       subtitle = subtitle.substr(0, i-1) + '...'
  //       break
  //     }
  //   }
  // }

  return (
    <a
      href={href}
      className="flex flex-row rounded-lg shadow-lg overflow-hidden bg-white min-h-48 max-h-48 mb-10"
    >
      {(iconHref || iconPad) && icon}
      <div className="flex-grow p-3 md:p-4 lg:px-6 flex flex-col overflow-hidden">
        <h3 className="mt-2 sm:mt-1text-md flex-row sm:text-xl leading-7 font-semibold text-gray-900 truncate">
          {title}
        </h3>
        <div className="flex flex-row">
          {author && (
            <a
              href={authorHref}
              className="text-sm leading-5 font-medium text-gray-900 hover:underline truncate"
            >
              {author}
            </a>
          )}
          {author && dateTime && (
            <span className="text-sm leading-5 font-medium text-gray-900 mr-3">
              ,{" "}
            </span>
          )}
          {dateTime && (
            <div className="text-sm leading-5 text-gray-500">
              <time>{dateTime}</time>
            </div>
          )}
        </div>

        {subtitle && subtitle.length > 0 && (
          <div className="mt-3 md:mt-2 hidden sm:flex">
            <p
              className="m-0 p-0 text-sm leading-4 text-gray-500 clampMe"
              dangerouslySetInnerHTML={{
                __html: subtitle,
              }}
            />
          </div>
        )}
        {tags && <div className="hidden sm:flex sm:flex-row sm:flex-wrap mt-3 h-8 overflow-hidden">{tags}</div>}
      </div>
    </a>
  );
};

export default ItemRow;
