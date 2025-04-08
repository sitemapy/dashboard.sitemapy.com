import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SignupTemplate } from "../signup-form";

const meta = {
  title: "Templates/Signup",
  component: SignupTemplate,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SignupTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: () => {},
    onGoogleButtonClick: () => {},
    confirmPasswordLabel: "Confirm password",
    title: "Create an account",
    description: "Create an account with your email and password",
    separatorText: "Or continue with",
    googleButtonText: "Sign up with Google",
    emailLabel: "Email",
    passwordLabel: "Password",
    loginButtonText: "Sign up",
    invalidEmailText: "Invalid email",
    invalidPasswordText: "Invalid password",
    confirmPasswordNotMatchError: "Passwords must match",
    acceptTermsText: (
      <>
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>
        .
      </>
    ),
    signupText: (
      <>
        Already have an account?{" "}
        <a href="#" className="underline">
          Sign in
        </a>
      </>
    ),
  },
};
