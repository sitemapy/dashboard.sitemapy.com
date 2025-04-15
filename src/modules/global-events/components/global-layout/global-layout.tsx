import { Navbar } from "../navbar/navbar";

type Props = {
  children: React.ReactNode;
};

export const GlobalLayout: React.FC<Props> = (props) => {
  return (
    <>
      <Navbar />
      <div>{props.children}</div>
    </>
  );
};
