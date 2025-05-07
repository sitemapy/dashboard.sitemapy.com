import { MODAL_KEYS } from "@/modules/modal/redux/entities/modal-keys";
import { actions, init } from "@/redux/store";

describe("Feature: Global", () => {
  it(`
    When the usage limit error is triggered
    Then the modal should be opened
  `, async () => {
    const { store } = init({});

    await store.dispatch(
      actions.global.error({
        error: "usage-limit/exceeded",
      })
    );

    expect(store.getState().modal.current).toBe(MODAL_KEYS.USAGE_LIMIT_REACHED);
  });
});
