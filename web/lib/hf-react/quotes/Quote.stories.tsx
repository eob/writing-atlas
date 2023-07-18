import React from "react";
import { Quote } from "./Quote";
import { withKnobs, text } from "@storybook/addon-knobs";

export default {
  title: "Quote",
  decorators: [withKnobs],
};

export const primary = () => {
  return (
    <Quote
      text={text("Text", "quote content")}
      speaker={text("speaker", "Barack Obama")}
      speakerLink={text("speakerLink", "speakerLink")}
      publication={text("publication", "The New York Times")}
      publicationLink={text("publicationLink", "publicationLink")}
    />
  );
};
