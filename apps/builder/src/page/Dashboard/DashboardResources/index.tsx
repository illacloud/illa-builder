import { FC, Suspense, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Await, useBeforeUnload, useLoaderData } from "react-router-dom"
import { Button } from "@illa-design/react"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@/illa-public-component/MixpanelUtils/interface"
import { MixpanelTrackProvider } from "@/illa-public-component/MixpanelUtils/mixpanelContext"
import { canAccess } from "@/illa-public-component/UserRoleUtils"
import {
  ACTION_ACCESS,
  ATTRIBUTE_GROUP,
  USER_ROLE,
} from "@/illa-public-component/UserRoleUtils/interface"
import {
  appsContainerStyle,
  listTitleContainerStyle,
  listTitleStyle,
} from "@/page/Dashboard/DashboardApps/style"
import { ResourceGenerator } from "@/page/Dashboard/components/ResourceGenerator"
import { ResourceListState } from "@/redux/resource/resourceState"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import {
  resourceContextHelper,
  track,
  trackPageDurationEnd,
  trackPageDurationStart,
} from "@/utils/mixpanelHelper"
import { DashboardErrorElement } from "../components/ErrorElemet"
import { DashBoardLoading } from "../components/Loading"
import { ResourcesContentBody } from "./contentBody"

export const DashboardResources: FC = () => {
  const { t } = useTranslation()

  const teamInfo = useSelector(getCurrentTeamInfo)
  const { resourceList } = useLoaderData() as {
    resourceList: ResourceListState
  }

  const [newResourceVisible, setNewResourceVisible] = useState(false)

  const canAccessResourcesView = canAccess(
    teamInfo?.myRole ?? USER_ROLE.VIEWER,
    ATTRIBUTE_GROUP.RESOURCE,
    ACTION_ACCESS.VIEW,
  )

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
        <Suspense fallback={<DashBoardLoading />}>
          <Await
            resolve={resourceList}
            errorElement={<DashboardErrorElement />}
          >
            <ResourcesContentBody />
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
