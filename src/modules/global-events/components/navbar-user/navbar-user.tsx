import { MODAL_KEYS, useModal } from "@/lib/use-modal";
import {
  Avatar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui";
import BoringAvatar from "boring-avatars";
import { LogOut } from "lucide-react";
import { connector, ContainerProps } from "./navbar-user.container";

export const Wrapper: React.FC<ContainerProps> = (props) => {
  const { onOpenChange } = useModal(MODAL_KEYS.CHANGE_LANGUAGE);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-8 w-8 rounded-full">
          <BoringAvatar
            size={32}
            name={props.user.email}
            variant="beam"
            colors={["#fee2e2", "#fed7aa", "#d9f99d", "#a5f3fc", "#f5d0fe"]}
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-56 w-[--radix-dropdown-menu-trigger-width] rounded-lg"
        side={"bottom"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <BoringAvatar
                size={32}
                name={props.user.email}
                variant="beam"
                colors={["#fee2e2", "#fed7aa", "#d9f99d", "#a5f3fc", "#f5d0fe"]}
              />
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{props.user.email}</span>
              <span className="truncate text-xs">{props.user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onOpenChange}>
            Change language
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={props.on_logout}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const NavbarUser = connector(Wrapper);
