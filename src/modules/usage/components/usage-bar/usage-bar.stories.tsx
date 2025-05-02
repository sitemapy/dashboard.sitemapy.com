import type { StoryObj } from "@storybook/react";
import { UsageBar } from "./usage-bar";

const meta = {
  title: "modules/usage/usage-bar",
  component: UsageBar,
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    actual_usage: 100,
    total_usage_limit: 1000,
    usage_reset_date: new Date(),
  },
};
