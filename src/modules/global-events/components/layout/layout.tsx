import { SidebarProvider } from "@/ui";

import { OrganizationSwitcher } from "@/modules/global-events/components/organization-switcher/organization-switcher";
import { SidebarNav } from "@/modules/global-events/components/sidebar-nav/sidebar-nav";
import { SidebarUser } from "@/modules/global-events/components/sidebar-user/sidebar-user";
import { Navigation } from "@/types";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarRail,
} from "@/ui/";
import { OrganizationEntity, UserEntity } from "@sitemapy/interfaces";

type Props = {
  children: React.ReactNode;
  organizations: OrganizationEntity[];
  activeOrganization: OrganizationEntity | null;
  onSelectOrganization: (organization: OrganizationEntity) => void;
  navigation: Navigation[][];
  user: UserEntity;
  userDropdownNavigation: {
    url: string;
    icon: React.ElementType;
    title: string;
  }[];
  onAddOrganization: () => void;
  onLogout: () => void;
};

export function Layout(props: Props) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <OrganizationSwitcher
            organizations={props.organizations}
            activeOrganization={props.activeOrganization}
            onSelectOrganization={props.onSelectOrganization}
            onAddOrganization={props.onAddOrganization}
          />
        </SidebarHeader>
        <SidebarContent>
          {props.navigation.map((nav, index) => (
            <SidebarNav key={index} items={nav} />
          ))}
        </SidebarContent>
        <SidebarFooter>
          <SidebarUser
            user={props.user}
            navigation={props.userDropdownNavigation}
            onLogout={props.onLogout}
          />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>{props.children}</SidebarInset>
    </SidebarProvider>
  );
}
