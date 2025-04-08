import type { Meta, StoryObj } from "@storybook/react";
import { Wrapper as SignupForm } from "../signup-form";

const meta = {
  title: "Templates/Signup",
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
  },
};
