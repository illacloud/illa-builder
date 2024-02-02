import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@illa-public/mixpanel-utils"
import { Unsubscribe } from "@reduxjs/toolkit"
import { AxiosResponse } from "axios"
import { FC, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useAsyncValue, useBeforeUnload, useParams } from "react-router-dom"
import { TriggerProvider } from "@illa-design/react"
import { useDestroyApp } from "@/hooks/useDestoryExecutionTree"
import { fixedActionToNewAction } from "@/hooks/utils/fixedAction"
import { fixedComponentsToNewComponents } from "@/hooks/utils/fixedComponents"
import { WaterMark } from "@/page/Deploy/Watermark"
import { configActions } from "@/redux/config/configSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { setupComponentsListeners } from "@/redux/currentApp/components/componentsListener"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { setupExecutionListeners } from "@/redux/currentApp/executionTree/executionListener"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { setupLayoutInfoListeners } from "@/redux/currentApp/layoutInfo/layoutInfoListener"
import { startAppListening } from "@/store"
import { flatTreeToMap } from "@/utils/componentNode/flatTree"
import {
  track,
  trackPageDurationEnd,
  trackPageDurationStart,
} from "@/utils/mixpanelHelper"
import { CanvasPanel } from "../App/Module/CanvasPanel"
import { CurrentAppResp } from "../App/resp/currentAppResp"

interface IDeployContentAsyncValue {
  isPublic: boolean
  appInfo: Promise<AxiosResponse<CurrentAppResp>>
}

export const DeployContent: FC = () => {
  const asyncValue = useAsyncValue() as IDeployContentAsyncValue
  const dispatch = useDispatch()

  let { pageName } = useParams()

  useEffect(() => {
    const subscriptions: Unsubscribe[] = [
      setupComponentsListeners(startAppListening),
      setupExecutionListeners(startAppListening),
      setupLayoutInfoListeners(startAppListening),
    ]
    return () => subscriptions.forEach((unsubscribe) => unsubscribe())
  }, [])

  useEffect(() => {
    const initApp = async () => {
      const appInfo = await asyncValue.appInfo
      document.title = appInfo.data.appInfo.appName
      dispatch(configActions.updateIllaMode("production"))
      dispatch(appInfoActions.updateAppInfoReducer(appInfo.data.appInfo))
      const canvasTree = appInfo.data.components
      let needFixedCanvasTree = canvasTree
      if (canvasTree.props) {
        const { homepageDisplayName, pageSortedKey, currentPageIndex } =
          canvasTree.props
        let defaultPageIndex: number | undefined
        const pageIndex = pageSortedKey?.findIndex(
          (name: string) => name === pageName,
        )
        if (pageIndex != undefined && pageIndex !== -1) {
          defaultPageIndex = pageIndex
        }

        const homePageIndex = pageSortedKey?.findIndex(
          (name: string) => name === homepageDisplayName,
        )
        if (
          defaultPageIndex == undefined &&
          homePageIndex != undefined &&
          homePageIndex !== -1
        ) {
          defaultPageIndex = homePageIndex
        }

        if (defaultPageIndex == undefined && currentPageIndex != undefined) {
          defaultPageIndex = currentPageIndex
        }
        if (defaultPageIndex == undefined) {
          defaultPageIndex = 0
        }

        needFixedCanvasTree = {
          ...canvasTree,
          props: {
            ...canvasTree.props,
            currentPageIndex: defaultPageIndex,
          },
        }
      }
      const fixedComponents =
        fixedComponentsToNewComponents(needFixedCanvasTree)
      dispatch(
        componentsActions.initComponentReducer(flatTreeToMap(fixedComponents)),
      )
      const fixedActions = fixedActionToNewAction(appInfo.data.actions)
      dispatch(actionActions.initActionListReducer(fixedActions))
      dispatch(executionActions.startExecutionReducer())
    }
    initApp()
  }, [asyncValue, dispatch, pageName])

  useDestroyApp()

  useEffect(() => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.VISIT,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.DEPLOY,
    )
    trackPageDurationStart()
    return () => {
      trackPageDurationEnd(ILLA_MIXPANEL_BUILDER_PAGE_NAME.DEPLOY)
    }
  }, [])

  useBeforeUnload(() => {
    trackPageDurationEnd(ILLA_MIXPANEL_BUILDER_PAGE_NAME.DEPLOY)
  })

  return (
    <TriggerProvider renderInBody zIndex={10}>
      {<CanvasPanel />}
      {<WaterMark />}
    </TriggerProvider>
  )
}
