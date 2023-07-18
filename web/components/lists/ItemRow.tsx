import React, { FC } from "react";
import { Tag } from '../tag/Tag'
import { Img } from "react-image";
import { FavoriteStar } from "./FavoriteStar";
import { AddToList } from "./AddToList"
import {int} from "aws-sdk/clients/datapipeline";

type ItemRowType = {
  /**
   * Title of the item
   */
  title: string;
  /**
   * Subtitle of the item
   */
  subtitle?: string;
  /**
  * Number of stories associated with the item
  */
  fileCount?: number
  /**
   * Tab icon
   */
  iconHref?: any;
  /**
   * Tab icon alternative text
   */
  iconAlt?: string;
  /**
   * Pad in the icon space even if no icon present
   */
  iconPad?: boolean;
  /**
   * The NEXT Link as value
   */
  asLink?: string;
  /**
   * The href the tag links to
   */
  href?: string;
  /**
   * the word count
   */
  wordCount?: string;
  /**
   * Name of the author
   */
  author?: string;
  /**
   * URL of the author
   */
  authorHref?: string;
  /**
   * Name of the author
   */
  publication?: string;
  /**
   * URL of the author
   */
  publicationHref?: string;
  /**
   * Date or time of the item
   */
  dateTime?: string;
  /**
   * Tag to prepend name with
   */
  tag?: typeof Tag;
  /**
   * Tags to include
   */
  tags?: typeof Tag[];
  /**
   * Hearted
   */
  hearted?: boolean;
  /*
   * Shows / offers heart
   */
  offersHeart?: boolean;
  /*
   * Shows / offers list
   */
  offersList?: boolean;
  /**
   * The subkind of the hart object (eg file)
   */
  heartSubKind?: string;
  /**
   * The handle of heart object
   */
  heartObjectHandle?: string;
  /**
   * The user object
   */
  user?: any;
  /*
   * Whether the user is loading
   */
  loading?: boolean
  /*
   * Whether to highlight item
   */
  highlight?: boolean
  /*
  * Function
  */
  addedToList?: boolean

};

export const ItemRow: FC<ItemRowType> = ({
  href = "#",
  title = "Some Item",
  subtitle = null,
  fileCount = null,
  asLink = null,
  iconHref = null,
  iconAlt = null,
  iconPad = false,
  wordCount = null,
  author = null,
  authorHref = null,
  publication = null,
  publicationHref = null,
  dateTime = null,
  tag = null,
  tags = null,
  hearted = false,
  addedToList = false,
  offersHeart = false,
  offersList = false,
  heartSubKind = null,
  heartObjectHandle = null,
  user = null,
  loading = null,
  highlight = false,
}) => {
  const icon =
    iconHref != null ? (
        <div
            style={{maxWidth: "25%", minWidth: "25%"}} // @eric-zhizu Not sure why width: 25% doesn't quite work, but this does
            className="pl-4 pr-0 lg:pl-6 align-middle self-center md:flex overflow-hidden max-h-48"
        >
          <Img
            alt={iconAlt}
            className="object-cover"
            src={iconHref}
          />
        </div>
    ) : null;

  // if (subtitle && subtitle.length && subtitle.length > 200) {
  //   for (let i = 175; i >= 0; i--) {
  //     if (subtitle[i] == ' ') {
  //       subtitle = subtitle.substr(0, i-1) + '...'
  //       break
  //     }
  //   }
  // }
  // None

  const highlightStyle = highlight ? 'bg-yellow-50 border border-yellow-300' : 'bg-white border border-black-50';
  // Add padding if there is an image
  const paddingStyle = iconHref ? 'pt-2 pb-2 sm:pt-0 sm:pb-0' : 'pt-0 pb-0';

  return (
    <a
      href={href}
      className={`flex flex-row rounded-lg shadow-lg overflow-hidden mb-10 ${highlightStyle} ${paddingStyle}`}
    >
      {(iconHref || iconPad) && icon}
      <div className="flex-grow p-3 md:p-4 lg:px-6 flex flex-col overflow-hidden">
        <div className="flex flex-row justify-between mt-2 sm:mt-1">
          <h3 className="text-md flex-row sm:text-xl leading-7 font-semibold text-gray-900 whitespace-normal flex items-center">
            {tag && (tag)} {title}
          </h3>
          <div>
            { offersList && 
              <AddToList 
                value={addedToList} 
                user={user} 
                loading={loading} 
                tagName={'Favorite'}
                tagSubKind={heartSubKind}
                objectHandle={heartObjectHandle}
                icon="plus"
              /> }
            { offersHeart && 
              <FavoriteStar 
                value={hearted} 
                user={user} 
                loading={loading} 
                tagName={'Favorite'}
                tagSubKind={heartSubKind}
                objectHandle={heartObjectHandle}
              /> 
            }
            { fileCount && (
              <div className="text-sm leading-5 text-gray-500">
                <time>{fileCount} {fileCount === 1 ? "story" : "stories"}</time>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row">
          {author && (
            <a
              href={authorHref}
              className="text-sm leading-5 font-medium text-gray-900 hover:underline truncate"
            >
              {author}
            </a>
          )}
        </div>
        <div className="flex flex-row">
          {publication && (
            <a
              href={publicationHref}
              className="text-sm leading-5 font-medium text-gray-900 hover:underline max-w-sm truncate"
            >
              {publication}
            </a>
          )}
          {publication && dateTime && (
            <span className="text-sm leading-5 font-medium text-gray-900 mr-1">
              ,{" "}
            </span>
          )}
          {dateTime && (
            <div className="text-sm leading-5 text-gray-500">
              <time>{dateTime}</time>
            </div>
          )}
          {(publication || dateTime) && (
            <span className="text-sm leading-5 font-medium text-gray-900 mr-1">
              {" "}
            </span>
          )}
          {wordCount && (
            <div className="text-sm leading-5 text-gray-500 truncate">
              <time>{wordCount} words</time>
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
