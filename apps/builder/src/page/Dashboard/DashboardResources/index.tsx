import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackProvider,
} from "@illa-public/mixpanel-utils"
import {
  USER_ROLE,
  getCurrentTeamInfo,
  getPlanUtils,
} from "@illa-public/user-data"
import {
  ACTION_ACCESS,
  ATTRIBUTE_GROUP,
  canAccess,
} from "@illa-public/user-role-utils"
import { FC, Suspense, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Await, useBeforeUnload, useLoaderData } from "react-router-dom"
import { Button } from "@illa-design/react"
import { FullPageLoading } from "@/components/FullPageLoading"
import { useGoogleAuthStatus } from "@/hooks/useGoogleAuthStatus"
import { ResourcesContent } from "@/page/Dashboard/DashboardResources/ResourceContent"
import { ResourceGenerator } from "@/page/Dashboard/components/ResourceGenerator"
import { ResourceListState } from "@/redux/resource/resourceState"
import {
  resourceContextHelper,
  track,
  trackPageDurationEnd,
  trackPageDurationStart,
} from "@/utils/mixpanelHelper"
import { DashboardErrorElement } from "../components/ErrorElement"
import {
  appsContainerStyle,
  listTitleContainerStyle,
  listTitleStyle,
} from "./style"

export const DashboardResources: FC = () => {
  const { t } = useTranslation()

  const teamInfo = useSelector(getCurrentTeamInfo)
  const { resourceList } = useLoaderData() as {
    resourceList: Promise<ResourceListState>
  }

  const [newResourceVisible, setNewResourceVisible] = useState(false)

  const canAccessResourcesView = canAccess(
    teamInfo?.myRole ?? USER_ROLE.VIEWER,
    ATTRIBUTE_GROUP.RESOURCE,
    getPlanUtils(teamInfo),
    ACTION_ACCESS.VIEW,
  )

  useGoogleAuthStatus()

  useEffect(() => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.VISIT,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE,
    )
    trackPageDurationStart()
    return () => {
      trackPageDurationEnd(ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE)
    }
  }, [])

  useBeforeUnload(() => {
    trackPageDurationEnd(ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE)
  })

  if (teamInfo && !canAccessResourcesView) {
    throw Error(`can not access resources view`)
  }

  return (
    <>
      <div css={appsContainerStyle}>
        <div css={listTitleContainerStyle}>
          <span css={listTitleStyle}>{t("resources")}</span>
          <Button
            colorScheme="techPurple"
            onClick={() => {
              setNewResourceVisible(true)
              track(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE,
                { element: "create_new_resource" },
              )
            }}
          >
            {t("dashboard.resource.create_resource")}
          </Button>
        </div>
        <Suspense fallback={<FullPageLoading />}>
          <Await
            resolve={resourceList}
            errorElement={<DashboardErrorElement />}
          >
            <ResourcesContent />
          </Await>
        </Suspense>
      </div>
      <MixpanelTrackProvider
        basicTrack={resourceContextHelper("resource_new")}
        pageName={ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE}
      >
        <ResourceGenerator
          visible={newResourceVisible}
          onClose={() => {
            setNewResourceVisible(false)
          }}
        />
      </MixpanelTrackProvider>
    </>
  )
}

export default DashboardResources

DashboardResources.displayName = "DashboardResources"
