import { AuthenticationRepository } from "@/modules/authentication/repositories/authentication.repository";
import { AuthenticationRepositoryInMemory } from "@/modules/authentication/repositories/authentication.repository.in-memory";
import { OrganizationRepository } from "@/modules/organization/repositories/organization.repository";
import { OrganizationRepositoryInMemory } from "@/modules/organization/repositories/organization.repository.in-memory";
import { SitemapRepository } from "@/modules/sitemap/repositories/sitemap.repository";
import { SitemapRepositoryInMemory } from "@/modules/sitemap/repositories/sitemap.repository.in-memory";

export type Dependencies = {
  AuthenticationRepository: AuthenticationRepository;
  OrganizationRepository: OrganizationRepository;
  SitemapRepository: SitemapRepository;
};

export const build = (env?: "in-memory" | "api"): Dependencies => {
  return {
    AuthenticationRepository: new AuthenticationRepositoryInMemory(),
    OrganizationRepository: new OrganizationRepositoryInMemory(),
    SitemapRepository: new SitemapRepositoryInMemory(),
  };
};
