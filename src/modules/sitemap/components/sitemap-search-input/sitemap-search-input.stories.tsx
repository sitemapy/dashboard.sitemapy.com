import { StoryObj } from "@storybook/react";
import { Wrapper as SitemapSearchInput } from "./sitemap-search-input";

const meta = {
  title: "modules/sitemap/sitemap-search-input",
  component: SitemapSearchInput,
  parameters: {},
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    sitemap_url: "https://www.sudoku.academy/sitemap.xml",
    onSubmit: () => {},
    onValueChange: () => {},
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    sitemap_url: "https://www.sudoku.academy/sitemap.xml",
    onSubmit: () => {},
    onValueChange: () => {},
    isLoading: true,
  },
};
