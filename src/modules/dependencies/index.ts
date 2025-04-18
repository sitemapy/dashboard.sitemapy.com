import { AuthenticationRepository } from "@/modules/authentication/repositories/authentication.repository";
import { AuthenticationRepositoryInMemory } from "@/modules/authentication/repositories/authentication.repository.in-memory";
import { LocationService } from "@/modules/location/services/location.service";
import { LocationServiceInMemory } from "@/modules/location/services/location.service.in-memory";
import { LocationServiceWindow } from "@/modules/location/services/location.service.window";
import { OrganizationRepository } from "@/modules/organization/repositories/organization.repository";
import { OrganizationRepositoryInMemory } from "@/modules/organization/repositories/organization.repository.in-memory";
import { SitemapRepository } from "@/modules/sitemap/repositories/sitemap.repository";
import { SitemapRepositoryInMemory } from "@/modules/sitemap/repositories/sitemap.repository.in-memory";
import { AuthenticationRepositoryLocalStorage } from "../authentication/repositories/authentication.repository.local-storage";
import { OrganizationRepositoryLocalStorage } from "../organization/repositories/organization.repository.local-storage";

import { v4 } from "uuid";
import { ApiRepository } from "../api/repositories/api.repository";
import { ApiRepositoryInMemory } from "../api/repositories/api.repository.in-memory";
import { NavigatorService } from "../global-events/services/navigator.service";
import { NavigatorServiceBrowser } from "../global-events/services/navigator.service.browser";
import { NavigatorServiceInMemory } from "../global-events/services/navigator.service.in-memory";
import { logs } from "./__fixtures__/logs";
import { sitemap } from "./__fixtures__/sitemaps";

export type Dependencies = {
  AuthenticationRepository: AuthenticationRepository;
  OrganizationRepository: OrganizationRepository;
  SitemapRepository: SitemapRepository;
  LocationService: LocationService;
  ApiRepository: ApiRepository;
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
      NavigatorService: new NavigatorServiceInMemory(),
    };
  }

  if (env === "demo") {
    const api_repository = new ApiRepositoryInMemory();

    api_repository._store_api_key({
      organization_id: "My Personal Organization",
      api_key: {
        api_key: v4(),
        current_usage: 450,
        max_usage: 1000,
        reset_date: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30),
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

  return {
    AuthenticationRepository: new AuthenticationRepositoryInMemory(),
    OrganizationRepository: new OrganizationRepositoryInMemory(),
    SitemapRepository: new SitemapRepositoryInMemory(),
    LocationService: new LocationServiceInMemory(),
    ApiRepository: new ApiRepositoryInMemory(),
    NavigatorService: new NavigatorServiceBrowser(),
  };
};
