import type { Meta, StoryObj } from "@storybook/react";
import { Wrapper as ForgotPasswordResetForm } from "../forgot-password-form-reset";

const meta = {
  title: "modules/authentication/forgot-password-form-reset",
  component: ForgotPasswordResetForm,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ForgotPasswordResetForm>;

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
