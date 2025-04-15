import classNames from "classnames";
import React from "react";
import { useIntl } from "react-intl";
import ReactMarkdown from "react-markdown";

export const SitemapHero: React.FC = () => {
  const { formatMessage } = useIntl();

  return (
    <div className={classNames("relative")}>
      <div
        className="absolute right-0 top-32 -z-10 hidden animate-bounce xl:block"
        style={{ animationDuration: "4s" }}
      >
        <div className="h-36 w-36 rounded-full bg-blue-50 bg-opacity-50"></div>
      </div>

      <div
        className="absolute left-0 top-32 -z-10 hidden animate-bounce xl:block"
        style={{ animationDuration: "3s" }}
      >
        <div className="h-36 w-36 rotate-12 rounded-lg bg-red-50 bg-opacity-50"></div>
      </div>

      <div className="flex flex-col items-center justify-center text-center">
        <div className="mx-auto block max-w-6xl flex-col text-2xl font-semibold leading-none tracking-tighter text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
          <ReactMarkdown
            components={{
              p: ({ children }) => <>{children}</>,
              em: ({ children }) => (
                <>
                  <br />
                  {children}
                </>
              ),
              strong: ({ children }) => (
                <span className="relative">
                  <span className="absolute bottom-0 left-0 -z-0 h-3/4 w-full -rotate-1 -skew-x-12 rounded bg-pink-100 bg-opacity-50" />
                  <span className="relative">{children}</span>
                </span>
              ),
            }}
          >
            {formatMessage({ id: "sitemapy/hero/title" })}
          </ReactMarkdown>
        </div>

        <div
          className={
            "mx-auto mt-4 max-w-xl tracking-tight text-slate-400 md:max-w-5xl md:text-xl lg:text-xl"
          }
        >
          {formatMessage({ id: "sitemapy/hero/description" })}
        </div>
      </div>
    </div>
  );
};
