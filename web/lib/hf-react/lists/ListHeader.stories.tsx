import React from "react";
import { ListHeader } from "./ListHeader";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

export default {
  title: "ListHeader",
  component: ListHeader,
  decorators: [withKnobs],
};

export const Default = (): React.ReactNode => (
  <ListHeader
    supertitle={text("Supertitle", "Supertitle")}
    supertitlelink={text("Supertitle Link", "#")}
    title={text("Title", "Title")}
    subtitle={text("Subtitle", "Subtitle")}
    description={text("Description", "Description")}
  />
);
