import { AuthenticationRepository } from "@/modules/authentication/repositories/authentication.repository";
import { AuthenticationRepositoryInMemory } from "@/modules/authentication/repositories/authentication.repository.in-memory";
import { LocationService } from "@/modules/location/services/location.service";
import { LocationServiceInMemory } from "@/modules/location/services/location.service.in-memory";
import { LocationServiceWindow } from "@/modules/location/services/location.service.window";
import { OrganizationRepository } from "@/modules/organization/repositories/organization.repository";
import { OrganizationRepositoryInMemory } from "@/modules/organization/repositories/organization.repository.in-memory";
import { SitemapRepository } from "@/modules/sitemap/repositories/sitemap.repository";
import { SitemapRepositoryInMemory } from "@/modules/sitemap/repositories/sitemap.repository.in-memory";
import { v4 } from "uuid";
import { ApiRepository } from "../api/repositories/api.repository";
import { ApiRepositoryApi } from "../api/repositories/api.repository.api";
import { ApiRepositoryInMemory } from "../api/repositories/api.repository.in-memory";
import { ApiService } from "../api/services/api.service";
import { AuthenticationRepositoryApi } from "../authentication/repositories/authentication.repository.api";
import { AuthenticationRepositoryLocalStorage } from "../authentication/repositories/authentication.repository.local-storage";
import { NavigatorService } from "../global/services/navigator.service";
import { NavigatorServiceBrowser } from "../global/services/navigator.service.browser";
import { NavigatorServiceInMemory } from "../global/services/navigator.service.in-memory";
import { LocalStorageService } from "../local-storage/services/local-storage.service";
import { OrganizationRepositoryApi } from "../organization/repositories/organization.repository.api";
import { OrganizationRepositoryLocalStorage } from "../organization/repositories/organization.repository.local-storage";
import { SitemapRepositoryApi } from "../sitemap/repositories/sitemap.repository.api";
import { UsageRepository } from "../usage/repositories/usage.repository";
import { UsageRepositoryApi } from "../usage/repositories/usage.repository.api";
import { UsageRepositoryInMemory } from "../usage/repositories/usage.repository.in-memory";
import { logs } from "./__fixtures__/logs";
import { sitemap } from "./__fixtures__/sitemaps";
export type Dependencies = {
  AuthenticationRepository: AuthenticationRepository;
  OrganizationRepository: OrganizationRepository;
  SitemapRepository: SitemapRepository;
  LocationService: LocationService;
  ApiRepository: ApiRepository;
  UsageRepository: UsageRepository;
  NavigatorService: NavigatorService;
};

export const build = (env?: "in-memory" | "api" | "demo"): Dependencies => {
  if (env === "in-memory") {
    return {
      AuthenticationRepository: new AuthenticationRepositoryInMemory(),
      OrganizationRepository: new OrganizationRepositoryInMemory(),
      SitemapRepository: new SitemapRepositoryInMemory(),
      LocationService: new LocationServiceInMemory(),
      ApiRepository: new ApiRepositoryInMemory(),
      UsageRepository: new UsageRepositoryInMemory(),
      NavigatorService: new NavigatorServiceInMemory(),
    };
  }

  if (env === "demo") {
    const api_repository = new ApiRepositoryInMemory();

    api_repository._store_api_key({
      organization_id: "My Personal Organization",
      api_key: {
        key: v4(),
        organization_id: "My Personal Organization",
        updated_at: new Date(),
        created_at: new Date(),
      },
    });

    api_repository._store_logs({
      organization_id: "My Personal Organization",
      logs: logs,
    });

    return {
      AuthenticationRepository: new AuthenticationRepositoryLocalStorage(),
      OrganizationRepository: new OrganizationRepositoryLocalStorage(),
      NavigatorService: new NavigatorServiceBrowser(),
      ApiRepository: api_repository,
      UsageRepository: new UsageRepositoryInMemory(),
      SitemapRepository: new SitemapRepositoryInMemory({
        sitemap_responses: new Map([
          ["https://www.sudoku.academy/sitemap-index.xml", [sitemap]],
          ["https://www.sudoku.academy", [sitemap]],
        ]),
        history: [
          {
            sitemap_url: "https://www.sudoku.academy/sitemap-index.xml",
            created_at: new Date(),
          },
        ],
      }),
      LocationService: new LocationServiceWindow(),
    };
  }

  const apiService = new ApiService(new LocalStorageService(localStorage));

  return {
    AuthenticationRepository: new AuthenticationRepositoryApi(apiService),
    OrganizationRepository: new OrganizationRepositoryApi(apiService),
    SitemapRepository: new SitemapRepositoryApi(apiService),
    LocationService: new LocationServiceWindow(),
    ApiRepository: new ApiRepositoryApi(apiService),
    UsageRepository: new UsageRepositoryApi(apiService),
    NavigatorService: new NavigatorServiceBrowser(),
  };
};
