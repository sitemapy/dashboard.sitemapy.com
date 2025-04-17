import type { StoryObj } from "@storybook/react";
import { Wrapper as OrganizationCreateDialog } from "./organization-create-dialog";

const meta = {
  title: "modules/organization/organization-create-dialog",
  component: OrganizationCreateDialog,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    is_open: true,
    on_close: () => {},
    create_organization: () => {},
    is_creating: false,
  },
};

export const Creating: Story = {
  args: {
    is_open: true,
    on_close: () => {},
    create_organization: () => {},
    is_creating: true,
  },
};
