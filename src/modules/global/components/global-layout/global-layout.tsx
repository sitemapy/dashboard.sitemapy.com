import { Navbar } from "@/modules/global/components/navbar/navbar";
import { UsageLimitReachedModal } from "@/modules/usage/components/usage-limit-reached-modal/usage-limit-reached-modal";

type Props = {
  children: React.ReactNode;
};

export const GlobalLayout: React.FC<Props> = (props) => {
  return (
    <>
      <Navbar />
      <div>{props.children}</div>
      <UsageLimitReachedModal />
    </>
  );
};
