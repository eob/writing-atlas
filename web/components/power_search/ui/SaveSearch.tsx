import { useState, useRef } from 'react';
import cx from 'classnames';

import Field from './Field';
import Modal from './Modal';
import { INPUT_CLASSNAMES } from './const';

export default function SaveSearch({ onNameChange, close, isOpen, save }) {
  const inputRef = useRef(null);

  return (
    <Modal
      close={close}
      isOpen={isOpen}
      title="Save Search"
      submit={save}
      ok="Save"
      cancel="Cancel"
      initialFocus={inputRef}
    >
      <Field id="save-search-name" label="Name">
        <input
          ref={inputRef}
          className={cx(INPUT_CLASSNAMES, 'w-full')}
          type="text"
          onChange={({ target: { value } }) => onNameChange(value)}
        ></input>
      </Field>
    </Modal>
  );
}
