import { FC, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useAsyncValue, useNavigate, useParams } from "react-router-dom"
import { Empty, List, ListItem, ListItemMeta } from "@illa-design/react"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@/illa-public-component/MixpanelUtils/interface"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { fromNow } from "@/utils/dayjs"
import { track } from "@/utils/mixpanelHelper"
import { DashboardItemMenu } from "../components/DashboardItemMenu"
import { hoverStyle } from "./style"

interface AppsContentBodyProps {
  canEditApp: boolean
}

export const AppsContentBody: FC<AppsContentBodyProps> = (props) => {
  const { canEditApp } = props
  const { data: appsList } = useAsyncValue() as {
    data: DashboardApp[]
  }
  let navigate = useNavigate()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { teamIdentifier } = useParams()

  useEffect(() => {
    if (Array.isArray(appsList)) {
      dispatch(dashboardAppActions.updateDashboardAppListReducer(appsList))
    }
  }, [appsList, dispatch])

  const finalAppsList = useMemo(() => {
    if (canEditApp) return appsList
    return appsList.filter((item) => {
      return item.mainlineVersion !== 0
    })
  }, [canEditApp, appsList])

  return (
    <>
      {finalAppsList.length !== 0 && (
        <List
          h={"100%"}
          ov={"auto"}
          data={finalAppsList}
          bordered={false}
          hoverable={true}
          render={(item) => {
            return (
              <ListItem
                css={hoverStyle}
                data-element="listItem"
                onMouseEnter={(e) => {
                  if (
                    (e.target as HTMLDivElement).dataset?.element !== "listItem"
                  )
                    return
                  canEditApp &&
                    track(
                      ILLA_MIXPANEL_EVENT_TYPE.SHOW,
                      ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
                      { element: "app_edit", parameter5: item.appId },
                    )
                  item.mainlineVersion !== 0 &&
                    track(
                      ILLA_MIXPANEL_EVENT_TYPE.SHOW,
                      ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
                      { element: "app_launch", parameter5: item.appId },
                    )
                }}
                extra={
                  <DashboardItemMenu
                    appId={item.appId}
                    canEditApp={canEditApp}
                    isDeploy={item.mainlineVersion !== 0}
                  />
                }
              >
                <ListItemMeta
                  onClick={() => {
                    if (canEditApp) {
                      navigate(`/${teamIdentifier}/app/${item.appId}`)
                    } else if (item.mainlineVersion !== 0) {
                      navigate(`/${teamIdentifier}/deploy/app/${item.appId}`)
                    }
                  }}
                  title={item.appName}
                  description={t("dashboard.app.edited_time", {
                    time: fromNow(item.updatedAt),
                    user: item.appActivity.modifier,
                  })}
                />
              </ListItem>
            )
          }}
          renderKey={(item) => {
            return item.appId
          }}
        />
      )}
      {finalAppsList.length == 0 && <Empty paddingVertical="120px" />}
    </>
  )
}
