import React from "react";
import Tab from "./Tab";
import { withNextRouter } from "storybook-addon-next-router";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

export default {
  title: "Tab",
  component: Tab,
  decorators: [withNextRouter, withKnobs],
};

export const Default = (): React.ReactNode => (
  <Tab
    label={text("Label", "My Tab")}
    side={boolean("Side", false)}
    isSelected={boolean("Is Selected", false)}
    icon={null}
  />
);

Default.story = {
  parameters: {
    nextRouter: {
      path: "/profile/[id]",
      asPath: "/profile/lifeiscontent",
      query: {
        id: "lifeiscontent",
      },
    },
  },
};