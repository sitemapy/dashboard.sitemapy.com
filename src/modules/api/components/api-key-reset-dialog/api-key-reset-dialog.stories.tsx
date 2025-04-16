import type { StoryObj } from "@storybook/react";
import { ApiKeyResetDialog } from "./api-key-reset-dialog";

const meta = {
  title: "modules/api/api-key-reset-dialog",
  component: ApiKeyResetDialog,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    is_open: true,
    onOpenChange: () => {},
    onReset: () => {},
    is_resetting: false,
  },
};

export const Resetting: Story = {
  args: {
    is_open: true,
    onOpenChange: () => {},
    onReset: () => {},
    is_resetting: true,
  },
};
