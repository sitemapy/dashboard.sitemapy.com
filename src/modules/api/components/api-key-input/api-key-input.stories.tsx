import type { StoryObj } from "@storybook/react";
import { v4 } from "uuid";
import { ApiKeyInput } from "./api-key-input";

const meta = {
  title: "modules/api/api-key-input",
  component: ApiKeyInput,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    api_key: v4(),
    onReset: () => {},
  },
};
