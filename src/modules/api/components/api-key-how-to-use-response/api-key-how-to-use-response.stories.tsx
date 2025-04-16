import type { StoryObj } from "@storybook/react";
import { ApiKeyHowToUseResponse } from "./api-key-how-to-use-response";

const meta = {
  title: "modules/api/api-key-how-to-use-response",
  component: ApiKeyHowToUseResponse,
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
