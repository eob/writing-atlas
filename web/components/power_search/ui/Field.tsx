import React, { Children } from 'react';

// Single Field component,
// so we don't have to restyle layout, labels, notes, error messages, etc

const Field = ({ label, id, className = null, children }) => {
  const formElement = React.cloneElement(children, { id });

  return (
    <div className={className}>
      <label className="block mb-2 font-semibold" htmlFor={id}>
        {label}
      </label>
      {formElement}
    </div>
  );
};

export default Field;
