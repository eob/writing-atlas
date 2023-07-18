import React, { FC } from "react";

type TagTypes = {
  /**
   * Label of the tag
  */
  label: string;
  /**
   * The handle of the tag
  */
  handle?: string;
  /**
   * The kind of tag (Tag | Collection)
  */
  kind?: "TAG" | "COLLECTION";
  /**
   * The href the tag links to
  */
  href?: string;
}

const BASE_TAG = "mr-2 px-3 my-1 py-1 text-xs font-semibold rounded-full whitespace-nowrap";

export const Tag: FC<TagTypes> = ({
  // eslint-disable-next-line react/prop-types
  href,
  // eslint-disable-next-line react/prop-types
  label = "Some Tag",
  // eslint-disable-next-line react/prop-types
  handle = "some-tag",
  // eslint-disable-next-line react/prop-types
  kind,
}) => {
  const url = href
    ? href
    : kind === "COLLECTION"
    ? `/collection/${handle}`
    : `/tag/${handle}`;
  const color = kind === "TAG" ? "green" : "blue";
  return (
    <a
      href={url}
      key={url}
      className={`${BASE_TAG} bg-${color}-100 text-${color}-800`}
    >
      {label}
    </a>
  );
};

export default Tag;
