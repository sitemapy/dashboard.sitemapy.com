import { Database } from "@/database.types";
import { AuthenticationRepository } from "@/modules/authentication/repositories/authentication.repository";
import { AuthenticationRepositoryInMemory } from "@/modules/authentication/repositories/authentication.repository.in-memory";
import { LocationService } from "@/modules/location/services/location.service";
import { LocationServiceInMemory } from "@/modules/location/services/location.service.in-memory";
import { LocationServiceWindow } from "@/modules/location/services/location.service.window";
import { OrganizationRepository } from "@/modules/organization/repositories/organization.repository";
import { OrganizationRepositoryInMemory } from "@/modules/organization/repositories/organization.repository.in-memory";
import { SitemapRepository } from "@/modules/sitemap/repositories/sitemap.repository";
import { SitemapRepositoryInMemory } from "@/modules/sitemap/repositories/sitemap.repository.in-memory";
import { createClient } from "@supabase/supabase-js";
import { v4 } from "uuid";
import { ApiRepository } from "../api/repositories/api.repository";
import { ApiRepositoryInMemory } from "../api/repositories/api.repository.in-memory";
import { ApiRepositorySupabase } from "../api/repositories/api.repository.supabase";
import { AuthenticationRepositoryLocalStorage } from "../authentication/repositories/authentication.repository.local-storage";
import { AuthenticationRepositorySupabase } from "../authentication/repositories/authentication.repository.supabase";
import { NavigatorService } from "../global/services/navigator.service";
import { NavigatorServiceBrowser } from "../global/services/navigator.service.browser";
import { NavigatorServiceInMemory } from "../global/services/navigator.service.in-memory";
import { OrganizationRepositoryLocalStorage } from "../organization/repositories/organization.repository.local-storage";
import { OrganizationRepositorySupabase } from "../organization/repositories/organization.repository.supabase";
import { UsageRepository } from "../usage/repositories/usage.repository";
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

  const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_ANON_KEY!
  );

  return {
    AuthenticationRepository: new AuthenticationRepositorySupabase(supabase),
    OrganizationRepository: new OrganizationRepositorySupabase(supabase),
    SitemapRepository: new SitemapRepositoryInMemory(),
    LocationService: new LocationServiceWindow(),
    ApiRepository: new ApiRepositorySupabase(supabase),
    UsageRepository: new UsageRepositoryInMemory(),
    NavigatorService: new NavigatorServiceInMemory(),
  };
};
