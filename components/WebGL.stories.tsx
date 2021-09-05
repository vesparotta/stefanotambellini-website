import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import WebGL from "./WebGL";

export default {
  title: "Example/WebGL",
  component: WebGL,
} as ComponentMeta<typeof WebGL>;

const Template: ComponentStory<typeof WebGL> = (args) => <WebGL {...args} />;

export const Primary = Template.bind({});
