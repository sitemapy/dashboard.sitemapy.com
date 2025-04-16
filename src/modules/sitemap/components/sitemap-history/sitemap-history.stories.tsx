import { Wrapper as SitemapHistory } from "./sitemap-history";

const meta = {
  title: "modules/sitemap/sitemap-history",
  component: SitemapHistory,
  parameters: {},
};

export default meta;

export const Default = () => {
  return (
    <SitemapHistory
      is_loading={false}
      history={[
        {
          sitemap_url: "https://www.google.com/sitemap.xml",
          created_at: new Date(),
        },
        {
          sitemap_url: "https://www.google.com/sitemap.xml",
          created_at: new Date(),
        },
        {
          sitemap_url: "https://www.google.com/sitemap.xml",
          created_at: new Date(),
        },
        {
          sitemap_url: "https://www.google.com/sitemap.xml",
          created_at: new Date(),
        },
        {
          sitemap_url: "https://www.google.com/sitemap.xml",
          created_at: new Date(),
        },
        {
          sitemap_url: "https://www.google.com/sitemap.xml",
          created_at: new Date(),
        },
        {
          sitemap_url: "https://www.google.com/sitemap.xml",
          created_at: new Date(),
        },
        {
          sitemap_url: "https://www.google.com/sitemap.xml",
          created_at: new Date(),
        },
        {
          sitemap_url: "https://www.google.com/sitemap.xml",
          created_at: new Date(),
        },
      ]}
      onClick={() => {}}
      onMount={() => {}}
    />
  );
};

export const Loading = () => {
  return (
    <SitemapHistory
      is_loading={true}
      history={[]}
      onClick={() => {}}
      onMount={() => {}}
    />
  );
};
