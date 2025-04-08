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

import { sitemap } from "./__fixtures__/sitemaps";

export type Dependencies = {
  AuthenticationRepository: AuthenticationRepository;
  OrganizationRepository: OrganizationRepository;
  SitemapRepository: SitemapRepository;
  LocationService: LocationService;
};

export const build = (env?: "in-memory" | "api"): Dependencies => {
  if (env === "in-memory") {
    return {
      AuthenticationRepository: new AuthenticationRepositoryInMemory(),
      OrganizationRepository: new OrganizationRepositoryInMemory(),
      SitemapRepository: new SitemapRepositoryInMemory(),
      LocationService: new LocationServiceInMemory(),
    };
  }

  return {
    AuthenticationRepository: new AuthenticationRepositoryLocalStorage(),
    OrganizationRepository: new OrganizationRepositoryLocalStorage(),
    SitemapRepository: new SitemapRepositoryInMemory({
      sitemap_responses: new Map([
        ["https://www.sudoku.academy/sitemap-index.xml", [sitemap]],
        ["https://www.sudoku.academy", [sitemap]],
      ]),
    }),
    LocationService: new LocationServiceWindow(),
  };
};
