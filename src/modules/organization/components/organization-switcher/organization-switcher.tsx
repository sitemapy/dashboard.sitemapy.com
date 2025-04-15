import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/ui";
import { ChevronsUpDown, Plus } from "lucide-react";
import { connector, ContainerProps } from "./organization-switcher.container";

export const Wrapper: React.FC<ContainerProps> = (props) => {
  if (!props.active_organization) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">
          <div className="size-6 bg-foreground text-background flex aspect-square items-center justify-center rounded">
            {props.active_organization.name.slice(0, 1)}
          </div>

          <div className="text-left text-sm leading-tight">
            <span className="truncate">{props.active_organization.name}</span>
          </div>

          <ChevronsUpDown className="ml-auto" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="min-w-80 rounded-lg"
        align="start"
        side={"bottom"}
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-muted-foreground text-xs">
          Organizations
        </DropdownMenuLabel>
        {props.organizations.map((organization, index) => (
          <DropdownMenuItem key={organization.name} className="gap-2 p-2">
            <div className="size-6 flex items-center justify-center rounded-sm border">
              {organization.name.slice(0, 1)}
            </div>
            {organization.name}
            <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 p-2">
          <div className="size-6 bg-background flex items-center justify-center rounded-md border">
            <Plus className="size-4" />
          </div>
          <div className="text-muted-foreground font-medium">
            Create new organization
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const OrganizationSwitcher = connector(Wrapper);
