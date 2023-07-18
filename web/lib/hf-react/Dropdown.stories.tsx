import React from "react";
import { Dropdown } from './Dropdown';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";

export default {
  title: "Dropdown",
  decorators: [withKnobs],
};

export const primary = () => {
  const values = text("Values", "One,Two,Three").split(",");

  return <Dropdown onChange={() => {}} values={values} />;
};