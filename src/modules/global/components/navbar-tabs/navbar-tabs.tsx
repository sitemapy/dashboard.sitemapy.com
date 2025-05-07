import { useIntl } from "react-intl";
import { NavbarTabItem } from "../navbar-tabs-item/navbar-tabs-item";

export const NavbarTabs: React.FC = () => {
  const { formatMessage } = useIntl();

  return (
    <div className="flex">
      <NavbarTabItem to="/">
        {formatMessage({ id: "navbar/home" })}
      </NavbarTabItem>
      <NavbarTabItem to="/developers">
        {formatMessage({ id: "navbar/developers" })}
      </NavbarTabItem>
    </div>
  );
};
