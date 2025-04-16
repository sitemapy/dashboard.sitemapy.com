import type { StoryObj } from "@storybook/react";
import { v4 } from "uuid";
import { ApiKeyHowToUse } from "./api-key-how-to-use";

const meta = {
  title: "modules/api/api-key-how-to-use",
  component: ApiKeyHowToUse,
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    api_key: v4(),
  },
};
