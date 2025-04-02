import * as authentication from "@/modules/authentication/redux/actions";
import * as global_events from "@/modules/global-events/redux/actions";
import * as notifications from "@/modules/notifications/redux/actions";
import * as organization from "@/modules/organization/redux/actions";
import * as sitemap from "@/modules/sitemap/redux/actions";

export const actions = {
  notifications,
  authentication,
  organization,
  global_events,
  sitemap,
};
