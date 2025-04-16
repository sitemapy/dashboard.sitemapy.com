import type { Meta, StoryObj } from "@storybook/react";
import { Wrapper as SigninForm } from "../signin-form";

const meta = {
  title: "modules/authentication/signin-form",
  component: SigninForm,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SigninForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: () => {},
    onGoogleButtonClick: () => {},
  },
};
