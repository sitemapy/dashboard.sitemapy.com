import type { Meta, StoryObj } from "@storybook/react";
import { Wrapper as SignupForm } from "../signup-form";

const meta = {
  title: "modules/authentication/signup-form",
  component: SignupForm,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SignupForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: () => {},
    onGoogleButtonClick: () => {},
    is_loading: false,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    is_loading: true,
  },
};
