import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/ui";
import { OrganizationEntity } from "@sitemapy/interfaces";
import { ChevronsUpDown, Plus } from "lucide-react";

type Props = {
  organizations: OrganizationEntity[];
  activeOrganization: OrganizationEntity | null;
  onSelectOrganization: (organization: OrganizationEntity) => void;
  onAddOrganization: () => void;
};

export function OrganizationSwitcher(props: Props) {
  const isMobile = useIsMobile();

  if (!props.activeOrganization) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            asChild
          >
            <DropdownMenuTrigger>
              <div className="size-8 bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square items-center justify-center rounded-lg">
                {props.activeOrganization.name.slice(0, 2)}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {props.activeOrganization.name}
                </span>
                <span className="truncate text-xs">Free</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </DropdownMenuTrigger>
          </SidebarMenuButton>
          <DropdownMenuContent
            className="min-w-56 w-[--radix-dropdown-menu-trigger-width] rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Organizations
            </DropdownMenuLabel>
            {props.organizations.map((organization, index) => (
              <DropdownMenuItem
                key={organization.name}
                onClick={() => props.onSelectOrganization(organization)}
                className="gap-2 p-2"
              >
                <div className="size-6 flex items-center justify-center rounded-sm border">
                  {organization.name.slice(0, 2)}
                </div>
                {organization.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => props.onAddOrganization()}
              className="gap-2 p-2"
            >
              <div className="size-6 bg-background flex items-center justify-center rounded-md border">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
