import { SitemapLogEntity } from "@sitemapy/interfaces";
import { useState } from "react";
import { Wrapper as ApiLogsTable } from "./api-logs-table";

const meta = {
  title: "modules/api/api-logs-table",
  component: ApiLogsTable,
  parameters: {},
};

export default meta;

const logs: Array<SitemapLogEntity> = Array.from(
  { length: 1000 },
  (_, index) => ({
    id: index.toString(),
    url: `https://example.com/sitemap-${index}.xml`,
    does_sitemap_contain_errors: false,
    mode: "pages_only",
    number_of_sitemap_fetched: 3,
    total_pages_in_sitemaps: 65030,
    created_at: new Date(),
    source: "api",
    api_key_id: "api_key_id",
    organization_id: "organization_id",
    fetching_duration: index,
  })
);

export const Default = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLogsPerPage, setTotalLogsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(logs.length / totalLogsPerPage)
  );

  const handleTotalLogsPerPageChange = (totalLogsPerPage: number) => {
    setTotalLogsPerPage(totalLogsPerPage);
    setTotalPages(Math.ceil(logs.length / totalLogsPerPage));
    setCurrentPage(1);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(totalPages);
    }
  };

  return (
    <ApiLogsTable
      logs={logs.slice(
        (currentPage - 1) * totalLogsPerPage,
        currentPage * totalLogsPerPage
      )}
      is_loading={false}
      total_logs={logs.length}
      total_logs_per_page={totalLogsPerPage}
      current_page={currentPage}
      total_pages={totalPages}
      onFirstPage={handleFirstPage}
      onPreviousPage={handlePreviousPage}
      onNextPage={handleNextPage}
      onLastPage={handleLastPage}
      onTotalLogsPerPageChange={handleTotalLogsPerPageChange}
    />
  );
};

export const Loading = () => {
  return (
    <ApiLogsTable
      is_loading={true}
      logs={logs.slice(0, 10)}
      total_logs={logs.length}
      total_logs_per_page={10}
      current_page={1}
      total_pages={Math.ceil(logs.length / 10)}
      onFirstPage={() => {}}
      onPreviousPage={() => {}}
      onNextPage={() => {}}
      onLastPage={() => {}}
      onTotalLogsPerPageChange={() => {}}
    />
  );
};

export const Empty = () => {
  return (
    <ApiLogsTable
      is_loading={false}
      logs={[]}
      total_logs={0}
      total_logs_per_page={10}
      current_page={1}
      total_pages={0}
      onFirstPage={() => {}}
      onPreviousPage={() => {}}
      onNextPage={() => {}}
      onLastPage={() => {}}
      onTotalLogsPerPageChange={() => {}}
    />
  );
};
