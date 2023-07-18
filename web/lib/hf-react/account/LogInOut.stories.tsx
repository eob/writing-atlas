import React from "react";
import { LogInOut } from "./LogInOut";
import { withKnobs, text, select } from "@storybook/addon-knobs";

export default {
  title: "LogInOut",
  component: LogInOut,
  decorators: [withKnobs],
};

export const Default = (): React.ReactNode => {
  const kind = select(
    "type",
    { button: "button", buttonSmall: "buttonSmall", link: "link" },
    "button",
  );

  return <LogInOut type={kind} redirectTo={text("Redirect To", "#")} />;
};
