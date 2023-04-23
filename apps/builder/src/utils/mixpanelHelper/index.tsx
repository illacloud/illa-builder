import { ILLAMixpanel } from "@/illa-public-component/MixpanelUtils"
import {
  ILLAProperties,
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
  ILLA_PAGE_NAME,
} from "@/illa-public-component/MixpanelUtils/interface"
import {
  getIllaMode,
  getIsILLAProductMode,
} from "@/redux/config/configSelector"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
import { getCanvas } from "@/redux/currentApp/editor/components/componentsSelector"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { getGuideInfo } from "@/redux/guide/guideSelector"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { ILLARoute } from "@/router"
import store from "@/store"

const getInfoFromUrl = () => {
  const { state } = ILLARoute
  const { matches } = state
  const match = matches[0]?.params || {}
  return {
    appId: match.appId,
    teamIdentifier: match.teamIdentifier,
  }
}

const getPreviewInfo = () => {
  const rootState = store.getState()
  const rootNode = getCanvas(rootState)
  const isProduction = getIsILLAProductMode(rootState)
  const rootProps = rootNode?.props
  if (!rootProps)
    return {
      w: "auto",
      h: "auto",
    }
  const { viewportWidth = "auto", viewportHeight = "auto" } = rootProps
  return {
    w: isProduction ? "auto" : viewportWidth,
    h: isProduction ? "auto" : viewportHeight,
  }
}

const getPageInfo = () => {
  const rootState = store.getState()
  const executionResult = getExecutionResult(rootState)
  const rootExecutionProps = executionResult.root
  let result: Record<string, unknown>[] = []
  if (!rootExecutionProps) return result
  const { pageSortedKey, homepageDisplayName } = rootExecutionProps
  if (!Array.isArray(pageSortedKey) || pageSortedKey.length === 0) return result
  pageSortedKey.forEach((key) => {
    const pageInfo = executionResult[key]
    if (!pageInfo) return
    const childrenNode = (pageInfo.$childrenNode || []) as string[]
    let leftViews: number = 0
    let rightViews: number = 0
    let headerViews: number = 0
    let footerViews: number = 0
    let bodyViews: number = 0
    childrenNode.forEach((node) => {
      const nodeInfo = executionResult[node]
      if (!nodeInfo) return
      const { displayName } = nodeInfo
      if (displayName.startsWith("left")) {
        leftViews++
      } else if (displayName.startsWith("right")) {
        rightViews++
      } else if (displayName.startsWith("header")) {
        headerViews++
      } else if (displayName.startsWith("footer")) {
        footerViews++
      } else {
        bodyViews++
      }
    })
    const item = {
      homepage: (homepageDisplayName || pageSortedKey[0]) === key,
      frame: pageInfo.canvasSize,
      width: pageInfo.canvasWidth,
      preset: pageInfo.layout,
      left_panel: {
        views: leftViews,
        width: pageInfo.hasLeft ? pageInfo.leftWidth : 0,
        columns: pageInfo.hasLeft ? pageInfo.leftColumns : 0,
        fold_icon: pageInfo.hasLeft ? pageInfo.showLeftFoldIcon : false,
      },
      right_panel: {
        views: rightViews,
        width: pageInfo.hasRight ? pageInfo.rightWidth : 0,
        columns: pageInfo.hasRight ? pageInfo.rightColumns : 0,
        fold_icon: pageInfo.hasRight ? pageInfo.showRightFoldIcon : false,
      },
      header: {
        views: headerViews,
        width: pageInfo.hasHeader ? pageInfo.headerHeight : 0,
        columns: pageInfo.hasHeader ? pageInfo.headerColumns : 0,
      },
      footer: {
        views: footerViews,
        width: pageInfo.hasFooter ? pageInfo.footerHeight : 0,
        columns: pageInfo.hasFooter ? pageInfo.leftColumns : 0,
      },
      body: {
        views: bodyViews,
        columns: pageInfo.bodyColumns,
      },
    }
    result.push(item)
  })
  return result
}

