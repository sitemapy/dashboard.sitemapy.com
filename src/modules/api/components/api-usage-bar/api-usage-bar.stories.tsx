import type { StoryObj } from "@storybook/react";
import { ApiUsageBar } from "./api-usage-bar";

const meta = {
  title: "modules/api/api-usage-bar",
  component: ApiUsageBar,
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
