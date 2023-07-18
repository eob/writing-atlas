import React from "react";
import Tabs from "./Tabs";
import { withNextRouter } from "storybook-addon-next-router";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

export default {
  title: "Tabs",
  component: Tabs,
  decorators: [withNextRouter, withKnobs],
};

export const Default = (): React.ReactNode => {
  const labels = text("Labels CSV", "My Tab");
  const baseUrl = text("As HREF", "/user");

  return (
    <Tabs
      slug={text("Slug", "slug")}
      labels={labels.split(",")}
      keys={text("Keys CSV", "my-tab").split(",")}
      asHref={baseUrl}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      panels={labels.split(",").map((x: React.ReactNode) => {
        // eslint-disable-next-line react/jsx-key
        return <div>Body for {x}</div>;
      })}
      side={boolean("Side", false)}
    />
  );
};

Default.story = {
  parameters: {
    nextRouter: {
      path: "/user",
      asPath: "/user",
    },
  },
};