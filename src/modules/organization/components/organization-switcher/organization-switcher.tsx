import { MODAL_KEYS, useModal } from "@/lib/use-modal";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui";
import { ChevronsUpDown, Plus } from "lucide-react";
import { useIntl } from "react-intl";
import { connector, ContainerProps } from "./organization-switcher.container";

export const Wrapper: React.FC<ContainerProps> = (props) => {
  const { onOpenChange } = useModal(MODAL_KEYS.ORGANIZATION_CREATE);
  const intl = useIntl();

  if (!props.active_organization) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" className="!px-2">
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
        {props.organizations.map((organization) => (
          <DropdownMenuItem
            key={organization.name}
            className="gap-2 p-2"
            onClick={() => {
              props.select_organization(organization.id);
            }}
          >
            <div className="size-6 flex items-center justify-center rounded-sm border">
              {organization.name.slice(0, 1)}
            </div>
            {organization.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 p-2">
          <div className="size-6 bg-background flex items-center justify-center rounded-md border">
            <Plus className="size-4" />
          </div>
          <div
            onClick={onOpenChange}
            className="text-muted-foreground font-medium"
          >
            {intl.formatMessage({
              id: "organization/switcher/create",
            })}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const OrganizationSwitcher = connector(Wrapper);
