import React, { FC } from "react";

type QuoteTypes = {
  /**
   * Text content of the quote
   */
  text: string;
  /**
   * The speaker of the quote
   */
  speaker: string;
  /**
   * The link to the speaker of the quote
   */
  speakerLink: string;
  /**
   * The publication of the quote
   */
  publication: string;
  /**
   * The publication link to of the quote
   */
  publicationLink: string;
};


export const Quote: FC<QuoteTypes> = ({
  // eslint-disable-next-line react/prop-types
  text,
  // eslint-disable-next-line react/prop-types
  speaker = null,
  // eslint-disable-next-line react/prop-types
  speakerLink = null,
  // eslint-disable-next-line react/prop-types
  publication = null,
  // eslint-disable-next-line react/prop-types
  publicationLink = null,
}) => {
  const Speaker = speaker ? (
    speakerLink ? (
      <a href={speakerLink}>{speaker}</a>
    ) : (
      <span>{speaker}</span>
    )
  ) : null;

  const Publication = publication ? (
    publicationLink ? (
      <a href={publicationLink}>{publication}</a>
    ) : (
      <span>{publication}</span>
    )
  ) : null;

  return (
    <div>
      {text}
      {Speaker}
      {Publication}
    </div>
  )
};

export default Quote;
