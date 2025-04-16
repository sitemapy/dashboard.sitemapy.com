import { cn } from "@/lib/utils";
import { Button } from "@/ui";
import { CornerDownLeftIcon, Loader2, SearchIcon } from "lucide-react";
import React from "react";
import { FormattedMessage } from "react-intl";
import {
  connector,
  ContainerProps,
} from "./containers/sitemap-search-input.container";

export const Wrapper: React.FC<ContainerProps> = (props) => {
  return (
    <form
      className="relative flex flex-grow items-stretch"
      onSubmit={(e) => {
        e.preventDefault();
        if (props.isLoading) return;
        props.onSubmit(props.sitemap_url || "");
      }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <SearchIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center p-2">
        <Button type="submit" variant="outline">
          {props.isLoading ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <>
              <span className="hidden md:inline">
                <FormattedMessage id="sitemapy/input/submit" />
              </span>
              <CornerDownLeftIcon className="inline-block h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      <input
        type={"url"}
        required
        autoComplete="off"
        autoFocus
        disabled={props.isLoading}
        className={cn(
          "block h-14 w-full rounded-md border border-slate-200 bg-white pl-10 text-slate-900 placeholder-slate-400 outline-0  ring-pink-100 focus:border-pink-300 focus:ring-2 focus:ring-pink-100",
          props.isLoading && "opacity-50"
        )}
        placeholder={"https://www.foudroyer.com/sitemap.xml"}
        value={props.sitemap_url || ""}
        onChange={(e) => props.onValueChange(e.target.value)}
      />
    </form>
  );
};

export const SitemapSearchInput = connector(Wrapper);
