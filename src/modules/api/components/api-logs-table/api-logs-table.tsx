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
import { connector, ContainerProps } from "./api-logs-table.container";

export const Wrapper: React.FC<ContainerProps> = (props) => {
  return (
    <div className="space-y-2">
      <div>
        <h1 className="text-2xl font-bold">Logs</h1>
        <p className="text-muted-foreground text-sm">
          View and manage your API logs here.
        </p>
      </div>
      <div className="relative rounded-lg border p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Sitemaps</TableHead>
              <TableHead>Pages</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody
            className={cn(props.is_loading && "opacity-15 animate-pulse")}
          >
            {props.logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  {log.status === "success" ? (
                    <CircleCheckIcon className="size-4 text-green-500" />
                  ) : (
                    <CircleXIcon className="size-4 text-red-500" />
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
            No logs found
          </div>
        )}
      </div>

      <div className="flex items-center justify-end space-x-6">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
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
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {props.current_page} of {props.total_pages}
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
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={props.onLastPage}
              disabled={false}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ApiLogsTable = connector(Wrapper);
