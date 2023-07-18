import React from "react";
import { Tag } from './tag';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";

export default {
  title: "Tag",
  decorators: [withKnobs]
};

export const primary = () => {
  const label = text("Label", "See now");
  const handle = text("handle", "see-now");
  const kind = select(
    "kind", 
    {"Collection": "COLLECTION", "Tag": "TAG"}, 
    "COLLECTION"
  );

  return (
    <Tag label={label} handle={handle} kind={kind} />
  )
};