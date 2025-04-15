import clsx from "clsx";
import {
  ChevronDownIcon,
  FileIcon,
  FileStackIcon,
  FolderIcon,
  FolderTreeIcon,
} from "lucide-react";
import React from "react";
import { format_url_for_sitemap } from "../../utils/format-url-for-sitemap";
import { SitemapStatusBar } from "../sitemap-status-bar/sitemap-status-bar";
import { connector, ContainerProps } from "./sitemap-results-item.container";

const Wrapper: React.FC<ContainerProps> = (props) => {
  const has_children = props.children.length > 0;

  return (
    <div
      className={clsx("w-full overflow-x-hidden")}
      style={{
        paddingLeft: props.depth === 0 ? "0px" : "24px",
      }}
    >
      <div
        ref={(el) => {
          if (el) {
            el.style.top = `${props.depth * (el.clientHeight + 4)}px`;
          }
        }}
        className={clsx(
          "w-full rounded-md border border-slate-200 bg-white px-2 py-2"
        )}
      >
        <div className="flex w-full items-center">
          {has_children && (
            <div className="mr-2 flex shrink-0 items-center">
              <div
                onClick={() => props.toggle_collapse_folder(props.url)}
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md hover:bg-slate-100"
              >
                <ChevronDownIcon
                  className="h-4 w-4"
                  style={{
                    transform: props.is_collapsed
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                  }}
                />
              </div>
            </div>
          )}

          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <div
                className={clsx(
                  "mr-2 text-slate-400",
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
                className="truncate hover:underline"
              >
                {format_url_for_sitemap(props.url)}
              </a>
            </div>
            <div className="ml-auto shrink-0">
              <SitemapStatusBar
                type={props.type}
                status_code={props.status_code}
                number_total_of_pages={props.number_total_of_pages}
                updated_at={props.updated_at}
              />
            </div>
          </div>
        </div>
      </div>

      {has_children && props.is_collapsed && (
        <div className="mt-2 flex flex-col gap-2">
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
