import React from "react";
import { ListPager } from "./ListPager";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

export default {
  title: "ListPager",
  component: ListPager,
  decorators: [withKnobs],
};

export const Default = (): React.ReactNode => (
  <ListPager
    total={number("Total", 90)}
    page={number("Page", 1)}
    step={number("Step", 20)}
    count={number("Count", 20)}
    slug={text("Slug", "widgets")}
    isTop={boolean("isTop", false)}
  />
);
