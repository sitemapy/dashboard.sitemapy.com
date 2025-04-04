import { CustomIntlProvider } from "@/i18n/components/custom-intl-provider/custom-intl-provider";
import { GlobalAppMounted } from "@/modules/global-events/components/global-app-mounted/global-app-mounted";
import { Notifications } from "@/modules/notifications/components/notifications/notifications";
import { init } from "@/redux/store";
import { Routes } from "@/routes";
import * as Sentry from "@sentry/react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [],
});

const { store } = init({}, "api");

function App() {
  return (
    <ErrorBoundary
      fallback={<div>Error</div>}
      onError={(error) => Sentry.captureException(error)}
    >
      <Provider store={store}>
        <CustomIntlProvider>
          <Routes />
          <Notifications />
          <GlobalAppMounted />
        </CustomIntlProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
