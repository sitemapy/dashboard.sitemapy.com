import { format_url_for_sitemap } from "@/modules/sitemap/utils/format-url-for-sitemap";
import { Button } from "@sitemapy/ui";
import clsx from "clsx";
import {
  ChevronDownIcon,
  ExternalLinkIcon,
  FileIcon,
  FileStackIcon,
  FolderIcon,
  FolderTreeIcon,
} from "lucide-react";
import React from "react";
import { SitemapStatusBar } from "../sitemap-status-bar/sitemap-status-bar";
import { connector, ContainerProps } from "./sitemap-results-item.container";

const Wrapper: React.FC<ContainerProps> = (props) => {
  const has_children = props.children.length > 0;

  return (
    <div className={clsx("mt-2")}>
      <div
        ref={(el) => {
          if (el) {
            el.style.top = `${props.depth * (el.clientHeight + 4)}px`;
          }
        }}
        className={clsx("sticky rounded-md border bg-white px-2 py-2")}
        style={{
          marginLeft: `${props.depth * 24}px`,
          zIndex: 40 - props.depth,
        }}
      >
        <div className="flex items-start">
          {has_children && (
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => props.toggle_collapse_folder(props.url)}
                variant="ghost"
                size="icon"
                className="h-6 w-6"
              >
                <ChevronDownIcon
                  className="h-4 w-4"
                  style={{
                    transform: props.is_collapsed
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                  }}
                />
              </Button>
            </div>
          )}

          <div className="ml-2 w-full items-center justify-between md:flex">
            <div className="flex items-center space-x-2">
              <div
                className={clsx(
                  "text-muted-foreground",
                  props.status_code !== 200 && "text-red-500"
                )}
              >
                {props.type === "sitemap-index" && (
                  <FolderTreeIcon className="h-4 w-4" />
                )}

                {props.type === "folder" && (
                  <FileStackIcon className="h-4 w-4" />
                )}

                {props.type === "page" && <FileIcon className="h-4 w-4" />}

                {props.type === "sitemap" && <FolderIcon className="h-4 w-4" />}
              </div>

              <a
                href={props.url}
                target="_blank"
                className="flex items-center gap-2 hover:underline"
              >
                <div>{format_url_for_sitemap(props.url)}</div>
                <ExternalLinkIcon className="text-muted-foreground h-4 w-4" />
              </a>
            </div>

            <SitemapStatusBar
              status_code={props.status_code}
              number_total_of_pages={props.number_total_of_pages}
              updated_at={props.updated_at}
            />
          </div>
        </div>
      </div>

      {has_children && props.is_collapsed && (
        <div className="mt-2 space-y-2">
          {props.children.map((sitemap, index) => (
            <SitemapResultsItem
              key={index}
              {...sitemap}
              depth={props.depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

Wrapper.displayName = "SitemapResultsItem";

export const SitemapResultsItem = connector(Wrapper);
