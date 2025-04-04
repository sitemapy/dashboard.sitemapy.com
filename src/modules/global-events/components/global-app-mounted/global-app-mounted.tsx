import { actions } from "@/redux/actions";
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "react";

export const GlobalAppMounted = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actions.global_events.app_mounted());
  }, []);

  return null;
};
