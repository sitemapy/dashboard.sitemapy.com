import { actions } from "@/redux/actions";
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "react";

export const GlobalPopStateListener = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    function handlePopState() {
      dispatch(actions.global.pop_state_triggered());
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return null;
};
