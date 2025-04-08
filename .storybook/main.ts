import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  previewHead: (head) => {
    return `
          <script
  src="https://unpkg.com/react-scan@0.3.3/dist/auto.global.js"
></script>
      ${head}

    `;
  },
  viteFinal: (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": "/src",
      };
    }
    return config;
  },
};
export default config;
