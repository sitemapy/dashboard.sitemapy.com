import type { Meta, StoryObj } from "@storybook/react";
import { Wrapper as ForgotPasswordForm } from "../forgot-password-form";

const meta = {
  title: "modules/authentication/forgot-password-form",
  component: ForgotPasswordForm,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ForgotPasswordForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: () => {},
    is_loading: false,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    is_loading: true,
  },
};
