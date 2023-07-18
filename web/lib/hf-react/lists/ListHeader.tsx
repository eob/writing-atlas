import React from "react";

type ListHeaderType = {
  /**
   * Title of the item
   */
  title: string;
  /**
   * Subtitle of the item
   */
  subtitle: string;
  /**
   * Supertitle
   */
  supertitle: string;
  /**
   * Link for the supertitle
   */
  supertitlelink: string;
  /**
   * A longer description for the item
   */
  description: string;
};

export const ListHeader: React.FC<ListHeaderType> = ({
  // eslint-disable-next-line react/prop-types
  supertitle,
  // eslint-disable-next-line react/prop-types
  supertitlelink,
  // eslint-disable-next-line react/prop-types
  title,
  // eslint-disable-next-line react/prop-types
  subtitle,
  // eslint-disable-next-line react/prop-types
  description,
}) => {
  return (
    <div className="bg-global">
      <div className="max-w-screen-xl mx-auto pt-16 pb-8 px-4 sm:pt-24 sm:pb-12 sm:px-6 lg:px-8">
        <div className="text-center">
          {supertitle && (
            <a href={supertitlelink}>
              <h1 className="text-base leading-6 font-semibold text-indigo-600 tracking-wide uppercase">
                {supertitle}
              </h1>
            </a>
          )}
          {title && (
            <p className="mt-1 text-4xl leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
              {title}
            </p>
          )}
          {subtitle && (
            <p className="max-w-xl mt-5 mx-auto text-xl leading-7 text-gray-500">
              {subtitle}
            </p>
          )}
          {description && (
            <p
              className="max-w-4xl mt-5 mx-auto text-md leading-7 text-gray-700"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            ></p>
          )}
        </div>
      </div>
    </div>
  );
};