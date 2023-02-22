import { AxiosResponse } from "axios"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { BuilderApi } from "@/api/base"
import { getTeamsInfo } from "@/api/team"
import { useDestroyApp } from "@/hooks/useDestoryExecutionTree"
import { initS3Client } from "@/page/App/components/Actions/ActionPanel/utils/clientS3"
import { runAction } from "@/page/App/components/Actions/ActionPanel/utils/runAction"
import { CurrentAppResp } from "@/page/App/resp/currentAppResp"
import { getIsOnline } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { IllaMode } from "@/redux/config/configState"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { dottedLineSquareActions } from "@/redux/currentApp/editor/dottedLineSquare/dottedLineSquareSlice"
import { dragShadowActions } from "@/redux/currentApp/editor/dragShadow/dragShadowSlice"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { DashboardAppInitialState } from "@/redux/dashboard/apps/dashboardAppState"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { Resource, ResourceContent } from "@/redux/resource/resourceState"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"

export const useInitBuilderApp = (mode: IllaMode) => {
  const { appId = "" } = useParams()
  const dispatch = useDispatch()
  const isOnline = useSelector(getIsOnline)
  const teamInfo = useSelector(getCurrentTeamInfo)
  const { teamIdentifier } = useParams()

  const [loadingState, setLoadingState] = useState(true)

  // versionId = -1 represents the latest edited version of the app.
  // versionId = -2 represents the latest released version of the user.
  const versionId = mode === "production" ? "-2" : "0"

  const { uid, teamID } = {
    uid: teamInfo?.uid ?? "",
    teamID: teamInfo?.id ?? "",
  }

  useDestroyApp()

  const handleCurrentApp = useCallback(
    (response: AxiosResponse<CurrentAppResp>) => {
      dispatch(configActions.updateIllaMode(mode))
      dispatch(appInfoActions.updateAppInfoReducer(response.data.appInfo))
      dispatch(
        componentsActions.updateComponentReducer(response.data.components),
      )
      dispatch(actionActions.updateActionListReducer(response.data.actions))

      dispatch(
        dragShadowActions.updateDragShadowReducer(
          response.data.dragShadowState,
        ),
      )
      dispatch(
        dottedLineSquareActions.updateDottedLineSquareReducer(
          response.data.dottedLineSquareState,
        ),
      )
      DisplayNameGenerator.initApp(appId, teamID, uid)
      DisplayNameGenerator.updateDisplayNameList(
        response.data.components,
        response.data.actions,
      )
      dispatch(executionActions.startExecutionReducer())
      if (mode === "edit" && response.data.actions.length > 0) {
        dispatch(configActions.changeSelectedAction(response.data.actions[0]))
      }
    },
    [appId, dispatch, mode, teamID, uid],
  )

  const initApp = useCallback(
    async (
      controller: AbortController,
      resolve: (value: CurrentAppResp) => void,
      reject: (reason?: any) => void,
    ) => {
      try {
        const response = await BuilderApi.asyncTeamRequest<CurrentAppResp>({
          url: `/apps/${appId}/versions/${versionId}`,
          method: "GET",
          signal: controller.signal,
        })
        handleCurrentApp(response)
        resolve(response.data)
      } catch (e) {
        reject(e)
      }
    },
    [appId, handleCurrentApp, versionId],
  )

  const handleUnPublicApps = useCallback(
    async (
      controller: AbortController,
      resolve: (value: CurrentAppResp) => void,
      reject: (reason?: any) => void,
    ) => {
      if (teamInfo && teamInfo.identifier !== teamIdentifier) {
        reject("failure")
        throw new Error("have no team match")
      }
      try {
        if (!teamInfo) {
          await getTeamsInfo(teamIdentifier)
        }
        await initApp(controller, resolve, reject)
      } catch (e) {
        reject("failure")
        if (e === "have no team match") {
          throw new Error(e)
        }
      }
    },
    [initApp, teamIdentifier, teamInfo],
  )

  // init resource
  useEffect(() => {
    if (!teamID) {
      return
    }
    const controller = new AbortController()
    BuilderApi.teamRequest<Resource<ResourceContent>[]>(
      {
        url: "/resources",
        method: "GET",
        signal: controller.signal,
      },
      (response) => {
        dispatch(resourceActions.updateResourceListReducer(response.data))
        initS3Client(response.data)
      },
    )
    return () => {
      controller.abort()
    }
  }, [dispatch, teamID])

  useEffect(() => {
    const controller = new AbortController()
    if (isOnline) {
      new Promise<CurrentAppResp>(async (resolve, reject) => {
        setLoadingState(true)
        if (mode === "production") {
          try {
            // don't use asyncTeamRequest here, because we need to mock the team info
            const response =
              await BuilderApi.asyncTeamIdentifierRequest<CurrentAppResp>({
                url: `/publicApps/${appId}/versions/${versionId}`,
                method: "GET",
                signal: controller.signal,
              })
            handleCurrentApp(response)
            resolve(response.data)
          } catch (e) {
            await handleUnPublicApps(controller, resolve, reject)
          }
        } else {
          await initApp(controller, resolve, reject)
        }
        setLoadingState(false)
      }).then((value) => {
        const autoRunAction = value.actions.filter((action) => {
          return (
            action.triggerMode === "automate" ||
            action.actionType === "transformer"
          )
        })
        autoRunAction.forEach((action) => {
          runAction(action)
        })
      })
    }

    return () => {
      controller.abort()
      dispatch(appInfoActions.updateAppInfoReducer(DashboardAppInitialState))
    }
  }, [
    appId,
    dispatch,
    mode,
    versionId,
    isOnline,
    teamIdentifier,
    handleCurrentApp,
    handleUnPublicApps,
    initApp,
  ])

  return loadingState
}
