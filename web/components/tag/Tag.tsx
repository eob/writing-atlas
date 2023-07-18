import React, { FC } from "react";
import { titleCase } from "title-case";
import { ToggleListAssociation } from '../api/List'
import { useRouter } from 'next/router'

export type TagKind = "TAG" | "COLLECTION" | "IFYOULIKE" | "HONOR" | "LIST" | "AUTHOR" | "AGENT" | "AGENCY";

export type TagI = {
  /**
   * Label of the tag
  */
  label: string;
  /**
   * The handle of the tag
  */
  name?: string;
  
  handle?: string;
  /**
   * The kind of tag (Tag | Collection)
  */
  kind?: TagKind;
  /**
   * The category of the tag within its macro category. For example, within TAG
   * there are sub-kinds Genre, Ending, Character, etc.
   */
  subKind?: string;
  /**
   * if the tag is deletable or not
  */
  deletable?: boolean;
  /**
   * The href the tag links to
  */
  href?: string;
  /**
   * The objectHandle of the tag
  */
  objectHandle?: string;
}

const BASE_TAG = "mr-2 px-3 my-1 py-1 text-xs font-semibold rounded-full whitespace-nowrap";

export const Tag: FC<TagI> = ({
  // eslint-disable-next-line react/prop-types
  href,
  // eslint-disable-next-line react/prop-types
  label = null,
  // eslint-disable-next-line react/prop-types
  name = null,
  // eslint-disable-next-line react/prop-types
  handle = "some-tag",
  // eslint-disable-next-line react/prop-types
  kind,
  deletable,
  objectHandle
}) => {
  if ((name != null) && (label == null)) {
    label = name;
  }
  if (label == null) {
    label = "Some Tag"
  }
  const url = href
    ? href
    : kind === "COLLECTION"
    ? `/collection/${handle}`
    : kind === "IFYOULIKE"
    ? `/recommendation/${handle}`
    : kind === "HONOR"
    ? `/honor/${handle}`
    : kind === "LIST"
    ? `/tag/list/${handle}`
    : kind === "TAG"
    && `/tag/${handle}`
  
  let color = "text-green-800";
  let bg = "bg-green-100";

  if (kind == "TAG") {
    color = "text-blue-800"
    bg = "bg-blue-100"
  } else if (kind == "AUTHOR") {
    color = "text-red-800"
    bg = "bg-red-100"
  } else if (kind == "AGENT") {
    color = "text-yellow-800"
    bg = "bg-yellow-100"
  } else if (kind == "AGENCY") {
    color = "text-orange-800"
    bg = "bg-orange-100"
  } else {
    color = "text-blue-800"
    bg = "bg-blue-100"
  }

  const router = useRouter()

  const reloadItems = () => {
    router.replace(`${window.location.pathname}#${objectHandle}`)
    router.reload()
  }

  const onDelete = e => {
    e.stopPropagation()
    e.preventDefault()
    const confirmed = confirm('Are you sure you want to delete this Tag from the story?')
    if (confirmed) {
      ToggleListAssociation(objectHandle, label, false)
        .then(() => {
          e.stopPropagation()
          e.preventDefault()
          reloadItems()
        })
    }
  }

  return (
    <a
      href={url}
      key={url}
      className={`${BASE_TAG} ${color} ${bg}`}
    >
      {titleCase(label)}
      {deletable && (<button className="ml-1 text-blue-800" onClick={onDelete}>&#10005;</button>)}
    </a>
  );
};

export default Tag;
