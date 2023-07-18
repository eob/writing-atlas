import React, { useState, useEffect, FC } from "react";
import { createLoginUrl } from '../account/LogInOutHelper'
import { SelectList } from './SelectList'
import { ToggleListAssociation, GetLists, CreateOrFetchList } from '../api/List'
import { useRouter } from 'next/router'

type AddToListType = {
  /**
   * The handle of plus object
   */
  objectHandle?: string;
  /**
   * AddedToList
   */
  value?: boolean;
  /**
   * SelectingList
   */
  value2?: boolean;
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
  icon?: null | "plus"
};

const A_CLASS = "inline-flex items-center px-3 py-2 leading-4 font-medium h-8"

export function Plus() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

export const AddToList: FC<AddToListType> = ({
  tagKind = 'LIST',
  tagSubKind = null,
  tagName = null,
  objectHandle = null,
  value = false,
  value2 = false,
  user = null,
  loading = null,
  caption = null,
  icon = null
}) => {

  const [isSelectingList, setSelectingList] = useState(value2)
  const [isAddedToList, setAddedToList] = useState(value)
  const [searchResults, setSearchResults] = useState([])

  let iconE = ((icon == null) || (icon == "plus")) &&

  <Plus />
  
  const toggleSelectingList = e => {
    setSelectingList(!isSelectingList)
    e.stopPropagation()
    e.preventDefault()
  }

  const router = useRouter()
  
  const reloadItems = () => {
    router.replace(`${window.location.pathname}#${objectHandle}`)
    router.reload()
  }

  const handleCreateList = listName => {
    return CreateOrFetchList(listName)
      .then(newListResult => {
        const { data: { handle: destructuredHandle } } = newListResult as any
        return ToggleListAssociation(objectHandle, destructuredHandle, true)
      })
      .then(() => {
        setAddedToList(true)
        reloadItems()
      })
  }

  const onSelectExistingItem = e => {
    ToggleListAssociation(objectHandle, e.target.innerText.toLowerCase(), true)
      .then(() => {
        setAddedToList(true)
        e.stopPropagation()
        e.preventDefault()
        reloadItems()
      })
  }

  const onSearchHandler = (term) => {
    GetLists(term)
      .then(res => {
        const { data: {data: destructuredResults}} = res
        destructuredResults !== null && term.length !== 0 ? setSearchResults(destructuredResults) : setSearchResults([])
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }

  const renderListItemHandler = result => {
      return (
        <div onClick={onSelectExistingItem} className="border-2 border-grey-200 mb-4">
          <p className="text-blue-700 mt-4 mb-2 ml-4">{result.name}</p>
          <p className="text-gray-500 mb-4 mt-2 ml-4"><i>{result.handle}</i></p>
        </div>
      )
  }

  if ((loading === true) || (user === null)) {
    return (
      <a className={A_CLASS} href={createLoginUrl()}>
        {iconE}
        {caption && <span className=''>{caption}</span>}
      </a>
    );
  } else {

      return (
        <>
          <button className={A_CLASS} onClick={toggleSelectingList}>
            {iconE}
            {caption && <span className='ml-1'>{caption}</span>}
          </button>
          {
            isSelectingList &&
            < SelectList
              user={user}
              loading={loading}
              onSearch={onSearchHandler}
              searchResults={searchResults}
              renderListItem={renderListItemHandler}
              isAddedToList={isAddedToList}
              onAddNewItem={handleCreateList}
            />
          }
        </>
      );
    }
}
