import { cn } from "@/lib/utils";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  CircleCheckIcon,
  CircleXIcon,
} from "lucide-react";
import { useIntl } from "react-intl";
import { connector, ContainerProps } from "./api-logs-table.container";

export const Wrapper: React.FC<ContainerProps> = (props) => {
  const intl = useIntl();

  return (
    <div className="space-y-2">
      <div>
        <h1 className="text-2xl font-bold">
          {intl.formatMessage({ id: "api-logs-table/title" })}
        </h1>
        <p className="text-muted-foreground text-sm">
          {intl.formatMessage({ id: "api-logs-table/description" })}
        </p>
      </div>
      <div className="relative rounded-lg border p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                {intl.formatMessage({ id: "api-logs-table/header/status" })}
              </TableHead>
              <TableHead>
                {intl.formatMessage({ id: "api-logs-table/header/reference" })}
              </TableHead>
              <TableHead>
                {intl.formatMessage({ id: "api-logs-table/header/date" })}
              </TableHead>
              <TableHead>
                {intl.formatMessage({ id: "api-logs-table/header/url" })}
              </TableHead>
              <TableHead>
                {intl.formatMessage({ id: "api-logs-table/header/sitemaps" })}
              </TableHead>
              <TableHead>
                {intl.formatMessage({ id: "api-logs-table/header/pages" })}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody
            className={cn(props.is_loading && "opacity-15 animate-pulse")}
          >
            {props.logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  {log.does_sitemap_contain_errors ? (
                    <CircleXIcon className="size-4 text-red-500" />
                  ) : (
                    <CircleCheckIcon className="size-4 text-green-500" />
                  )}
                </TableCell>
                <TableCell>{log.id}</TableCell>
                <TableCell>{log.created_at.toLocaleString()}</TableCell>
                <TableCell>
                  <a
                    href={log.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    {log.url}
                  </a>
                </TableCell>
                <TableCell>{log.number_of_sitemap_fetched}</TableCell>
                <TableCell>{log.total_pages_in_sitemaps}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {props.logs.length === 0 && (
          <div className="bg-accent text-accent-foreground mt-2 flex w-full items-center justify-center rounded p-4 text-sm font-medium">
            {intl.formatMessage({ id: "api-logs-table/no-logs-found" })}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end space-x-6">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">
            {intl.formatMessage({ id: "api-logs-table/rows-per-page" })}
          </p>
          <Select
            value={`${props.total_logs_per_page}`}
            onValueChange={(value) => {
              props.onTotalLogsPerPageChange(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={props.total_logs_per_page} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center justify-center text-sm font-medium">
            {intl.formatMessage(
              { id: "api-logs-table/number-of-page-status" },
              {
                current_page: props.current_page.toString(),
                total_pages: props.total_pages.toString(),
              }
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={props.onFirstPage}
              disabled={false}
            >
              <ChevronsLeftIcon />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={props.onPreviousPage}
              disabled={false}
            >
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={props.onNextPage}
              disabled={false}
            >
              <ChevronRightIcon />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={props.onLastPage}
              disabled={false}
            >
              <ChevronsRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ApiLogsTable = connector(Wrapper);