const getTeamInfo = () => {
  const rootState = store.getState()
  const teamInfo = getCurrentTeamInfo(rootState)
  return {
    role: teamInfo?.myRole || "-1",
  }
}

const getAppType = () => {
  const rootState = store.getState()
  const guide = getGuideInfo(rootState)
  return guide.isOpen ? "Onboarding app" : "Normal"
}

const getAppIsPublish = () => {
  const rootState = store.getState()
  const appInfo = getAppInfo(rootState)
  return appInfo.releaseVersion > 0
}

const getAppIsPublic = () => {
  const rootState = store.getState()
  const appInfo = getAppInfo(rootState)
  return appInfo.config.public
}

const getUserID = () => {
  const rootState = store.getState()
  const userInfo = getCurrentUser(rootState)
  return userInfo?.userId || ""
}

const getAPPMode = () => {
  const rootState = store.getState()
  const appMode = getIllaMode(rootState)
  return appMode
}

const getPageName = () => {
  const appMode = getAPPMode()
  switch (appMode) {
    case "edit": {
      return ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR
    }
    case "preview": {
      return ILLA_MIXPANEL_BUILDER_PAGE_NAME.PREVIEW
    }
    case "production": {
      return ILLA_MIXPANEL_BUILDER_PAGE_NAME.DEPLOY
    }
    default: {
      return ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR
    }
  }
}

export const track = (
  event: ILLA_MIXPANEL_EVENT_TYPE,
  pageName: ILLA_PAGE_NAME,
  properties: Omit<ILLAProperties, "parameter11" | "team_id" | "page"> = {},
) => {
  const { teamIdentifier } = getInfoFromUrl()
  const { role } = getTeamInfo()
  const userID = getUserID()
  ILLAMixpanel.track(event, {
    ...properties,
    page: pageName,
    user_id: userID,
    parameter11: role,
    team_id: teamIdentifier,
  })
}

export const trackInEditor = (
  event: ILLA_MIXPANEL_EVENT_TYPE,
  properties: Omit<
    ILLAProperties,
    | "parameter5"
    | "parameter6"
    | "parameter7"
    | "parameter8"
    | "parameter9"
    | "parameter10"
    | "parameter11"
    | "team_id"
    | "page"
    | "user_id"
  > = {},
) => {
  const previewInfo = getPreviewInfo()
  const pageInfo = getPageInfo()
  const appType = getAppType()
  const isPublish = getAppIsPublish()
  const isPublic = getAppIsPublic()
  const pageName = getPageName()
  const { appId } = getInfoFromUrl()
  track(event, pageName, {
    ...properties,
    parameter5: appId,
    parameter6: previewInfo,
    parameter7: pageInfo,
    parameter8: appType,
    parameter9: isPublish,
    parameter10: isPublic,
  })
}

export const trackPageDurationStart = () => {
  ILLAMixpanel.pageTimeEvent()
}

export const trackPageDurationEnd = (pageName: ILLA_PAGE_NAME) => {
  const { teamIdentifier } = getInfoFromUrl()

  ILLAMixpanel.trackTimeEvent(pageName, teamIdentifier ?? "-1")
}

export const trackInDashboard = (
  event: ILLA_MIXPANEL_EVENT_TYPE,
  pageName: ILLA_PAGE_NAME,
  properties: Omit<ILLAProperties, "page">,
) => {
  track(event, pageName, {
    ...properties,
  })
}

export const resourceContextHelper = (parameter1: string) => {
  return (
    event: ILLA_MIXPANEL_EVENT_TYPE,
    pageName: ILLA_PAGE_NAME,
    properties: Omit<ILLAProperties, "page">,
  ) => {
    const mergeParam = parameter1 ? { ...properties, parameter1 } : properties
    track(event, pageName, mergeParam)
  }
}
