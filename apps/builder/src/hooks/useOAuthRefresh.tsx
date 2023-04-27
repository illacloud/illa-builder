import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { BuilderApi } from "@/api/base"
import {
  GoogleSheetAuthStatus,
  GoogleSheetResource,
} from "@/redux/resource/googleSheetResource"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { Resource, ResourceContent } from "@/redux/resource/resourceState"
import { ILLABuilderStorage } from "@/utils/storage"

const getCurrentResource = (
  resources: Resource<ResourceContent>[],
  resourceID?: string,
) => {
  if (!resourceID) {
    return null
  }
  return resources.find((r) => r.resourceId === resourceID)
}

export const useOAuthRefresh = (resourceId?: string) => {
  const [oAuthRefreshStatus, setOAuthRefreshStatus] =
    useState<GoogleSheetAuthStatus>(GoogleSheetAuthStatus.Initial)
  const resources = useSelector(getAllResources)
  const requestRef = useRef<boolean>(true)

  const resource = getCurrentResource(resources, resourceId)
  if (
    !resource ||
    (resource.content as GoogleSheetResource).authentication ===
      "serviceAccount"
  ) {
    requestRef.current = false
  }

  useEffect(() => {
    if (!requestRef.current) {
      return
    }
    const controller = new AbortController()
    BuilderApi.asyncTeamRequest<Resource<ResourceContent>>({
      url: `/resources/${resourceId}/refresh`,
      method: "POST",
      signal: controller.signal,
    }).then((response) => {
      const resourceData = response.data
      const content = resourceData?.content as GoogleSheetResource
      ILLABuilderStorage.setLocalStorage(
        "oAuthStatus",
        content.opts?.status ?? GoogleSheetAuthStatus.Initial,
      )
      setOAuthRefreshStatus(
        content.opts?.status ?? GoogleSheetAuthStatus.Initial,
      )
    })
    return () => {
      controller.abort()
    }
  }, [resourceId])

  return {
    oAuthRefreshStatus,
  }
}
