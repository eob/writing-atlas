import React from "react";

export type CardTitleFooterType = {
  /**
   * Title of the tabs
   */
  title?: string;

  /**
   * Subtitle of the tabs
   */
  subtitle?: string;

  /**
   * Subtitle of the tabs
   */
  footer?: any;

  /**
   * Subtitle of the tabs
   */
  tabs?: any;

  /**
   * @eric-zhizu: Added because it was missing, not sure what this is
   */
  children?: any;
};

export const CardTitleFooter: React.FC<CardTitleFooterType> = ({
  // eslint-disable-next-line react/prop-types
  title,
  // eslint-disable-next-line react/prop-types
  subtitle,
  // eslint-disable-next-line react/prop-types
  footer,
  // eslint-disable-next-line react/prop-types
  tabs,
  // eslint-disable-next-line react/prop-types
  children,
}) => {
  return (
    <div
      key={title}
      className="bg-white overflow-hidden shadow sm:rounded-lg mb-10"
    >
      <div className="border-b border-gray-20">
        <h3 className="text-xl leading-8 font-medium px-4 py-5 sm:px-6">
          {title}
        </h3>
        {subtitle && (
          <h3 className="text-md leading-8 font-light px-4 -my-6 pb-7 text-gray-500 sm:px-6">
            {subtitle}
          </h3>
        )}
        {tabs}
      </div>
      <div className="px-4 py-5 sm:p-6">{children}</div>
      {footer && (
        <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
          {footer}
        </div>
      )}
    </div>
  );
};

// note: border-b border-gray-200 used to be on the h3