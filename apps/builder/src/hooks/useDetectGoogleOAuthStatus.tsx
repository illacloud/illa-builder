import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { Location, useLocation } from "react-router-dom"
import { useMessage } from "@illa-design/react"
import i18n from "@/i18n/config"
import { getSelectedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import {
  GoogleSheetAuthStatus,
  GoogleSheetResource,
} from "@/redux/resource/googleSheetResource"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { Resource, ResourceContent } from "@/redux/resource/resourceState"
import store from "@/store"
import { ILLABuilderStorage } from "@/utils/storage"

const getAccessTokenFromLocalStorage = () =>
  ILLABuilderStorage.getLocalStorage("accessToken")

const removeAccessTokenFromLocalStorage = () =>
  ILLABuilderStorage.removeLocalStorage("accessToken")

const getCurrentResource = (
  resources: Resource<ResourceContent>[],
  resourceID: string | null,
) => {
  if (!resourceID) {
    return null
  }
  return resources.find((r) => r.resourceId === resourceID)
}

const getResourceAction = (
  actions: ActionItem<ActionContent>[],
  resourceID: string | null,
) => {
  return actions.find((a) => a.resourceId === resourceID)
}

export function checkGoogleOAuthStatusParams(location: Location): boolean {
  const queryParams = new URLSearchParams(location.search)
  return queryParams.has("resourceID") || queryParams.has("status")
}

export function removeStatusAndResourceId(location: Location): string {
  const queryParams = new URLSearchParams(location.search)
  if (queryParams.has("status")) {
    queryParams.delete("status")
  }
  if (queryParams.has("resourceID")) {
    queryParams.delete("resourceID")
  }
  return `${location.pathname}${
    queryParams.toString().length > 0 ? "?" : ""
  }${queryParams.toString()}`
}

export const useDetectGoogleOAuthStatus = () => {
  const canOperationRef = useRef<boolean>(true)

  const location = useLocation()
  const message = useMessage()
  const resources = useSelector(getAllResources)
  const actions = useSelector(getActionList)
  const selectedAction = useSelector(getSelectedAction)

  const urlParams = new URLSearchParams(location.search)
  const status = urlParams.get("status")
  const resourceID = urlParams.get("resourceID")
  const currentResource = getCurrentResource(resources, resourceID)
  const isGoogleOAuth =
    currentResource?.resourceType === "googlesheets" &&
    (currentResource?.content as GoogleSheetResource)?.authentication ===
      "oauth2"
  const accessToken = getAccessTokenFromLocalStorage()
  if (
    !status ||
    ![
      String(GoogleSheetAuthStatus.NotAuthenticated),
      String(GoogleSheetAuthStatus.Authenticated),
    ].includes(status) ||
    !resourceID ||
    !currentResource ||
    !isGoogleOAuth
  ) {
    if (accessToken) {
      removeAccessTokenFromLocalStorage()
    }
    canOperationRef.current = false
  }

  useEffect(() => {
    if (!canOperationRef.current) {
      return
    }
    const resourceAction = getResourceAction(actions, resourceID)
    if (
      selectedAction?.actionId === resourceAction?.actionId ||
      resourceAction === undefined
    ) {
      return
    }
    // redirect url: 1 success, 2 failed, reverse with resource
    if (status === String(GoogleSheetAuthStatus.NotAuthenticated)) {
      message.success({
        content: i18n.t("editor.action.form.tips.gs.successfully_authent"),
      })
    } else {
      message.error({
        content: i18n.t("editor.action.form.tips.gs.failed_to_authentica"),
      })
    }
    store.dispatch(configActions.changeSelectedAction(resourceAction))
    removeAccessTokenFromLocalStorage()
  }, [actions, message, resourceID, status, selectedAction])
}
