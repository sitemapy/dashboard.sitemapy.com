import { HomeRoute } from "@/routes";
import { Router } from "@reach/router";
import * as Sentry from "@sentry/react";
import { ErrorBoundary } from "react-error-boundary";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [],
});

function App() {
  return (
    <ErrorBoundary
      fallback={<div>Error</div>}
      onError={(error) => Sentry.captureException(error)}
    >
      <Router>
        <HomeRoute path="/" />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
