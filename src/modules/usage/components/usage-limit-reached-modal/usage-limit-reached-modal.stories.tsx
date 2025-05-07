import type { StoryObj } from "@storybook/react";
import { Wrapper as UsageLimitReachedModal } from "./usage-limit-reached-modal";

const meta = {
  title: "modules/usage/usage-limit-reached-modal",
  component: UsageLimitReachedModal,
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { is_open: true, on_close: () => {} },
};
