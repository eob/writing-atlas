import React, { useState, FC } from "react";
import {ToggleListAssociation} from '../api/List'
import { createLoginUrl } from '../account/LogInOutHelper'

type FavoriteStarType = {
  /**
   * The handle of heart object
   */
  objectHandle?: string;
  /**
   * Hearted
   */
  value?: boolean;  
  /**
   * The kind of tag
   */
  tagKind?: string;  
  /**
   * The kind of tag
   */
  tagName?: string;  
  /**
   * The subkind of tag
   */
  tagSubKind?: string;  
  /**
   * The user object
   */
   user?: any;
  /*
   * Whether the user is loading
   */
  loading?: boolean
  /*
   * Caption
   */
  caption?: string
  /*
   * Icon
   */
  icon?: null | "heart" | "plus"
};

const A_CLASS = "inline-flex items-center px-3 py-2 leading-4 font-medium h-8"

export function Plus({stroke, fill, hover}) {
  return (
    <svg className={`w-6 h-6 ${stroke}`} xmlns="http://www.w3.org/2000/svg" fill={fill} viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  )
}

export function Heart({stroke, fill, hover}) {
  return (
    <svg className={`w-6 h-6 ${stroke}`} xmlns="http://www.w3.org/2000/svg" fill={fill} viewBox="0 0 24 24" stroke={stroke}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  )
}

export const FavoriteStar: FC<FavoriteStarType> = ({
  tagKind = 'LIST',
  tagSubKind = null,
  tagName = null,
  objectHandle = null,
  value = false,
  user = null,
  loading = null,
  caption = null,
  icon = null
}) => {
  const [isHearted, setHearted] = useState(value);
  let fill = isHearted ? "#EF4444" : "none";
  let stroke = isHearted ? "#7F1D1D" : "currentColor"
  let hover = "hover:bg-red-700"
  let iconE = ((icon == null) || (icon == "heart")) ? 
    <Heart stroke={stroke} fill={fill} hover={hover} /> : 
    <Plus stroke={stroke} fill={fill} hover={hover} /> ;

  if ((loading === true) || (user === null)) {
    return (
      <a className={A_CLASS} href={createLoginUrl()}>
        {iconE}
        {caption && <span className=''>{caption}</span>}
      </a>
    );
  }
  
  const toggleHearted = e => {
    setHearted(!isHearted);
    e.stopPropagation();
    e.preventDefault();

    ToggleListAssociation(objectHandle, 'favorite', (!isHearted))
  }

  return (
    <button className={A_CLASS} onClick={toggleHearted}>
      {iconE}
      {caption && <span className='ml-1'>{caption}</span>}
    </button>
  );
};
