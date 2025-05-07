import * as api from "@/modules/api/redux/actions";
import * as authentication from "@/modules/authentication/redux/actions";
import * as global from "@/modules/global/redux/actions";
import * as modal from "@/modules/modal/redux/actions";
import * as notifications from "@/modules/notifications/redux/actions";
import * as organization from "@/modules/organization/redux/actions";
import * as sitemap from "@/modules/sitemap/redux/actions";
import * as usage from "@/modules/usage/redux/actions";

export const actions = {
  api,
  notifications,
  authentication,
  organization,
  global,
  sitemap,
  modal,
  usage,
};
