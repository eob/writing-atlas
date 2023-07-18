import { forwardRef, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import cx from 'classnames';

export default function Modal({
  close,
  isOpen,
  title = '',
  submit = () => null,
  ok = '',
  cancel = '',
  children = null,
  initialFocus
}) {
  const BUTTON_STYLES = cx(
    'w-full inline-flex justify-center px-4 py-2',
    'rounded-md border shadow-sm text-base font-medium sm:text-sm'
  );

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={close}
          initialFocus={initialFocus}
        >
          <div className="h-screen flex items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay
                className={cx(
                  'fixed inset-0',
                  'bg-black bg-opacity-70 transition-opacity'
                )}
              />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className={cx(
                  'inline-block min-w-sm max-w-full p-6 my-8',
                  'overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'
                )}
              >
                {title ? (
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                ) : null}

                <form onSubmit={(e) => e.preventDefault()}>
                  {children ? <div className="mt-4">{children}</div> : null}

                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    {ok ? (
                      <input
                        type="submit"
                        className={cx(
                          BUTTON_STYLES,
                          'sm:col-start-2',
                          'border-transparent bg-indigo-600  text-white',
                          'hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        )}
                        onClick={() => {
                          submit();
                          close();
                        }}
                        value={ok}
                      />
                    ) : null}

                    {cancel ? (
                      <input
                        type="button"
                        className={cx(
                          BUTTON_STYLES,
                          'mt-3 sm:mt-0 sm:col-start-1',
                          'border-gray-300 bg-white text-gray-700',
                          'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        )}
                        onClick={close}
                        value={cancel}
                      />
                    ) : null}
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
