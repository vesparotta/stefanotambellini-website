import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { VideoVHS } from "./VideoVHS";

export default {
  title: "VideoVHS",
  component: VideoVHS,
} as ComponentMeta<typeof VideoVHS>;

const Template: ComponentStory<typeof VideoVHS> = (args) => (
  <VideoVHS {...args} />
);

export const Primary = Template.bind({});
