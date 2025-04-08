import type { Meta, StoryObj } from "@storybook/react";
import { Layout } from "../layout";
import { BookOpen, Settings2 } from "lucide-react";
import { Bot } from "lucide-react";
import { SquareTerminal } from "lucide-react";
import { OrganizationEntity, UserEntity } from "@sitemapy/interfaces";
import { Navigation } from "@/types";

const meta = {
  title: "Templates/Layout",
  component: Layout,
  parameters: {},
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

const organizations: OrganizationEntity[] = [
  {
    name: "Acme Inc",
    id: "1",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "Acme Corp.",
    id: "2",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "Evil Corp.",
    id: "3",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const user: UserEntity = {
  id: "1",
  created_at: new Date(),
  updated_at: new Date(),
  email: "john.doe@example.com",
  password: "password",
  language: "en",
};

const navMain: Navigation[] = [
  {
    title: "Playground",
    icon: SquareTerminal,
    active: true,
    items: [
      {
        title: "History",
        url: "#",
      },
      {
        title: "Starred",
        url: "#",
      },
      {
        title: "Settings",
        url: "#",
      },
    ],
  },
  {
    title: "Models",
    icon: Bot,
    items: [
      {
        title: "Genesis",
        url: "#",
      },
      {
        title: "Explorer",
        url: "#",
      },
      {
        title: "Quantum",
        url: "#",
      },
    ],
  },
  {
    title: "Documentation",
    icon: BookOpen,
    items: [
      {
        title: "Introduction",
        url: "#",
      },
      {
        title: "Get Started",
        url: "#",
      },
      {
        title: "Tutorials",
        url: "#",
      },
      {
        title: "Changelog",
        url: "#",
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings2,
    items: [
      {
        title: "General",
        url: "#",
      },
      {
        title: "Team",
        url: "#",
      },
      {
        title: "Billing",
        url: "#",
      },
      {
        title: "Limits",
        url: "#",
      },
    ],
  },
];

export const Default: Story = {
  args: {
    children: <div>Hello</div>,
    organizations,
    activeOrganization: organizations[0],
    onSelectOrganization: () => alert("Organization selected"),
    navigation: [navMain],
    user,
    userDropdownNavigation: [
      {
        title: "Playground",
        url: "#",
        icon: SquareTerminal,
      },
    ],
    onAddOrganization: () => alert("Add organization"),
    onLogout: () => alert("Logout"),
  },
};
