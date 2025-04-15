import { Button } from "@/ui";
import { Link } from "@reach/router";

export const NavbarTabItem: React.FC<{
  to: string;
  children: React.ReactNode;
}> = ({ to, children }) => {
  return (
    <Button variant="link" asChild>
      <Link to={to}>{children}</Link>
    </Button>
  );
};
