import { Layout } from "@/modules/global-events/components/layout/layout";
import { actions } from "@/redux/actions";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { UserEntity } from "@sitemapy/interfaces";
import { FolderIcon, SettingsIcon } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

export const GlobalLayout: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authentication);
  const { organization_list, current_organization } = useAppSelector(
    (state) => state.organization
  );

  return (
    <Layout
      organizations={organization_list}
      navigation={[
        [
          {
            title: "Sitemaps",
            active: true,
            icon: FolderIcon,
            items: [
              {
                title: "Dashboard",
                url: "/",
              },
              {
                title: "Analyze",
                url: "/analyze",
              },
              {
                title: "History",
                url: "/history",
              },
              {
                title: "Reports",
                url: "/reports",
              },
            ],
          },
        ],
      ]}
      activeOrganization={current_organization}
      onSelectOrganization={() => {}}
      user={user as UserEntity}
      userDropdownNavigation={[
        {
          title: "Home",
          icon: SettingsIcon,
          url: "/",
        },
      ]}
      onAddOrganization={() => {}}
      onLogout={() => {
        dispatch(actions.authentication.logout());
      }}
    >
      {children}
    </Layout>
  );
};
