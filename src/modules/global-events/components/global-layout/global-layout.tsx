import { actions } from "@/redux/actions";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { UserEntity } from "@sitemapy/interfaces";
import { Layout } from "@sitemapy/ui";
import { SettingsIcon } from "lucide-react";

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
            title: "Home",
            active: true,
            icon: SettingsIcon,
            items: [
              {
                title: "Home",
                url: "/",
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
