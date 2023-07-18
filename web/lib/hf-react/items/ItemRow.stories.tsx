import React from "react";
import ItemRow from "./ItemRow";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import Tag from "../tag";

export default {
  title: "Item Row",
  component: ItemRow,
  decorators: [withKnobs],
};

export const Default = (): React.ReactNode => {
  const tags = text("Tags CSV", "Tag1")
    .split(",")
    .map((x) => <Tag key={x} label={x} />);

  const iconHref = text(
    "Icon",
    "https://storage.googleapis.com/covers.data.robotbookclub.com/9781683600107_Seibert.jpg"
  );
  
  let longDefault = "foo ";
  for (let i = 0; i < 13; i++) {
    longDefault = `${longDefault} ${longDefault}`;
  }
  return (
    <ItemRow
      title={text("Title", "Title")}
      subtitle={text("Subtitle", longDefault)}
      author={text("Author", "Author")}
      tags={(tags as unknown) as typeof Tag[]}
      iconHref={iconHref}
      iconAlt={text("iconAlt", "Alt text")}
      iconPad={boolean("iconPad", false)}
      dateTime={text("Date Time", "January")}
    />
  );
}
