import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SigninTemplate } from "../signin-form";

const meta = {
  title: "Templates/Signin",
  component: SigninTemplate,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SigninTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: () => {},
    onGoogleButtonClick: () => {},
    title: "Welcome back",
    description: "Login with your Apple or Google account",
    separatorText: "Or continue with",
    googleButtonText: "Login with Google",
    emailLabel: "Email",
    passwordLabel: "Password",
    forgotPasswordText: "Forgot your password?",
    loginButtonText: "Login",
    invalidEmailText: "Please enter a valid email",
    invalidPasswordText: "Your password must be at least 8 characters",
    acceptTermsText: (
      <>
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </>
    ),
    signupText: (
      <>
        Don't have an account? <a href="#">Sign up</a>
      </>
    ),
  },
};
