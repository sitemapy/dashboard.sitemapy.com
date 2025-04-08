import "@/index.css";
import "@sitemapy/ui/style.css";
import { ComponentType } from "react";

import type { Preview } from "@storybook/react";
import { Provider } from "react-redux";
import { CustomIntlProvider } from "../src/i18n/components/custom-intl-provider/custom-intl-provider";
import { init } from "../src/redux/store";
const { store } = init();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story: ComponentType) => (
      <Provider store={store}>
        <CustomIntlProvider>
          <Story />
        </CustomIntlProvider>
      </Provider>
    ),
  ],
};

export default preview;
