import { SelectLanguageModal } from "@/modules/languages/components/select-language-modal/select-language-modal";
import { OrganizationCreateDialog } from "@/modules/organization/components/organization-create-dialog/organization-create-dialog";
import { OrganizationSwitcher } from "@/modules/organization/components/organization-switcher/organization-switcher";
import { Logo } from "@/ui/logo/logo";
import { NavbarTabs } from "../navbar-tabs/navbar-tabs";
import { NavbarUser } from "../navbar-user/navbar-user";

export const Navbar: React.FC = () => {
  return (
    <>
      <div className="border-b">
        <div className="flex h-16 items-center gap-4 px-4">
          <Logo hideText />
          <OrganizationSwitcher />
          <NavbarTabs />
          <div className="ml-auto flex items-center space-x-4">
            <NavbarUser />
          </div>
        </div>
      </div>
      <OrganizationCreateDialog />
      <SelectLanguageModal />
    </>
  );
};
