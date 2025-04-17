import { MODAL_KEYS } from "@/modules/modal/redux/entities/modal-keys";
import { actions, useAppDispatch, useAppSelector } from "@/redux/store";

export const extract_hash_value = (params: {
  hash: string;
  key: MODAL_KEYS;
}) => {
  const hashes = params.hash.replace("#", "").split("&");
  const get_actual_hash = hashes.find((hash) => hash.includes(params.key));
  const value = get_actual_hash?.split("=")[1] || null;

  return value;
};

export const useModal = (key: MODAL_KEYS) => {
  const dispatch = useAppDispatch();
  const current_key = useAppSelector((state) => state.modal.current);

  const isOpen = current_key === key;

  const onOpenChange = () => {
    if (isOpen) {
      dispatch(actions.modal.close({ key }));
    } else {
      dispatch(actions.modal.open({ key }));
    }
  };

  return { isOpen, onOpenChange };
};
