import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@/illa-public-component/MixpanelUtils/interface"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import { track } from "."

export const eventReportCallback = (appId: string) => {
  const param = { parameter5: appId }
  return {
    onPublicTabShowReport: () => {
      track(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { ...param, element: "invite_modal_public_tab" },
      )
    },
    onClickPublicTabReport: () => {
      track(
        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { ...param, element: "invite_modal_public_tab" },
      )
    },
    showPublicSwitchReport: (status: boolean) => {
      track(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        {
          ...param,
          element: "invite_modal_public_switch",
          parameter4: status ? "on" : "off",
        },
      )
    },
    publicSwitchClickReport: (status: boolean) => {
      track(
        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        {
          ...param,
          element: "invite_modal_public_switch",
          parameter4: status ? "on" : "off",
        },
      )
    },
    showPublicCopyReport: () => {
      track(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { ...param, element: "invite_modal_public_copy" },
      )
    },
    publicCopyClickReport: () => {
      track(
        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { ...param, element: "invite_modal_public_copy" },
      )
    },
    onInviteTabShowReport: () => {
      track(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { ...param, element: "invite_modal_invite_tab" },
      )
    },
    onOpenLinkShowReport: () => {
      track(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { ...param, element: "invite_link_on" },
      )
    },
    onLinkShowReport: (linkType: USER_ROLE) => {
      track(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { ...param, element: "invite_link", parameter1: linkType },
      )
    },
    onOpenLinkClick: () => {
      track(
        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { ...param, element: "invite_link_on" },
      )
    },
    onUpdateLinkRolReport: (linkType: USER_ROLE) => {
      track(
        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { ...param, element: "invite_link_update", parameter1: linkType },
      )
    },
    onCloseLinkReport: () => {
      track(
        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { ...param, element: "invite_link_close" },
      )
    },
    onClickCopyReport: (linkType: USER_ROLE) => {
      track(
        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { ...param, element: "invite_link_copy", parameter1: linkType },
      )
    },
    onInviteEmailClickReport: (linkType: USER_ROLE, count: number) => {
      track(
        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        {
          ...param,
          element: "invite_email_button",
          parameter1: linkType,
          parameter2: count,
        },
      )
    },
    onCloseClickReport: () => {
      track(
        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { ...param, element: "invite_modal_close" },
      )
    },
  }
}
