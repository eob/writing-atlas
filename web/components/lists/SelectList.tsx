import React, { useEffect, useState, useCallback } from 'react'
import debounce from 'lodash.debounce'
import Loading from './Loading'

export function Modal({ children, shown, close }) {
  // close modal if escape key is pressed
  useEffect(() => {
    function onKeyDown(e) {
      e.key === 'Escape' && close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
  return shown ? (
    <div className="fixed z-10 inset-0 overflow-y-auto"
      onClick={(e) => {
        // close modal if clicked outside of modal
        close()
        e.stopPropagation()
        e.preventDefault()
      }}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline"
        >
          <div
            onClick={e => {
              // do nothing if anything inside modal is clicked
              e.stopPropagation()
              e.preventDefault()
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export function SelectList({ user=undefined, loading=undefined, onSearch=undefined, renderListItem=undefined, itemName=null, searchResults = [], isAddedToList=undefined, onAddNewItem=undefined }) {
  let query = "Query"

  const [modalShown, toggleModal] = useState(true)
  const [searchTerm, setsearchTerm] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const debouncedHandleSearchChange = useCallback(debounce(onSearch, 1000), [onSearch])

  useEffect(() => {
    setSearchLoading(true)
    debouncedHandleSearchChange(searchTerm)
  }, [searchTerm])

  useEffect(() => {
    setSearchLoading(false)
  }, [searchResults])

  const handleSearchChange = (e) => {
    setsearchTerm(e.target.value)
  }

  const handleRenderListItems = () => {
    if (searchLoading) {
      return (
        <div>{Loading({message: ''})}</div>
      )
    } else if (searchResults.length === 0) {
      return (
        <>
          <br></br>
          <br></br>
          <br></br>
        </>
      )
    } else {
      return (
        searchResults.map(renderListItem)
      )
    }
  }

  useEffect(() => {
    isAddedToList && closeModal()
  }, [isAddedToList])

  const closeModal = () => {
      toggleModal(false)
  }

  const handleClickAddButton = e => {
    setErrorMessage(null)
    onAddNewItem(searchTerm)
      .then(() => {
      toggleModal(false)
    }).catch(e => {
      setErrorMessage('Could not create a list')
    })
  }

  return (
    <Modal
      shown={modalShown}
      close={() => {
        toggleModal(false)
      }}
    >
      <div className="flex flex-col">
        <div className="flex space-x-4">
          <div className="flex-1 min-w-0">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
              <input type="search" name="search" id="search" onKeyUp={handleSearchChange} className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md" autoComplete="off" placeholder={'Find an existing List'} />
            </div>
          </div>
        </div>
        <br></br>
        <hr style={{border: '1px solid gray'}}></hr>
        <br></br>
        {handleRenderListItems()}
        <br></br>
        <div className="flex flex-row">
          <button onClick={closeModal} className="mx-2 inline-flex items-center px-5 py-3 border border-gray-300 shadow-sm text-lg font-medium rounded text-gray-500 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Cancel
          </button>
          <button onClick={handleClickAddButton} className="mx-2 inline-flex items-center px-5 py-3 border border-blue-700 shadow-sm text-lg font-medium rounded text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
              Add new List '{searchTerm}'
          </button>
        </div>
      </div>
    </Modal>
  )
}

